import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadMessages, setNewMessage } from "../messageSlice";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import {
  getConversationMessage,
  handelCreateSupportMessage,
} from "../service/message.service";
import { useMutation } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { getOwnChatWidget } from "@/module/ChatWidget/service/chat-widget.service";
import { loadChatWidget } from "@/module/ChatWidget/chatWidgetSlice";

const useMessage = () => {
  const socketUrl =
    process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";
  const socket = io(socketUrl);

  const { mutate } = useMutation({ mutationFn: handelCreateSupportMessage });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const messages = useAppSelector((state) => state.messages.messages);
  const { conversationId } = useAppSelector((state) => state.messages);
  const { id: chatWidgetId } = useAppSelector((state) => state.chatWidget);
  const { ref, inView } = useInView();
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMessages = async (pageNum: number) => {
    if (!conversationId) return;
    setIsFetching(true);
    try {
      const msg = await getConversationMessage(conversationId, pageNum);
      console.log("🚀 ~ fetchMessages ~ msg:", msg);
      const newMessages = msg.messages; // Adjust this based on your API response structure
      if (newMessages.length > 0) {
        dispatch(loadMessages(newMessages));
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (inView && !isFetching && chatWidgetId) {
      fetchMessages(page);
    }
  }, [inView, chatWidgetId]);

  useEffect(() => {
    if (chatWidgetId) {
      socket.emit("joinConversation", chatWidgetId);
      socket.on("visitor:message", (message) => {
        dispatch(setNewMessage(message));
      });

      return () => {
        socket.emit("leaveConversation", chatWidgetId);
        socket.off("visitor:message");
      };
    }
  }, [chatWidgetId, socket]);

  useEffect(() => {
    getOwnChatWidget().then((data) => {
      if (!data.id) return;
      console.log(data);
      dispatch(loadChatWidget(data));
    });
  }, []);

  const handelSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const messageInput = form.elements.namedItem("message") as HTMLInputElement;
    const message = messageInput.value;
    if (!message || !conversationId || !chatWidgetId) return;

    const data = {
      data: message,
      type: "TEXT",
      conversationId,
      chatWidgetId,
    };

    const messageData = {
      id: Date.now().toString(),
      data: message,
      messageType: "TEXT",
      mediaUrl: null,
      isSeen: false,
      userId: user.id,
      conversationId: conversationId,
      chatWidgetId: chatWidgetId,
      createdAt: new Date().toISOString(),
    };
    try {
      mutate(data);
      dispatch(setNewMessage(messageData));
      messageInput.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return {
    messages,
    handelSubmit,
    isFetching,
    ref,
    chatWidgetId,
    conversationId,
  };
};

export default useMessage;
