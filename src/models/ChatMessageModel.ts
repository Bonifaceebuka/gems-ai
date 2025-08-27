import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";
import { CHAT_MESSAGE_SENDER_TYPE } from "../common/enums/IndexEnum";

@Entity({ name: "chat_messages" })
export default class ChatMessageModel extends BaseModel {
  @Column({ nullable: true })
  sender_id?: number;

  @Column({ nullable: true })
  receiver_id?: number;

  @Column({
    type: "enum",
    enum: CHAT_MESSAGE_SENDER_TYPE,
    default: CHAT_MESSAGE_SENDER_TYPE.USER,
  })
  sender_type!: CHAT_MESSAGE_SENDER_TYPE;

  @Column({
    type: "enum",
    enum: CHAT_MESSAGE_SENDER_TYPE,
    default: CHAT_MESSAGE_SENDER_TYPE.USER,
  })
  receiver_type!: CHAT_MESSAGE_SENDER_TYPE;

  @Column({ type: "jsonb", nullable: true })
  metadata?: any;

  @Column({ type: "text" })
  message_body!: string;
}