import dotenv from "dotenv";
import { AppError } from "../errors/AppError";
import { logger } from "./logger";
dotenv.config();

enum EnvironmentKeys {
    NODE_ENV = 'NODE_ENV',
    JWT_SECRET = 'JWT_SECRET',
    REFRESH_JWT_SECRET = 'REFRESH_JWT_SECRET',
    JWT_ISSUER = 'JWT_ISSUER',
    PORT = 'PORT',
    APP_URL='APP_URL',
    PG_HOST = 'PG_HOST',
    PG_PORT = 'PG_PORT',
    PG_USERNAME = 'PG_USERNAME',
    PG_DATABASE = 'PG_DATABASE',
    PG_PASSWORD = 'PG_PASSWORD',
}

export function getEnv(key: EnvironmentKeys): string {
    const envKey = EnvironmentKeys[key];
    const envValue = process.env[envKey] as string;
    if (!envValue) {
        logger.info(`Missing environment variable: ${key}`);
        throw new AppError (`Missing environment variable: ${key}`, 500);
    }
    return envValue;
}

export const CONFIGS = {
  NODE_ENV: getEnv(EnvironmentKeys.NODE_ENV),
  APP_NAME: "GEMS AI Service",
  DATA_FETCH_LIMIT: 20,
  SERVER_PORT: getEnv(EnvironmentKeys.PORT),
  BASE_URL: `localhost:${getEnv(EnvironmentKeys.PORT)}`,
  APP_URL: getEnv(EnvironmentKeys.APP_URL),
  IS_PRODUCTION:
    getEnv(EnvironmentKeys.NODE_ENV) === "prod" ||
    getEnv(EnvironmentKeys.NODE_ENV) === "production"
      ? true
      : false,
  JWT_TOKEN: {
    JWT_SECRET: getEnv(EnvironmentKeys.JWT_SECRET),
    STATELESS_EXPIRES_IN: "3600s",
    REFRESH_JWT_SECRET: getEnv(EnvironmentKeys.REFRESH_JWT_SECRET),
    JWT_ISSUER: getEnv(EnvironmentKeys.JWT_ISSUER),
  },
  DATABASE: {
    HOST: getEnv(EnvironmentKeys.PG_HOST),
    PORT: getEnv(EnvironmentKeys.PG_PORT) as unknown as number,
    USERNAME: getEnv(EnvironmentKeys.PG_USERNAME),
    PASSWORD: getEnv(EnvironmentKeys.PG_PASSWORD),
    DATABASE: getEnv(EnvironmentKeys.PG_DATABASE),
  },
  HTTP_ALLOWED_HEADERS: [
    "Content-Type",
    "Authorization",
    "Origin",
    "Accept",
    "X-Requested-With",
    "x-jwt-token",
    "x-jwt-refresh-token",
    "Content-Length",
    "Accept-Language",
    "Accept-Encoding",
    "Connection",
    "Access-Control-Allow-Origin",
  ],
  HTTP_METHODS: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  WEBSOCKET_METHODS: ["GET", "POST"],
  FRONT_ENDS: [
    "http://localhost:3000",
  ]
};