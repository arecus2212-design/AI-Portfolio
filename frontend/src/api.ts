import axios from "axios";

interface ChatResponse {
  reply: string;
}

export const sendMessage = async (message: string): Promise<string> => {
  const response = await axios.post<ChatResponse>(
    "http://127.0.0.1:8000/chat",
    { message }
  );

  return response.data.reply;
};