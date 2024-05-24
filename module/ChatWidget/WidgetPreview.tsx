"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";

interface IMessage {
  sender: string;
  text: string;
}
const WidgetPreview = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");

  const imageUrl =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <div id="message-box" className="message-box">
        <div className="message-box-header">
          <div className="header-left">
            <button type="button" className="back-button">
              {/* <img src={imageUrl} alt="img" /> */}
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
            <div className="message-bubble message-bubble-right">
              <div className="bubble-thumbs">
                <img src={imageUrl} alt="img" />
              </div>
              <div className="bubble-content">Lorem ipsum dolor sit amet.</div>
            </div>
            <div className="message-bubble">
              <div className="bubble-thumbs">
                <img src={imageUrl} alt="img" />
              </div>
              <div className="bubble-content">Lorem ipsum dolor sit amet.</div>
            </div>
            <div className="message-bubble message-bubble-right">
              <div className="bubble-thumbs">
                <img src={imageUrl} alt="img" />
              </div>
              <div className="bubble-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere, sunt.
              </div>
            </div>
            <div className="message-bubble">
              <div className="bubble-thumbs">
                <img src={imageUrl} alt="img" />
              </div>
              <div className="bubble-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facere, sunt.
              </div>
            </div>
            <div className="message-bubble message-bubble-right">
              <div className="bubble-thumbs">
                <img src={imageUrl} alt="img" />
              </div>
              <div className="bubble-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                laborum dicta fugiat molestiae voluptatum ipsam. Velit
                doloremque sunt, excepturi placeat quae quas eligendi commodi
                nemo obcaecati iure ipsum ipsa. Officia?
              </div>
            </div>
            <div className="message-bubble">
              <div className="bubble-thumbs">
                <img src={imageUrl} alt="img" />
              </div>
              <div className="bubble-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                laborum dicta fugiat molestiae voluptatum ipsam. Velit
                doloremque sunt, excepturi placeat quae quas eligendi commodi
                nemo obcaecati iure ipsum ipsa. Officia?
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
            <button className="chat-input-btn">
              Send
              {/* <img src="./assets/img/chat-widget/happy-face.png" alt="img" /> */}
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
