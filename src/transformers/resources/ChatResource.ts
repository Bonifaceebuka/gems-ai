import { ConversationDTO } from '@common/types/chatType';
import ChatMessageModel from '@models/ChatMessageModel';
export class ChatResource {
  static ConversationToJSON(conversation: ChatMessageModel) : ConversationDTO{
    const {
      uuid,
      message_body,
      receiver_id,
      sender_id,
      sender_type,
      metadata,
    } = conversation;
    return {
      uuid,
      message_body,
      receiver_id,
      sender_id,
      sender_type,
      metadata: metadata || {},
    };
  }
}
