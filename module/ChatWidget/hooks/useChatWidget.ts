import { useQuery } from "@tanstack/react-query";
import { getOwnChatWidget } from "../service/chat-widget.service";
import { useAppDispatch } from "@/store/hooks";
import { loadChatWidget } from "../chatWidgetSlice";

const useChatWidget = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["chat-widget"],
    queryFn: getOwnChatWidget,
  });
  if (data) {
    console.log(data)
    dispatch(loadChatWidget(data));
  }

  return { isLoading };
};

export default useChatWidget;
