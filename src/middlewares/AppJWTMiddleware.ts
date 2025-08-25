import jwt from "jsonwebtoken";
import { CONFIGS } from "../common/configs";
import { logger } from "../common/configs/logger";
export function expressAuthentication(req: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const authHeader = req.headers.authorization;
        
        let token: string = '';

        if (!authHeader) {
            logger.error("No auth header found!")
            return reject(new Error("Unauthorized access!"));
        }

        if (typeof authHeader === 'string') {
            const headerParts = authHeader.trim().split(/\s+/);
            if (headerParts.length === 2 && headerParts[0] === 'Bearer') {
              token = headerParts[1];
            }
            else if(headerParts.length === 1){
                token = authHeader
            }
          }

        jwt.verify(token, CONFIGS.JWT_TOKEN.JWT_SECRET, (error:any, decoded: any) => {
            if (error || !decoded || !decoded.jwtData) {
                logger.error(error)
                return reject(new Error("Invalid token!"));
            }

            // Attach user data to request
            req.auth_user_details = decoded.jwtData;
            resolve(decoded.jwtData);
        });
    });
}
