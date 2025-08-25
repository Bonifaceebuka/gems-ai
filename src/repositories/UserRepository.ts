import { DataSource } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { dataSource as AppDataSource } from "../common/configs/postgres";
import UserModel from "../models/UserModel";
import { UserStatus } from "../common/enums/UserEnums";
import moment from "moment";

export class UserRepository extends BaseRepository <UserModel> {
  constructor(dataSource: DataSource = AppDataSource) {
    super(UserModel, dataSource);
  }

  async setUserToVerified(setUserToVerified: any) {
    const { id, verification_token, otp } = setUserToVerified;
   await this.updateOne({id, verification_token, otp}, 
        {user_status: UserStatus.ACTIVE, 
          otp: null,
          otp_expires_at: null,
          token_expires_at: null,
          verification_token: null,
          verified_at: moment().toDate()
        });
    }

    async setNewPasswordRequestToken(password_reset_token: string, token_expires_at: Date, email: string): Promise<void>  {
        
        await this.updateOne({ email }, { verification_token: password_reset_token, token_expires_at}); 
      }

    
}
