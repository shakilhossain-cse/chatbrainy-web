// store/chatWidgetSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatWidget } from "@/interfaces/chat-widget.interface";

const initialState: IChatWidget = {
  name: "",
  description: "",
  website_url: "",
  primary_color: "#000",
  secondary_color: "#fff",
  icon: "",
  message: "",
};

type UpdateFieldPayload = {
  key: keyof IChatWidget;
  value: string;
};

export const chatWidgetSlice = createSlice({
  name: "chatWidget",
  initialState,
  reducers: {
    loadChatWidget: (state, { payload }: PayloadAction<IChatWidget>) => {
      state.name = payload.name;
      state.description = payload.description;
      state.website_url = payload.website_url;
      state.primary_color = payload.primary_color;
      state.secondary_color = payload.secondary_color;
      state.icon = payload.icon;
      state.message = payload.message;
    },
    updateField: (state, { payload }: PayloadAction<UpdateFieldPayload>) => {
      const { key, value } = payload;
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    },
  },
});

export const { loadChatWidget, updateField } = chatWidgetSlice.actions;

export default chatWidgetSlice.reducer;
