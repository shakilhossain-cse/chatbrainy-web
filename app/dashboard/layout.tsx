"use client";

import { FiHome } from "react-icons/fi";
import Link from "next/link";
import Sidebar from "@/module/Dashboard/Sidebar";
import UserAvatar from "@/module/Dashboard/UserAvatar";
import { useAppSelector } from "@/store/hooks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth);
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
          <Link className="lg:hidden" href="/">
            <FiHome className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1"></div>
          <UserAvatar user={user} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
