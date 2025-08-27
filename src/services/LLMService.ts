import { CONFIGS } from "@/common/configs";
import { logger } from "@/common/configs/logger";
import { getUserIntentFromChat } from "@/common/constants/llm_prompts";
import { AppError } from "@/common/errors/AppError";
import { makeApiCall } from "@/common/utils/axios";
import { Service } from "typedi";

@Service()
export default class LLMService {

   public async getIntent(context: any, message: string)
    {
        const composedPrompt = getUserIntentFromChat(message, context)
        const systemMessage = "Extract user's intent and the customer creation data(if there is any) from the submitted texts.";
        const airesponse = await this.getAIResponse(composedPrompt, systemMessage);

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
}