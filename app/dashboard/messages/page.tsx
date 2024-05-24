import MessageBox from "@/module/Messenger/MessageBox";
import UserList from "@/module/Messenger/UserList";

export default function MessagePage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <UserList />
      <MessageBox />
    </div>
  );
}
