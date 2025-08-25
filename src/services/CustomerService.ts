import { Service } from "typedi";
import { logger } from "../common/configs/logger";
import { AppError } from "../common/errors/AppError";
import { UserRepository } from "../repositories/UserRepository";
import { CONFIGS } from "../common/configs";
import { ServiceResponseDTO } from "../common/types/HttpType";
import { dynamic_messages, CUSTOMER_MESSAGES } from "../common/constants/messages";
import { CustomerRepository } from "@/repositories/CustomerRepository";

@Service()
export default class CustomerService {
  private userRepository: UserRepository;
  private customerRepository: CustomerRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.customerRepository = new CustomerRepository();
  }

  // public async fetchCustomers(
  //   shop_id: string,
  //   merchant_id: number,
  //   pageNumber?: number
  // ): Promise<ServiceResponseDTO> {
  //   const page_number = pageNumber || 1;
  //   const data_fetch_limit = CONFIGS.DATA_FETCH_LIMIT || 10;
  //   const limit = (page_number - 1) * data_fetch_limit;
  //   let message;
  //   const existingUser = await this.userRepository.basicFindOneByConditions({
  //     id: merchant_id,
  //   });

  //   if (!existingUser) {
  //     throw new AppError(CUSTOMER_MESSAGES.AUTH.UNAUTHORIZED_ACCESS, 403);
  //   }
  //   const foundShop = await this.shopRepository.basicFindOneByConditions({
  //     uuid: shop_id,
  //   });

  //   if (!foundShop) {
  //     message = dynamic_messages.NOT_FOUND("Shop");
  //     logger.warn(message);
  //     throw new AppError(message, 404);
  //   }

  //   if (foundShop.merchant_id !== existingUser.id) {
  //     message = CUSTOMER_MESSAGES.AUTH.UNAUTHORIZED_ACCESS;
  //     logger.info(message);
  //     throw new AppError(message, 404);
  //   }
  //   const dataFetchParams: LoadPagesDto = {
  //     page_number,
  //     data_fetch_limit,
  //     shop_id: foundShop.id,
  //     limit,
  //   };

  //     const customerSessions =
  //       await this.loadPaginatedCustomers(
  //         dataFetchParams
  //       );

  //   return {
  //     successful: true,
  //     data: {
  //       page_number: page_number,
  //       limit,
  //       customerSessions,
  //     },
  //     message: dynamic_messages.FETCHED_SUCCESSFULLY("Customer sessions"),
  //   };
  // }

  // public async fetchCustomerSessions(
  //   shop_id: string,
  //   customer_id: string,
  //   merchant_id: number,
  //   pageNumber?: number
  // ): Promise<ServiceResponseDTO> {
  //   const page_number = pageNumber || 1;
  //   const data_fetch_limit = CONFIGS.DATA_FETCH_LIMIT || 10;
  //   const limit = (page_number - 1) * data_fetch_limit;
  //   let message;
  //   const existingUser = await this.userRepository.basicFindOneByConditions({
  //     id: merchant_id,
  //   });

  //   if (!existingUser) {
  //     throw new AppError(CUSTOMER_MESSAGES.AUTH.UNAUTHORIZED_ACCESS, 403);
  //   }
  //   const foundShop = await this.shopRepository.basicFindOneByConditions({
  //     uuid: shop_id,
  //   });

  //   if (!foundShop) {
  //     message = dynamic_messages.NOT_FOUND("Shop");
  //     logger.info(message);
  //     throw new AppError(message, 404);
  //   }

  //   if (foundShop.merchant_id !== existingUser.id) {
  //     message = CUSTOMER_MESSAGES.AUTH.UNAUTHORIZED_ACCESS;
  //     logger.info(message);
  //     throw new AppError(message, 404);
  //   }

  //   const foundCustomer =
  //     await this.customerRepository.basicFindOneByConditions({
  //       shop_id: foundShop.id,
  //       uuid: customer_id,
  //     });

  //   if (!foundCustomer) {
  //     message = dynamic_messages.NOT_FOUND("Customer");
  //     logger.warn(message);
  //     throw new AppError(message, 404);
  //   }

  //   const dataFetchParams: LoadPagesDto = {
  //     page_number,
  //     data_fetch_limit,
  //     shop_id: foundShop.id,
  //     limit,
  //   };

  //   const customers = await this.behavioralEventService.loadPaginatedSessions(
  //     dataFetchParams,
  //     foundCustomer.id
  //   );

  //   return {
  //     successful: true,
  //     data: {
  //       page_number: page_number,
  //       limit,
  //       customers,
  //     },
  //     message: dynamic_messages.FETCHED_SUCCESSFULLY("Customers"),
  //   };
  // }
}