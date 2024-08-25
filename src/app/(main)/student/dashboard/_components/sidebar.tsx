"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BookOpen, ChartBar, LayoutDashboard, MessagesSquare, Settings, UserCog2, UserMinus2 } from "lucide-react";
import Dashboard from "./dashboard";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SidebarMain({ children }: { children: React.ReactNode }) {
    const links = [
        {
            label: "Dashboard",
            href: "/student/dashboard",
            icon: (
                <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "TimeTable",
            href: "/student/timetable",
            icon: (
                <ChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Profile",
            href: "/student/profile",
            icon: (
                <UserCog2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Discussion",
            href: "/student/discussion",
            icon: (
                <MessagesSquare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        signOut({
            callbackUrl: "/sign-in"
        })
    }

    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen")}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden relative">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                        <Button onClick={handleLogout} variant={"secondary"} className={cn("flex items-center justify-start gap-2 rounded px-2 group/sidebar py-2 absolute bottom-0 left-1/2 -translate-x-1/2 w-full")}>
                            <UserMinus2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                            <motion.span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                            >Logout</motion.span>
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
            className="font-normal flex justify-center space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre flex flex-col"
            >
                <span className="flex items-center gap-1 mx-auto antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-black">CLASS<BookOpen size={24} />MONITOR</span>
                <span className='text-right text-xs ml-auto px-2 text-black'>By Pragyaan</span>
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <BookOpen size={24} />
        </Link>
    );
};

