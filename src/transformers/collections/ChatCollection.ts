import { ConversationDTO } from "@/common/types/chatType";
import ChatMessageModel from "@/models/ChatMessageModel";
import { ChatResource } from "../resources/ChatResource";

export class ChatCollection {
  static ConversationsToJSON(
    conversations: ChatMessageModel[]
  ): ConversationDTO[] {
    return conversations.map((conversation: ChatMessageModel) =>
      ChatResource.ConversationToJSON(conversation)
    );
  }
}