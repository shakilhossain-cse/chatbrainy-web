"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

import { FiLogOut, FiSend } from "react-icons/fi";
import { IMessage } from "./service/message.service";
import MessageType from "./messageType/MessageType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useConversation from "./hooks/useConversation";

interface IMessageProps {
  messages: IMessage[];
  handelSubmit: (e: React.FormEvent) => Promise<void>;
  isFetching: boolean;
  ref: any;
}

const MessageBox: React.FC<IMessageProps> = ({
  messages,
  handelSubmit,
  isFetching,
  ref,
}) => {
  const { handelCloseConversation } = useConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const imageUrl =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      id="message-box"
      className="message-box dark:bg-gray-900"
      style={{ width: "100%" }}
    >
      <div className="message-box-header">
        <div className="header-left">
          <button type="button" className="back-button">
            <Image src="/angle-left.png" alt="img" width={30} height={30} />
          </button>
          <div className="profile">
            <div className="thumbs-area">
              <img src={imageUrl} alt="image" />
            </div>
            <div className="content-area">
              <h6>Hi there!</h6>
              <small>Customer Care</small>
            </div>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="custom-dropdown">
                <Image
                  src="/align-right.png"
                  alt="img"
                  width={30}
                  height={30}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handelCloseConversation}>
                <FiLogOut className="mr-2 h-4 w-4" />
                <span>Close Chat</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="message-box-body">
        <div className="widget-chat-box">
          <div ref={ref}>{isFetching ? "Loading..." : ""}</div>
          {messages &&
            messages.map((item: IMessage, index: number) => {
              return (
                <div
                  className={`message-bubble ${
                    item.userId ? "message-bubble-right" : ""
                  }`}
                  key={index}
                >
                  <div className="bubble-thumbs">
                    <img src={imageUrl} alt="img" />
                  </div>
                  <MessageType type={item.messageType} data={item.data} />
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="message-box-footer dark:bg-gray-900">
        <form className="chat-input-container " onSubmit={handelSubmit}>
          <input
            className="form-control dark:bg-gray-700"
            name="message"
            id="exampleFormControlTextarea1"
            placeholder="Type and press enter"
            defaultValue=""
          />
          <button className="chat-input-btn dark:bg-black dark:text-white">
            <FiSend />
          </button>
        </form>
        <div className="footer-brand-area">
          <a href="#" className="footer-brand">
            <span>
              Powered by <strong>ChatBrainy.ai</strong>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
