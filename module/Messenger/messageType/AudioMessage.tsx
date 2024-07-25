import React from "react";

const AudioMessage = ({ audioUrl }: { audioUrl: string }) => {
  return <div className="bubble-content">{audioUrl}</div>;
};

export default AudioMessage;
