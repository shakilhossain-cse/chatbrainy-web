import { IChatWidget } from "@/interfaces/chat-widget.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IChatWidget = {
  id: "",
  name: "",
  logo: "",
};

export const chatWidgetSlice = createSlice({
  name: "chatWidget",
  initialState,
  reducers: {
    loadChatWidget: (state, { payload }: PayloadAction<IChatWidget>) => {
      state.id = payload.id,
      state.name = payload.name,
      state.logo = payload.logo
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadChatWidget } = chatWidgetSlice.actions;

export default chatWidgetSlice.reducer;
