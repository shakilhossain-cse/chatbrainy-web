"use client";
import WidgetEditor from "@/module/ChatWidget/WidgetEditor";
import WidgetPreview from "@/module/ChatWidget/WidgetPreview";
import useChatWidget from "@/module/ChatWidget/hooks/useChatWidget";

const ChatWidget = () => {
  const { isLoading } = useChatWidget();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <WidgetEditor />
      <WidgetPreview />
    </div>
  );
};

export default ChatWidget;
