"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { logoutUser } from "./Auth/authSlice";

const User = () => {
  const authUser = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();
  console.log("🚀 ~ User ~ authUser:", authUser)
  if (!authUser.id) {
    return (
      <main className="flex  flex-col items-center justify-between p-24">
        Your not logged in <Link href={'/login'}>Login</Link>
      </main>
    );
  }
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      Hi {authUser.first_name} {authUser.last_name}
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </main>
  );
};

export default User;
