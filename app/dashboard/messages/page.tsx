"use client";
import MessageBox from "@/module/Messenger/MessageBox";
import Conversations from "@/module/Messenger/Conversations";
import useMessage from "@/module/Messenger/hooks/useMessage";

export default function MessagePage() {
  const {
    messages,
    handelSubmit,
    isFetching,
    ref,
    chatWidgetId,
    conversationId,
  } = useMessage();

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 overflow-y-scroll h-[32rem]">
        {chatWidgetId && <Conversations />}
      </div>
      <div className="col-span-2">
        {!!conversationId ? (
          <MessageBox
            messages={messages}
            handelSubmit={handelSubmit}
            isFetching={isFetching}
            ref={ref}
          />
        ) : (
          <div className="message-box p-10 dark:bg-gray-900" style={{ width: "100%" }}>
            Please select Visitor
          </div>
        )}
      </div>
    </div>
  );
}
