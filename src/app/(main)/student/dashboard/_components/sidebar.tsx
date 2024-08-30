"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChartBar,
  LayoutDashboard,
  MessagesSquare,
  UserCog2,
  UserMinus2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export function SidebarMain({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      href: "/student/dashboard",
      icon: <LayoutDashboard className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "TimeTable",
      href: "/student/dashboard/timetable",
      icon: <ChartBar className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Profile",
      href: "/student/dashboard/profile",
      icon: <UserCog2 className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Discussion",
      href: "/student/dashboard/discussion",
      icon: <MessagesSquare className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Print Report",
      href: "/student/dashboard/print-report",
      icon: <MessagesSquare className="h-5 w-5 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut({
      callbackUrl: "/sign-in",
    });
  };

  return (
    <div
      className={cn(
        "mx-auto flex h-screen w-full flex-1 flex-col overflow-hidden rounded-md border md:flex-row",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
            <Button
              variant={"ghost"}
              onClick={handleLogout}
              className={cn(
                "group/sidebar absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 items-center justify-start gap-2 rounded px-2 py-2",
              )}
            >
              <UserMinus2 className="h-5 w-5 flex-shrink-0" />
              <motion.span className="!m-0 inline-block whitespace-pre !p-0 text-sm transition duration-150 group-hover/sidebar:translate-x-1">
                Logout
              </motion.span>
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/student/dashboard"
      className="relative z-20 flex items-center justify-center space-x-2 py-1 text-sm font-normal"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col whitespace-pre font-medium"
      >
        <span className="mx-auto flex items-center gap-1 font-sans text-xl font-semibold leading-relaxed tracking-normal antialiased">
          CLASS
          <BookOpen size={24} />
          MONITOR
        </span>
        <span className="ml-auto px-2 text-right text-xs">By Pragyaan</span>
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <BookOpen size={24} />
    </Link>
  );
};
