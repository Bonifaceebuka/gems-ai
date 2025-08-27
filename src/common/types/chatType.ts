import { CHAT_MESSAGE_SENDER_TYPE } from "../enums/IndexEnum";

export interface ConversationDTO {
  message_body: string;
  uuid: string;
  receiver_id: number | undefined;
  sender_id: number | undefined;
  sender_type: CHAT_MESSAGE_SENDER_TYPE;
  metadata?: any;
};