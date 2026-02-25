import axios from "axios";

interface ChatResponse {
  reply: string;
}

export const sendMessage = async (message: string): Promise<string> => {
  const response = await axios.post<ChatResponse>(
    "https://ai-portfolio-ftto.onrender.com/chat",
    { message }
  );

  return response.data.reply;
};