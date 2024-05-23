import { logoutUser } from "@/module/Auth/authSlice";
import { store } from "@/store";
import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("access_token");
  if (token) {
    return true;
  }
  store.dispatch(logoutUser());
  return false;
}
