import { Service } from 'typedi';
import { Tags, Route, Controller, Post, Body, Put} from 'tsoa';
import { HttpResponseDTO } from '../common/types/HttpType';
import { errorResponse, serverErrorResponse, successResponse } from '../common/utils/responseHandlers';
import AuthService from '../services/AuthService';
import { authUserDto, loginUserDto, CustomerTokenRefreshDTO } from '../common/dtos/User.dto';
import { AppError } from '../common/errors/AppError';
import { logger } from '../common/configs/logger';
import { CUSTOMER_MESSAGES, MESSAGES } from '../common/constants/messages';

@Tags("Auth")
@Route("api/auth")
@Service()
export class AuthController extends Controller {
    constructor(
        private readonly authService: AuthService,
    ){
        super()
    }

    /**
     * User registration endpoint
     */
    @Post("/register")
    public async registerUser(
        @Body() req: authUserDto
    )
    : Promise<HttpResponseDTO> 
    {
        try {
            const newUser = await this.authService.registerUser(req);
            if (!newUser.successful) {
                logger.info(newUser?.message)
                this.setStatus(400)
                return errorResponse(newUser?.message as string, newUser.data)
                }

            logger.info(newUser?.message)
            this.setStatus(201)
            return successResponse(newUser?.message as string, newUser.data, 201)
        } catch (error: any) {
            logger.error(error.message);
            if((error instanceof AppError && error.statusCode) && (error.statusCode >= 400 && error.statusCode < 500)){
                this.setStatus(400)
                return errorResponse(error.message);
            }
            return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
            
        }

    }

    /**
     * User login endpoint
     */
    @Post("/login")
    public async login(@Body() req: loginUserDto)
        : Promise<HttpResponseDTO>
    {
        try {
            const authUser = await this.authService.loginUser(req);
            const { message, data } = authUser;
            const {token, user} = data;
            logger.info(message)
            if (!authUser?.isSuccess) {
                this.setStatus(400)
                return errorResponse(CUSTOMER_MESSAGES.AUTH.LOGIN.INVALID_LOGIN)
            }
            else{
                this.setStatus(200)
                const data ={
                    user,
                    token
                }
                return successResponse(CUSTOMER_MESSAGES.AUTH.LOGIN.LOGIN_SUCCESSFUL, data, 200)
            }
        } catch (error: any) {
            logger.error(error.message);
            if((error instanceof AppError && error.statusCode) && (error.statusCode >= 400 && error.statusCode < 500)){
                this.setStatus(400)
                return errorResponse(error.message);
            }
            return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * User JWT refresh endpoint
     */
    @Put("/refresh-token")
    public async merchantRefreshToken(
        @Body() refresh_jwt_token: CustomerTokenRefreshDTO
    ): Promise<HttpResponseDTO> {
        try {
        let merchantAuth: any = {};
        merchantAuth = await this.authService.getRefreshToken(
            refresh_jwt_token
        );
        if (!merchantAuth || !merchantAuth.successful) {
            logger.info(merchantAuth?.message);
            this.setStatus(400);
            return errorResponse(
            merchantAuth?.message as string,
            merchantAuth.data
            );
        }

        logger.info(merchantAuth?.message);
        this.setStatus(200);
        return successResponse(
            merchantAuth?.message as string,
            merchantAuth.data,
            200
        );
        } catch (error: any) {
        logger.error(error.message);
        if (
            error instanceof AppError &&
            error.statusCode &&
            error.statusCode >= 400 &&
            error.statusCode < 500
        ) {
            this.setStatus(error.statusCode);
            return errorResponse(error.message, error.statusCode);
        }
        this.setStatus(500);
        return serverErrorResponse(MESSAGES.COMMON.INTERNAL_SERVER_ERROR);
        }
    }
}