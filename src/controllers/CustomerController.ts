import { Service } from 'typedi';
import { Tags, Route, Controller,  Path, Query, Request, Security, Get } from 'tsoa';
import { HttpResponseDTO } from '../common/types/HttpType';
import { errorResponse, serverErrorResponse, successResponse } from '../common/utils/responseHandlers';
import { AppError } from '../common/errors/AppError';
import { logger } from '../common/configs/logger';
import { CUSTOMER_MESSAGES, MESSAGES } from '../common/constants/messages';
import CustomerService from '@/services/CustomerService';

@Tags("Customers")
@Route("customers")
@Service()
export class CustomerController extends Controller {
  private customerService: CustomerService;

  constructor() {
    super();
    this.customerService = new CustomerService();
  }

  // @Get("/:shop_id")
  // @Security("bearerAuth")
  // public async fetchCustomers(
  //   @Path() shop_id: string,
  //   @Request() req: any,
  //   @Query() page_number?: number
  // ): Promise<HttpResponseDTO> {
  //   try {
  //     const { user_id: merchant_id } = req.auth_user_details;
  //     let message = null;

  //     const customers = await this.customerService.fetchCustomers(
  //       shop_id,
  //       merchant_id,
  //       page_number
  //     );
  //     if (customers.successful) {
  //       message = customers.message;
  //       logger.info(message);
  //       this.setStatus(200);
  //       return successResponse(message as string, customers.data);
  //     } else {
  //       message = CUSTOMER_MESSAGES.EMAIL_VERIFICATION.FAILED;
  //       this.setStatus(400);
  //       return errorResponse(message, customers.successful);
  //     }
  //   } catch (error: any) {
  //     logger.info(error.message);
  //     if (
  //       error instanceof AppError &&
  //       error.statusCode &&
  //       error.statusCode >= 400 &&
  //       error.statusCode < 500
  //     ) {
  //       this.setStatus(400);
  //       return errorResponse(error.message);
  //     }
  //     return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @Get("/:shop_id/:customer_id")
  // @Security("bearerAuth")
  // public async fetchCustomerChatSessions(
  //   @Path() shop_id: string,
  //   @Path() customer_id: string,
  //   @Request() req: any,
  //   @Query() page_number?: number
  // ): Promise<HttpResponseDTO> {
  //   try {
  //     const { user_id: merchant_id } = req.auth_user_details;
  //     let message = null;

  //     const customers = await this.customerService.fetchCustomerSessions(
  //       shop_id,
  //       customer_id,
  //       merchant_id,
  //       page_number
  //     );
  //     if (customers.successful) {
  //       message = customers.message;
  //       logger.info(message);
  //       this.setStatus(200);
  //       return successResponse(message as string, customers.data);
  //     } else {
  //       message = customers.message as string;
  //       this.setStatus(400);
  //       return errorResponse(message, customers.successful);
  //     }
  //   } catch (error: any) {
  //     logger.info(error.message);
  //     if (
  //       error instanceof AppError &&
  //       error.statusCode &&
  //       error.statusCode >= 400 &&
  //       error.statusCode < 500
  //     ) {
  //       this.setStatus(400);
  //       return errorResponse(error.message);
  //     }
  //     return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
  //   }
  //   }
}