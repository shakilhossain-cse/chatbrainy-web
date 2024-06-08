import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "./service/message.service";
interface IinitalState {
  chatWidgetId: string | null;
  visitorId: string | null;
  messages: IMessage[];
}
const initialState: IinitalState = {
  chatWidgetId: null,
  visitorId: null,
  messages: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload.data;
      state.visitorId = action.payload.visitorId;
      state.chatWidgetId = action.payload.chatWidgetId;
    },
    loadMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload];
    },
    setNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages,loadMessages, setNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
