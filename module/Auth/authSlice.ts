import { IUser } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  role: "",
};

export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setUserData: (_state, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    logout: (_state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, logout } = authSlice.actions;

export default authSlice.reducer;
