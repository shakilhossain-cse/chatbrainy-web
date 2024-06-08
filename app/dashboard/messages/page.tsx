"use client";
import MessageBox from "@/module/Messenger/MessageBox";
import UserList from "@/module/Messenger/UserList";
import { useAppSelector } from "@/store/hooks";

export default function MessagePage() {
  const { visitorId } = useAppSelector((state) => state.messages);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 overflow-y-scroll h-[32rem]">
        <UserList />
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
