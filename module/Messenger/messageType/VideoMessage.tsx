import React from "react";

const VideoMessage = ({ videoUrl }: { videoUrl: string }) => {
  return <div className="bubble-content">{videoUrl}</div>;
};

export default VideoMessage;
