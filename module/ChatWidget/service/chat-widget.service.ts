import { IChatWidget } from "@/interfaces/chat-widget.interface";
import { HttpClient } from "@/lib/axios";

export const getOwnChatWidget = ():Promise<IChatWidget> => {
    return HttpClient.get("/chat-widgets");
}

export const updateOwnChatWidget = (data: IChatWidget):Promise<IChatWidget> => {
    return HttpClient.put("/chat-widgets", data);
}