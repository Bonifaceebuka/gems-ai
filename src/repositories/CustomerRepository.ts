import { DataSource } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { dataSource as AppDataSource } from "../common/configs/postgres";
import CustomerModel from "../models/CustomerModel";

export class CustomerRepository extends BaseRepository <CustomerModel> {
  constructor(dataSource: DataSource = AppDataSource) {
    super(CustomerModel, dataSource);
  }
}
