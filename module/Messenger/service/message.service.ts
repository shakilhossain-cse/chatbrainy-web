import { HttpClient } from "@/lib/axios";

export interface IConversation {
  id: string;
  name: string;
  email: string | null;
  data: any | null;
  unSeenCount: number;
  chatWidgetId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConversationResponse {
  conversations: IConversation[];
  totalPages: number;
  currentPage: number;
}

export interface IMessage {
  id: string;
  data: string;
  messageType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
  mediaUrl: string | null;
  isSeen: boolean;
  userId: string | null;
  visitorId: string;
  chatWidgetId: string;
  createdAt: string;
}

interface IConversationMessagesResponse {
  messages: IMessage[];
  totalData: number;
  currentPage: string;
  totalPages: number;
}

export const getConversation = async (
  page: number = 1,
  chatWidgetId: string | null,
  limit: number = 8
): Promise<IConversationResponse> => {
  return await HttpClient.get(`/chat-widgets/conversation/${chatWidgetId}`, {
    params: { page, limit },
  });
};

export const getConversationMessage = async (
  conversationId: string,
  page: number = 1,
  limit: number = 10
): Promise<IConversationMessagesResponse> => {
  return await HttpClient.get(`/conversation/${conversationId}`, {
    params: { page, limit },
  });
};

export const handelCreateSupportMessage = async (data: {
  data: string;
  type: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO";
  conversationId: string;
  chatWidgetId: string;
}): Promise<IMessage> => {
  return await HttpClient.post(`/conversation/support`, data);
};

export const handelAddArchiveConversation = async (
  conversationID: string
): Promise<any> => {
  return await HttpClient.post(`/conversation/add-archive/${conversationID}`);
};

export const handelRemoveArchiveConversation = async (
  conversationID: string
): Promise<any> => {
  return await HttpClient.post(`/conversation/add-archive/${conversationID}`);
};

export const handelAddCloseConversation = async (payload: {
  conversationId: string;
  userId: string;
  close_at: Date;
}): Promise<any> => {
  return await HttpClient.post(`/conversation/close-conversation`, payload);
};
