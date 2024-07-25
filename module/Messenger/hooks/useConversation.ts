import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import {
  getConversation,
  getConversationMessage,
  handelAddArchiveConversation,
  handelAddCloseConversation,
} from "../service/message.service";
import {
  archiveConversation,
  loadConversations,
  setMessages,
} from "../messageSlice";

const useConversation = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const user = useAppSelector((state) => state.auth);
  const widget = useAppSelector((state) => state.chatWidget);
  const data = useAppSelector((state) => state.messages);
  const fetchConversations = async () => {
    if (!widget.id) return;
    setIsFetching(true);
    try {
      const response = await getConversation(page, widget.id);
      dispatch(loadConversations(response.conversations));
      setHasNextPage(response.currentPage < response.totalPages);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [page, widget.id]);

  const fetchNextPage = () => {
    if (hasNextPage && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handelSelect = async (conversationId: string, chatWidgetId: string) => {
    try {
      const response = await getConversationMessage(conversationId);
      dispatch(
        setMessages({
          messages: response.messages,
          conversationId,
          chatWidgetId,
        })
      );
    } catch (error) {
      console.error("Failed to fetch conversation messages:", error);
    }
  };

  const handelAddArchive = async (conversationId: string) => {
    try {
      handelAddArchiveConversation(conversationId);
      dispatch(archiveConversation(conversationId));
    } catch (error) {
      console.error("Failed to archive conversation:", error);
    }
  };

  const handelCloseConversation = async () => {
    if (!data.conversationId || user.id) return;
    const payload = {
      conversationId: data.conversationId,
      userId: user.id,
      close_at: new Date(),
    };
    try {
      await handelAddCloseConversation(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    conversations: data.conversations,
    isFetching,
    fetchNextPage,
    hasNextPage,
    handelSelect,
    handelAddArchive,
    handelCloseConversation,
  };
};

export default useConversation;
