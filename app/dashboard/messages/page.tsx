"use client";
import { loadChatWidget } from "@/module/ChatWidget/chatWidgetSlice";
import { getOwnChatWidget } from "@/module/ChatWidget/service/chat-widget.service";
import MessageBox from "@/module/Messenger/MessageBox";
import UserList from "@/module/Messenger/UserList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export default function MessagePage() {
  const [widgetId, setWidgetId] = useState<string>("");

  useEffect(() => {
    getOwnChatWidget().then((data) => {
      if (!data.id) return;
      setWidgetId(data.id);
    });
  }, []);

  const { visitorId } = useAppSelector((state) => state.messages);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 overflow-y-scroll h-[32rem]">
        {widgetId && <UserList widgetId={widgetId} />}
      </div>
      <div className="col-span-2">
        {!!visitorId ? (
          <MessageBox />
        ) : (
          <div className="message-box p-10" style={{ width: "100%" }}>
            Please select Visitor
          </div>
        )}
      </div>
    </div>
  );
}
