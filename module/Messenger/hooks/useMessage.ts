import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadMessages, setNewMessage } from "../messageSlice";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { getVisitorMessage, handelCreateSupportMessage } from "../service/message.service";
import { useMutation } from "@tanstack/react-query";
import { io } from "socket.io-client";

const useMessage = () => {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";
  const socket = io(socketUrl);

  const { mutate } = useMutation({ mutationFn: handelCreateSupportMessage });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const messages = useAppSelector((state) => state.messages.messages);
  const { visitorId, chatWidgetId } = useAppSelector((state) => state.messages);
  const { ref, inView } = useInView();
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMessages = async (pageNum: number) => {
    if (!visitorId) return;
    setIsFetching(true);
    try {
      const msg = await getVisitorMessage(visitorId, pageNum);
      const newMessages = msg.data; // Adjust this based on your API response structure
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
    if (inView && !isFetching) {
      fetchMessages(page);
    }
  }, [inView]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log("New message received from server:", message);
      dispatch(setNewMessage(message));
    });

    socket.on('typing', (data) => {
      console.log("User is typing:", data);
    });

    socket.on('stopTyping', (data) => {
      console.log("User stopped typing:", data);
    });

    return () => {
      socket.off('message');
      socket.off('typing');
      socket.off('stopTyping');
      socket.disconnect();
    };
  }, [socket]);

  const handelSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const messageInput = form.elements.namedItem("message") as HTMLInputElement;
    const message = messageInput.value;
    if (!message || !visitorId || !chatWidgetId) return;

    const data = {
      message,
      visitorId,
      chatWidgetId,
    };

    try {
      mutate(data);
      const newMsgData = {
        ...data,
        id: Date.now().toString(),
        messageType: "TEXT",
        mediaUrl: null,
        isSeen: false,
        userId: user.id,
        createdAt: new Date().toISOString(),
      };
      dispatch(setNewMessage(newMsgData));
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
  };
};

export default useMessage;
