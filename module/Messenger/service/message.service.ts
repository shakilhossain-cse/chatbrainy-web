import { HttpClient } from "@/lib/axios";

interface IVisitor {
  id: string;
  name: string;
  email: string | null;
  data: any | null;
  chatWidgetId: string;
  createdAt: string;
  updatedAt: string;
}

interface IVisitorsResponse {
  visitors: IVisitor[];
  totalPages: number;
  currentPage: number;
}

export interface IMessage {
  id: string;
  message: string;
  messageType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
  mediaUrl: string | null;
  isSeen: boolean;
  userId: string | null;
  visitorId: string;
  chatWidgetId: string;
  createdAt: string;
}

interface IVisitorMessagesResponse {
  data: IMessage[];
  totalData: number;
  currentPage: string;
  totalPages: number;
}
export const getVisitorList = async (
  page: number = 1,
  chatWidgetId: string | null,
  limit: number = 8
): Promise<IVisitorsResponse> => {
  console.log("🚀 ~ chatWidgetId:", chatWidgetId);
 return await HttpClient.get(`/chat-widgets/visitors/${chatWidgetId}`, {
    params: { page, limit },
  });

};

export const getVisitorMessage = async (
  visitorId: string,
  page: number = 1,
  limit: number = 10
): Promise<IVisitorMessagesResponse> => {
  return HttpClient.get(`/messages/${visitorId}`, {
    params: { page, limit },
  });
};

export const handelCreateSupportMessage = async (data: {
  message: string;
  visitorId: string;
  chatWidgetId: string;
}) => {
  const response = await HttpClient.post(`/messages/support`, data);
  return response;
};
