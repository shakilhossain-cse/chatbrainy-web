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
  limit: number = 8
): Promise<IVisitorsResponse> => {
  return HttpClient.get(
    `/chat-widgets/visitors/a8e6682d-6cd3-2f12-8aa7-8fd884656490`,
    {
      params: { page, limit },
    }
  );
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
  return HttpClient.post(`/messages/support`, data);
};
