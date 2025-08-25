import { logger } from "@/common/configs/logger";
import { MESSAGES } from "@/common/constants/messages";
import { AppError } from "@/common/errors/AppError";
import { HttpResponseDTO } from "../common/types/HttpType";
import { errorResponse, serverErrorResponse, successResponse } from "@/common/utils/responseHandlers";
import { Controller, Get, Path, Query, Request, Route, Security, Tags } from "tsoa";
import { Service } from "typedi";

@Route("chats")
@Tags("Chat")
@Service()
export class ChatController extends Controller {
  // private chatService: ChatService;

  // constructor(private readonly shopService: ShopService) {
  //   super();
  //   this.chatService = new ChatService();
  // }
  // @Get("/:shop_id/:session_id")
  // @Security("bearerAuth")
  // public async fetchShopChatsPerSession(
  //   @Request() req: any,
  //   @Path() shop_id: string,
  //   @Path() session_id: string,
  //   @Query() page_number?: number
  // ): Promise<HttpResponseDTO> {
  //   try {
  //     const { user_id: merchant_id } = req.auth_user_details;

  //     const shopChats = await this.chatService.fetchShopSessionChats(
  //       shop_id,
  //       session_id,
  //       merchant_id,
  //       page_number
  //     );

  //     if (!shopChats.successful) {
  //       logger.info(shopChats?.message);
  //       this.setStatus(400);
  //       return errorResponse(shopChats?.message as string, shopChats.data);
  //     }
  //     logger.info(shopChats?.message);
  //     this.setStatus(200);
  //     return successResponse(shopChats?.message as string, shopChats.data, 200);
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
}