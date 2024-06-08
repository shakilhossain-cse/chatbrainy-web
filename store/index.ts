import authReducer from "@/module/Auth/authSlice";
import chatWidgetReducer from "@/module/ChatWidget/chatWidgetSlice";
import messagesReducer from "@/module/Messenger/messageSlice";
import { configureStore, combineReducers, UnknownAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["id", "first_name", "last_name", "email", "role"],
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  chatWidget: chatWidgetReducer,
  messages: messagesReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
function messageReducer(state: { visitor: never[]; } | undefined, action: UnknownAction): { visitor: never[]; } {
  throw new Error("Function not implemented.");
}

