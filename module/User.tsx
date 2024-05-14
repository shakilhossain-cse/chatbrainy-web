"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

const User = () => {
  const authUser = useAppSelector(state => state.auth)
  console.log("🚀 ~ User ~ authUser:", authUser)
  if (!authUser.id) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Your not logged in <Link href={'/login'}>Login</Link>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hi {authUser.first_name} {authUser.last_name}
    </main>
  );
};

export default User;
