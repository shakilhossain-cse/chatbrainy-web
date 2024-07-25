import { createSlice } from "@reduxjs/toolkit";
import { IConversation, IMessage } from "./service/message.service";
import Conversations from "./Conversations";
interface InitialState {
  chatWidgetId: string | null;
  conversationId: string | null;
  messages: IMessage[];
  conversations: IConversation[];
  archiveConversations: IConversation[];
}
const initialState: InitialState = {
  chatWidgetId: null,
  conversationId: null,
  messages: [],
  conversations: [],
  archiveConversations: [],
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      const { messages, conversationId, chatWidgetId } = payload;
      state.messages = messages;
      state.conversationId = conversationId;
      state.chatWidgetId = chatWidgetId;
    },
    loadMessages: (state, { payload }) => {
      state.messages = payload;
    },
    setNewMessage: (state, { payload }) => {
      if (payload.conversationId === state.conversationId) {
        state.messages.push(payload);
      } else {
        const findConversation = state.conversations.find(
          (item) => item.id === payload.conversationId
        );
        if (findConversation) {
          findConversation.unSeenCount += 1;
        } else {
          state.conversations.unshift({
            id: payload.conversationId,
            chatWidgetId: payload.chatWidgetId,
            name: "new visitor",
            email: null,
            data: null,
            unSeenCount: 0,
            updatedAt: new Date().toDateString(),
            createdAt: new Date().toDateString(),
          });
        }
      }
    },
    setNewConversations: (state, action) => {
      state.conversations.push(action.payload);
    },
    loadConversations: (state, action) => {
      state.conversations = action.payload;
    },
    archiveConversation: (state, { payload }) => {
      if (state.conversationId === payload) {
        state.messages = initialState.messages;
        state.conversationId = initialState.conversationId;
      }
      const findConversation = state.conversations.find(
        (conversation) => conversation.id
      );
      if (!findConversation) return;
      state.archiveConversations.push(findConversation);
      state.conversations = state.conversations.filter(
        (conversation) => conversation.id !== payload
      );
    },
  },
});

export const {
  setMessages,
  loadMessages,
  setNewMessage,
  setNewConversations,
  loadConversations,
  archiveConversation,
} = messageSlice.actions;
export default messageSlice.reducer;
