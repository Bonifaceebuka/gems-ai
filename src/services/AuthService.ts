import { Service } from "typedi";
import { logger } from "../common/configs/logger";
import { AppError } from "../common/errors/AppError";
import { UserRepository } from "../repositories/UserRepository";
import { CONFIGS } from "../common/configs";
import { ServiceResponseDTO } from "../common/types/HttpType";
import { compareHash, generateJWT, generateOTP, generateRefreshToken, generateUUID, hashString } from "../common/utils";
import { authUserDto, loginUserDto, CustomerTokenRefreshDTO } from "../common/dtos/User.dto";
import jwt from "jsonwebtoken";
import { CUSTOMER_MESSAGES, MESSAGES } from "../common/constants/messages";
import { UserResource } from "../transformers/resources/UserResource";

@Service()
export default class AuthService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  public async registerUser(req: authUserDto): Promise<ServiceResponseDTO> {
    const { email, password, first_name, last_name } = req;
    let whereConditions = {
      email
    }
    let message = null;
    const existingMerchant = await this.userRepository.basicFindOneByConditions(whereConditions);
    if (existingMerchant) {
      message = MESSAGES.COMMON.EMAIL_EXISTS;
      throw new AppError(message);
    }

    const hashedPassword = await hashString(password);
    const { otp, expireAt: otp_expires_at } = generateOTP(30);
    const { uuid, expiresAt } = generateUUID();

    const user = await this.userRepository.create({ email, first_name, last_name, otp, otp_expires_at, verification_token: uuid, verified_at: expiresAt, password: hashedPassword });

    message = CUSTOMER_MESSAGES.AUTH.REGISTRATION.SUCCESSFUL;

    const jwtDetails = generateJWT({ email: user.email, user_id: user.id }, 'USER');

    return { successful: true, data: { user: UserResource.toJSON(user), jwtDetails }, message };
  }

  public async loginUser(req: loginUserDto): Promise<{ isSuccess: boolean, message?: string, data?: any }> {
    const { email, password } = req;

    const existingUser = await this.userRepository.findOneAndRelations({
      where: { email }
    });
    if (!existingUser) {
      throw new AppError(CUSTOMER_MESSAGES.ACCOUNT.INVALID_CREDENTIALS)
    }

    const isPasswordCheckOK = await compareHash(password, existingUser.password);
    if (!isPasswordCheckOK) {
      throw new AppError(CUSTOMER_MESSAGES.ACCOUNT.INVALID_CREDENTIALS)
    }

    const jwtSignature = { email: existingUser.email, user_id: existingUser.id };
    const jwtDetails = {
      jwt_token: generateJWT(jwtSignature, 'USER'),
      refresh_jwt_token: generateRefreshToken(jwtSignature),
    };
    logger.debug(CUSTOMER_MESSAGES.AUTH.LOGIN.JWT_GENERATED)

    return {
      isSuccess: true,
      data: {
        user: UserResource.toJSON(existingUser),
        token: jwtDetails,
      },
      message: CUSTOMER_MESSAGES.AUTH.LOGIN.LOGIN_SUCCESSFUL,
    };
  }

  public async getRefreshToken(
    req: CustomerTokenRefreshDTO
  ): Promise<ServiceResponseDTO | AppError> {
    const { refresh_jwt_token } = req;

    let message = null;
    let jwtSignature;
    try {
      if (!refresh_jwt_token) {
        logger.error("No auth header found!");
        return new AppError("JWT not found!", 404);
      }

      jwt.verify(
        refresh_jwt_token,
        CONFIGS.JWT_TOKEN.REFRESH_JWT_SECRET,
        (error: any, decoded: any) => {
          if (error || !decoded || !decoded.jwtData) {
            logger.error(error);
            return new AppError("Invalid token!", 403);
          }
          jwtSignature = decoded.jwtData;
          console.log({ jwtSignature })
        }
      );

      const jwtDetails = {
        jwt_token: generateJWT(jwtSignature, "USER"),
        // refresh_jwt_token: generateRefreshToken(jwtSignature),
      };

      return {
        successful: true,
        data: jwtDetails,
        message: "Login was successful",
      };
    } catch (error: any) {
      message = `Login token refresh failed!`;
      logger.error(message, {
        error: error.message,
        stack: error.stack,
      });
      if (
        error instanceof AppError &&
        error.statusCode &&
        error.statusCode >= 400 &&
        error.statusCode < 500
      ) {
        return { successful: false, data: null, message: error.message };
      }
      throw new AppError(message, 500);
    }
  }
}