import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { CHAT_MESSAGE_SENDER_TYPE, CHAT_MESSAGE_TYPE, FISHOOK_INTENTS } from "../common/enums/IndexEnum";

@Entity({ name: "chat_messages" })
export default class ChatMessageModel extends BaseModel {
  @Column()
  shop_id!: number;

  @Column({ nullable: true })
  sender_id?: number;

  @Column({ nullable: true })
  receiver_id?: number;

  @Column()
  chat_session_id!: number;

  @Column({
    type: "enum",
    enum: CHAT_MESSAGE_TYPE,
    default: CHAT_MESSAGE_TYPE.RANDOM,
  })
  message_type!: CHAT_MESSAGE_TYPE;

  @Column({
    type: "enum",
    enum: FISHOOK_INTENTS,
    nullable: true,
  })
  intervention?: FISHOOK_INTENTS;

  @Column({
    type: "enum",
    enum: FISHOOK_INTENTS,
    nullable: true,
  })
  parent_intervention?: FISHOOK_INTENTS;

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
  content!: string;

  @Column()
  sent_at!: Date;

  @Column({ nullable: true })
  read_at?: Date;

  @Column({ nullable: true })
  delivered_at?: Date;
}