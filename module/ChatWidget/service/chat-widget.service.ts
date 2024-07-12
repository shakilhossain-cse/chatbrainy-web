import { IChatWidget } from "@/interfaces/chat-widget.interface";
import { HttpClient } from "@/lib/axios";

export const getOwnChatWidget = (): Promise<IChatWidget> => {
  return HttpClient.get("/chat-widgets");
};

export const updateOwnChatWidget = (data: any): Promise<IChatWidget> => {
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
  
    return HttpClient.post("/chat-widgets", data, options);
  };