import { Service } from "typedi";
import { logger } from "../common/configs/logger";
import { AppError } from "../common/errors/AppError";
import { CONFIGS } from "../common/configs";
import { ServiceResponseDTO } from "../common/types/HttpType";
import { dynamic_messages, CUSTOMER_MESSAGES, MESSAGES } from "../common/constants/messages";
import { CustomerRepository } from "@/repositories/CustomerRepository";
import { createCustomerByAiDto, createCustomerDto } from "@/common/dtos/Customer.dto";
import { CustomerResource } from "@/transformers/resources/CustomerResource";
import { LoadPagesDto } from "@/common/dtos/IPaginator";
import { paginator } from "@/transformers/Paginator";
import { CustomerCollection } from "@/transformers/collections/CustomerCollection";
import LLMService from "./LLMService";
import { ChatMessageRepository } from "@/repositories/ChatMessageRepository";

@Service()
export default class CustomerService {
  private customerRepository: CustomerRepository;
  private lLMService: LLMService;
  private chatMessageRepository: ChatMessageRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.chatMessageRepository = new ChatMessageRepository();
    this.lLMService = new LLMService();
  }

  public async createCustomerByAi(staff_id: number, aiMessage: createCustomerByAiDto): Promise<ServiceResponseDTO> {
    const { message_body } = aiMessage;
    let message = null;
    let data = null;
    let previousConversations = await this.chatMessageRepository.findManyAndRelations({
      where: [
        {
          sender_id: staff_id,
        },
        {
          receiver_id: staff_id,
        },
      ],
      take: CONFIGS.DATA_FETCH_LIMIT,
      order: { created_at: "ASC" },
    })

    if (!previousConversations) {
      previousConversations = [];
    }
    else {
      previousConversations
    }
    let aiResponse = await this.lLMService.getIntent(staff_id,previousConversations, message_body)

    if (aiResponse?.intent
      && aiResponse?.intent == 'customer_creation'
      && !aiResponse?.further_clarification
    ) {
      const { customer_email, customer_name, customer_phone } = aiResponse?.customer_data
      const existingCustomer = await this.customerRepository.basicFindOneByConditions({ email: customer_email });
      if (existingCustomer) {
        message = MESSAGES.COMMON.EMAIL_EXISTS;
        throw new AppError(message);
      }

      const customer = await this.customerRepository.create({ created_by: staff_id, email: customer_email, customer_name, customer_phone });
      data = CustomerResource.toJSON(customer)
      message = CUSTOMER_MESSAGES.ACCOUNT.CUSTOMER_ACCOUNT_CREATED;
    }
    else {
      message = aiResponse?.message
    }

    return { successful: true, data, message };
  }

  public async createCustomer(staff_id: number, customerData: createCustomerDto): Promise<ServiceResponseDTO> {
    const { email, customer_name, customer_phone } = customerData;
    let message = null;
    const existingCustomer = await this.customerRepository.basicFindOneByConditions({ email });
    if (existingCustomer) {
      message = MESSAGES.COMMON.EMAIL_EXISTS;
      throw new AppError(message);
    }

    const customer = await this.customerRepository.create({ created_by: staff_id, email, customer_name, customer_phone });

    message = CUSTOMER_MESSAGES.ACCOUNT.CUSTOMER_ACCOUNT_CREATED;

    return { successful: true, data: { customer: CustomerResource.toJSON(customer) }, message };
  }

  public async fetchCustomers(pageNumber?: number): Promise<ServiceResponseDTO> {
    const page_number = pageNumber || 1;
    const data_fetch_limit = CONFIGS.DATA_FETCH_LIMIT || 10;
    const limit = (page_number - 1) * data_fetch_limit;

    const dataFetchParams: LoadPagesDto = {
      page_number,
      data_fetch_limit,
      limit,
    };

    const customers =
      await this.loadPaginatedCustomers(
        dataFetchParams
      );

    return {
      successful: true,
      data: {
        page_number: page_number,
        limit,
        customers,
      },
      message: dynamic_messages.FETCHED_SUCCESSFULLY("Customer"),
    };
  }

  public async loadPaginatedCustomers(data: LoadPagesDto) {
    const { page_number, data_fetch_limit, limit } = data;
    try {
      const sentMessage = await this.customerRepository.getPagedData(
        `SELECT
            *
            FROM customers`,

        `SELECT COUNT(*) FROM customers`,
        limit,
        data_fetch_limit
      );


      if (!sentMessage) {
        return [];
      }

      return paginator({
        total: sentMessage.total as number,
        perPage: sentMessage.perPage,
        currentPage: page_number,
        data: CustomerCollection.toArray(sentMessage?.data),
      });
    } catch (error: any) {
      logger.error("Error loading customers:", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}