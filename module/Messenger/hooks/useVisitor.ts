import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getVisitorList, getVisitorMessage } from "../service/message.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMessages } from "../messageSlice";
import { useEffect, useState } from "react";
import { getOwnChatWidget } from "@/module/ChatWidget/service/chat-widget.service";

const useVisitor = (widgetId:string) => {
 
  const dispatch = useAppDispatch();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["visitors"],
    queryFn: ({ pageParam = 1 }) => getVisitorList(pageParam, widgetId),
    getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    initialPageParam: 1,
  });

  const handelSelect = async (visitorId: string, chatWidgetId: string) => {
    const { data } = await getVisitorMessage(visitorId);
    dispatch(setMessages({ data, visitorId, chatWidgetId }));
  };

  return {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handelSelect,
  };
};

export default useVisitor;
