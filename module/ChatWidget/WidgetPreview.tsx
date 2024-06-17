"use client";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

const WidgetPreview = () => {
  const { name, description, message, primary_color, secondary_color, icon } =
    useAppSelector((state) => state.chatWidget);

  const imageUrl =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <div id="message-box" className="message-box">
        <div
          className="message-box-header"
          style={{ backgroundColor: primary_color || "#000" }}
        >
          <div className="header-left">
            <button type="button" className="back-button">
              {/* <img src={imageUrl} alt="img" /> */}
              <svg
                width="145px"
                height="145px"
                viewBox="0 0 1024.00 1024.00"
                fill={secondary_color || "#fff"}
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke={secondary_color || "#fff"}
                strokeWidth="52.224000000000004"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" />
                </g>
              </svg>
            </button>
            <div className="profile">
              <div className="thumbs-area">
                <Image src={icon || imageUrl} alt="image" width={30} height={30} />
              </div>
              <div
                className="content-area"
                style={{ color: secondary_color || "#fff" }}
              >
                <h6>{name || "ChatBriny"}</h6>
                <small>{description || "Ai Powered Chat app"}</small>
              </div>
            </div>
          </div>
          <div className="custom-dropdown">
            <button
              id="custom-dropdown-toggle"
              type="button"
              className="dropdown-button"
            >
              <svg
                fill={secondary_color || "#fff"}
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-5.94 -5.94 36.63 36.63"
                xmlSpace="preserve"
                stroke={secondary_color || "#fff"}
                strokeWidth="0.2475"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2 c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2 c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z" />{" "}
                  </g>{" "}
                </g>
              </svg>

              {/* <Image src="/align-right.png" alt="img" width={30} height={30} /> */}
            </button>
          </div>
        </div>
        <div className="message-box-body">
          <div className="widget-chat-box">
            <div className="message-bubble message-bubble-right">
              <div className="bubble-thumbs">
                <Image src={icon || imageUrl} alt="image" width={30} height={30} />
              </div>
              <div
                className="bubble-content"
                style={{
                  backgroundColor: secondary_color || "#fff",
                  color: primary_color || "#000",
                }}
              >
                {message || "Welcome to ChatBrainy"}
              </div>
            </div>
          </div>
        </div>
        <div className="message-box-footer">
          <div className="chat-input-container">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={1}
              placeholder="Type and press enter"
              defaultValue={""}
            />
            <button
              className="chat-input-btn"
              style={{ backgroundColor: primary_color || "#000" }}
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill={primary_color || "#000"}
                // stroke={secondary_color || "#fff"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M20 4L3 9.31372L10.5 13.5M20 4L14.5 21L10.5 13.5M20 4L10.5 13.5"
                    stroke={secondary_color || "#fff"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </button>
          </div>
          <div className="footer-brand-area">
            <a href="#" className="footer-brand">
              <span>
                Powered by <strong>ChatBrainy.ai</strong>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetPreview;
