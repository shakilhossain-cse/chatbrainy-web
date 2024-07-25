import React from "react";
import TextMessage from "./TextMessage";
import AudioMessage from "./AudioMessage";
import VideoMessage from "./VideoMessage";
import ImageMessage from "./ImageMessage";

interface IMessageType {
  type: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
  data: string;
}

const MessageType: React.FC<IMessageType> = ({ type, data }) => {
  switch (type) {
    case "TEXT":
      return <TextMessage message={data} />;
    case "AUDIO":
      return <AudioMessage audioUrl={data} />;
    case "VIDEO":
      return <VideoMessage videoUrl={data} />;
    case "IMAGE":
      return <ImageMessage imageUrl={data} />;
    default:
      return <h4>Message type not supported</h4>;
  }
};

export default MessageType;
