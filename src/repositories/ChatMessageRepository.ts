import { DataSource } from "typeorm";
import { BaseRepository } from "./BaseRepository";
import { dataSource as AppDataSource } from "../common/configs/postgres";
import ChatMessageModel from "../models/ChatMessageModel";

export class ChatMessageRepository extends BaseRepository<ChatMessageModel> {
  constructor(dataSource: DataSource = AppDataSource) {
    super(ChatMessageModel, dataSource);
  }

  async countMessagesPerStoreForAllUsersPerStore(shop_id: number) {
    return this.getRepo()
      .createQueryBuilder("chat_messages")
      .where("chat_messages.sender_type = :senderType", {
        senderType: "USER",
      })
      .andWhere("chat_messages.shop_id = :shop_id", { shop_id })
      .getCount();
  }
}
