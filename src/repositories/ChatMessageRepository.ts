import { DataSource } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { dataSource as AppDataSource } from "../common/configs/postgres";
import ChatMessageModel from "../models/ChatMessageModel";

export class ChatMessageRepository extends BaseRepository<ChatMessageModel> {
  constructor(dataSource: DataSource = AppDataSource) {
    super(ChatMessageModel, dataSource);
  }
}
