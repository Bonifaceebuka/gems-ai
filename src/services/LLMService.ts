import { CONFIGS } from "@/common/configs";
import { logger } from "@/common/configs/logger";
import { getUserIntentFromChat } from "@/common/constants/llm_prompts";
import { CHAT_MESSAGE_SENDER_TYPE } from "@/common/enums/IndexEnum";
import { AppError } from "@/common/errors/AppError";
import { makeApiCall } from "@/common/utils/axios";
import { ChatMessageRepository } from "@/repositories/ChatMessageRepository";
import { Service } from "typedi";

@Service()
export default class LLMService {
  private chatMessageRepository: ChatMessageRepository;

  constructor() {
    this.chatMessageRepository = new ChatMessageRepository();
  }

   public async getIntent(staff_id: number, context: any, message: string)
    {
        const composedPrompt = getUserIntentFromChat(message, context)
        const systemMessage = "Extract user's intent and the customer creation data(if there is any) from the submitted texts.";
        
        await this.storeConversation(
            message, 
            CHAT_MESSAGE_SENDER_TYPE.USER,
            CHAT_MESSAGE_SENDER_TYPE.BOT,
            {},
            staff_id
        );

        logger.debug("User chat saved successfully")
        let aiResponse = await this.getAIResponse(composedPrompt, systemMessage);
        aiResponse = JSON.parse(aiResponse);

        await this.storeConversation(
            aiResponse?.message, 
            CHAT_MESSAGE_SENDER_TYPE.BOT,
            CHAT_MESSAGE_SENDER_TYPE.USER,
            aiResponse,
            undefined,
            staff_id
        )
        logger.debug("AI chat response saved successfully")

        return aiResponse
   }

     async getAIResponse(
    prompt: string,
    systemMessage: string,
  ): Promise<any> {
    try {
      const formattedMessage: { role: string; content: string }[] = [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: prompt,
        },
      ];
      const requestOptions: any = {
        model: CONFIGS.LLM.DEFAULT_MODEL,
        messages: formattedMessage,
        stream: false,
      };

     let response = await makeApiCall(`${CONFIGS.LLM.DEFAULT_MODEL_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
            data: JSON.stringify(requestOptions),
        });
      return response.message.content;
    } catch (err: any) {
      logger.error("Error streaming LLM response:", err);
      throw new AppError("Unable to get a resonse from the LLM");
    }
  }

  public async storeConversation(
    message_body: string,
    senderType: CHAT_MESSAGE_SENDER_TYPE,
    receiver_type?: CHAT_MESSAGE_SENDER_TYPE,
    metadata?: any,
    sender_id?: number,
    receiver_id?: number,
  ) {
    
     await this.chatMessageRepository.create({
        message_body,
        sender_id,
        receiver_id,
        sender_type: senderType,
        receiver_type,
        metadata:{
            ...metadata
        }
      });

      logger.info("Chat message successfully added!");
  }
}