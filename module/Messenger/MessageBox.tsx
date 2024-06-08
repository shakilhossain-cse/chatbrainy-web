"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

import { FiSend } from "react-icons/fi";
import useMessage from "./hooks/useMessage";
import { IMessage } from "./service/message.service";

const MessageBox = () => {
  const { messages, handelSubmit, isFetching, ref } = useMessage();
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
    <div id="message-box" className="message-box" style={{ width: "100%" }}>
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
        <div className="custom-dropdown">
          <button
            id="custom-dropdown-toggle"
            type="button"
            className="dropdown-button"
          >
            <Image src="/align-right.png" alt="img" width={30} height={30} />
          </button>
        </div>
      </div>
      <div className="message-box-body">
        <div className="widget-chat-box">
          {/* <div ref={ref}>{isFetchingNextPage ? "Loading..." : ""}</div> */}
          {/* {messages
                .map((item: IMessage) => (
                  <div
                    className={`message-bubble ${
                      item.userId ? "message-bubble-right" : ""
                    }`}
                    key={item.id}
                  >
                    <div className="bubble-thumbs">
                      <img src={imageUrl} alt="img" />
                    </div>
                    <div className="bubble-content">{item.message}</div>
                  </div>
                ))
            } */}

          <div ref={ref}>{isFetching ? "Loading..." : ""}</div>
          {messages && messages.map((item: IMessage) => {
            console.log("🚀 ~ {messages&&messages.map ~ item:", item)
            return(
              <div
                className={`message-bubble ${
                  item.userId ? "message-bubble-right" : ""
                }`}
                key={item.id}
              >
                <div className="bubble-thumbs">
                  <img src={imageUrl} alt="img" />
                </div>
                <div className="bubble-content">{item.message}</div>
              </div>
            )})}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="message-box-footer">
        <form className="chat-input-container" onSubmit={handelSubmit}>
          <input
            className="form-control"
            name="message"
            id="exampleFormControlTextarea1"
            placeholder="Type and press enter"
            defaultValue=""
          />
          <button className="chat-input-btn">
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
