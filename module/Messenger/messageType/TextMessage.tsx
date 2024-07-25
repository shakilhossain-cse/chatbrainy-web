import React from "react";

const TextMessage = ({ message }: { message: string }) => {
  return <div className="bubble-content">{message}</div>;
};

export default TextMessage;
