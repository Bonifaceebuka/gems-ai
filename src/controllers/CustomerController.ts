import { Service } from 'typedi';
import { Tags, Route, Controller,  Path, Query, Request, Security, Get, Post, Body } from 'tsoa';
import { HttpResponseDTO } from '../common/types/HttpType';
import { errorResponse, serverErrorResponse, successResponse } from '../common/utils/responseHandlers';
import { AppError } from '../common/errors/AppError';
import { logger } from '../common/configs/logger';
import { CUSTOMER_MESSAGES, MESSAGES } from '../common/constants/messages';
import CustomerService from '@/services/CustomerService';
import { createCustomerByAiDto, createCustomerDto } from '../common/dtos/Customer.dto';

@Tags("Customers")
@Route("api")
@Security("bearerAuth")
@Service()
export class CustomerController extends Controller {
  private customerService: CustomerService;

  constructor() {
    super();
    this.customerService = new CustomerService();
  }

  /**
   * Endpoint for creating new customers by chatting GEMS AI
   */
  @Post("/assistant")
  public async createCustomerWithAi(
    @Request() req: any,
    @Body() customerData: createCustomerByAiDto 
  ): Promise<HttpResponseDTO> {
    try {
      const { user_id: staff_id } = req.auth_user_details;
      let message = null;

      const newCustomer = await this.customerService.createCustomerByAi(
        staff_id,
        customerData
      );
      if (newCustomer.successful) {
        message = newCustomer.message;
        logger.info(message);
        this.setStatus(201);
        return successResponse(message as string, newCustomer.data, 201);
      } else {
        message = CUSTOMER_MESSAGES.ACCOUNT.CUSTOMER_ACCOUNT_CREATION_FAILED;
        this.setStatus(400);
        return errorResponse(message, newCustomer.successful);
      }
    } catch (error: any) {
      logger.info(error.message);
      if (
        error instanceof AppError &&
        error.statusCode &&
        error.statusCode >= 400 &&
        error.statusCode < 500
      ) {
        this.setStatus(400);
        return errorResponse(error.message);
      }
      return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Endpoint for creating new customers by via form submission
   */
  @Post("/customers")
  public async createCustomer(
    @Request() req: any,
    @Body() customerData: createCustomerDto 
  ): Promise<HttpResponseDTO> {
    try {
      const { user_id: staff_id } = req.auth_user_details;
      let message = null;

      const newCustomer = await this.customerService.createCustomer(
        staff_id,
        customerData
      );
      if (newCustomer.successful) {
        message = newCustomer.message;
        logger.info(message);
        this.setStatus(201);
        return successResponse(message as string, newCustomer.data, 201);
      } else {
        message = CUSTOMER_MESSAGES.ACCOUNT.CUSTOMER_ACCOUNT_CREATION_FAILED;
        this.setStatus(400);
        return errorResponse(message, newCustomer.successful);
      }
    } catch (error: any) {
      logger.info(error.message);
      if (
        error instanceof AppError &&
        error.statusCode &&
        error.statusCode >= 400 &&
        error.statusCode < 500
      ) {
        this.setStatus(400);
        return errorResponse(error.message);
      }
      return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Endpoint for fetching created custromers
   */
  @Get("/customers")
  public async fetchCustomers(
    @Query() page_number?: number
  ): Promise<HttpResponseDTO> {
    try {
      let message = null;
      const customers = await this.customerService.fetchCustomers(page_number);
      if (customers.successful) {
        message = customers.message;
        logger.info(message);
        this.setStatus(200);
        return successResponse(message as string, customers.data);
      } else {
        message = customers.message as string;
        this.setStatus(400);
        return errorResponse(message, customers.successful);
      }
    } catch (error: any) {
      logger.info(error.message);
      if (
        error instanceof AppError &&
        error.statusCode &&
        error.statusCode >= 400 &&
        error.statusCode < 500
      ) {
        this.setStatus(400);
        return errorResponse(error.message);
      }
      return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
    }
    }
}