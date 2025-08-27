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
            {},
            staff_id
        );

        logger.debug("User chat saved successfully")
        const airesponse = await this.getAIResponse(composedPrompt, systemMessage);

        await this.storeConversation(
            message, 
            CHAT_MESSAGE_SENDER_TYPE.USER,
            ...airesponse,
            undefined,
            staff_id
        )
        logger.debug("AI chat response saved successfully")

        return airesponse
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
    metadata?: any,
    sender_id?: number,
    receiver_id?: number,
  ) {
    
     await this.chatMessageRepository.create({
        message_body,
        sender_id,
        receiver_id,
        sender_type: senderType,
        metadata
      });

      logger.info("Chat message successfully added!");
  }
}