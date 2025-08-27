import { DataSource } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { dataSource as AppDataSource } from "../common/configs/postgres";
import UserModel from "../models/UserModel";

export class UserRepository extends BaseRepository <UserModel> {
  constructor(dataSource: DataSource = AppDataSource) {
    super(UserModel, dataSource);
  }
}
