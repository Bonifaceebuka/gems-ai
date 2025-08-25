import bcrypt from "bcryptjs";
import { CONFIGS } from "../configs";
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { logger } from "../configs/logger";

export async function hashString(input: string): Promise<string> {
  if (!input) return "";

  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(input, salt);

  return hashedString;
}

export function generateOTP(time: number) {
  const oldDateObj = moment();
  const expireAt = moment(oldDateObj)
    .add(time ?? 24, 'h')
    .format() as unknown as Date;
  const randomPass = crypto.getRandomValues(new Uint8Array(8));
  const newPass = randomPass.toString();
  const password = newPass.replace(/[^\w\s]/gi, '').slice(0, 6);

  return { otp: password, expireAt };
};

export function generateUUID() {
  const currentTime = moment();
  const lifeSpan = 24
  const expiresAt = currentTime.add(lifeSpan, 'hours').format() as unknown as Date;
  return {
    uuid: uuidv4(),
    expiresAt
  }
}

export async function compareHash(input: string, hash: string): Promise<boolean> {
  const isSame = await bcrypt.compare(input, hash);
  return isSame;
}

export function generateJWT(jwtData: any, type: 'WIDGET' | 'USER' = 'USER') {
  let issuer, audience;
  let secretKey: string ='';

  try {
      audience = jwtData?.email
      issuer = CONFIGS.JWT_TOKEN.JWT_ISSUER
      secretKey = CONFIGS.JWT_TOKEN.JWT_SECRET
    return jwt.sign({ jwtData }, secretKey, {
      expiresIn: "86400s", // 1 day
      issuer,
      audience,
    });
    } catch (error) {
      throw new AppError('Unable to complete JWT generation process');
  }
}

export function generateRefreshToken(jwtData: any) {
  try {
    if (!jwtData?.email) {
          logger.error(
            `Invalid or expired JWT`
          );
          throw new AppError(
            "Invalid or expired JWT",
            403
          );

    }
      return jwt.sign({ jwtData }, CONFIGS.JWT_TOKEN.REFRESH_JWT_SECRET, {
        expiresIn: "604800s", // 7 day
        issuer: CONFIGS.JWT_TOKEN.JWT_ISSUER,
        audience: jwtData?.email,
      });
  } catch (error) {
    logger.error(
      `Unable to complete JWT refresh token generation process ${error}`
    );
    throw new AppError("Unable to complete JWT refresh token generation process",403);
  }
}