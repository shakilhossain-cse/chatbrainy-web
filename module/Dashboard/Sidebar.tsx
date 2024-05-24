"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiFolder,
  FiStar,
  FiFileText,
  FiCalendar,
  FiFile,
  FiCreditCard,
  FiGlobe,
  FiSettings,
  FiActivity,
  FiBell,
} from "react-icons/fi";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FiHome,
  },
  {
    label: "Chat Widget",
    href: "/dashboard/chat-widget",
    icon: FiUser,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: FiFolder,
  },
  {
    label: "Leads",
    href: "dashboard/leads",
    icon: FiStar,
  },
  {
    label: "Contracts",
    href: "dashboard/contracts",
    icon: FiFileText,
  },
  {
    label: "Meetings",
    href: "dashboard/meetings",
    icon: FiCalendar,
  },
  {
    label: "Invoices",
    href: "dashboard/invoices",
    icon: FiFile,
  },
  {
    label: "Payments",
    href: "dashboard/payments",
    icon: FiCreditCard,
  },
  {
    label: "Social",
    href: "dashboard/social-media",
    icon: FiGlobe,
  },
  {
    label: "Automations",
    href: "dashboard/automations",
    icon: FiSettings,
  },
] as const;

export default function Sidebar() {
  //   const {lang} = useParams();
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6 my-5">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <FiActivity className="h-6 w-6" />
            <span className="">ChatBrainy</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {sidebarLinks.map((link) => {
              const isActive = pathname === `/${link.href}`;
              return (
                <Link
                  key={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                    isActive ? "bg-gray-700 text-gray-200" : "text-gray-500"
                  )}
                  href={link.href}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
