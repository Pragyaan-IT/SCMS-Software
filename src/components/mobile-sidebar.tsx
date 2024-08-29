"use client";

import NavButton from "@/components/nav-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

type UserRole = "teacher" | "student";

const RoleBasedNavigation = ({ role }: { role: UserRole }) => {
  switch (role) {
    case "teacher":
      return (
        <>
          <NavButton href={`/${role}/dashboard`} name="Dashboard" />
          <NavButton href={`/${role}/attendance`} name="Attendance" />
          <NavButton href={`/${role}/timetable`} name="Time Table" />
          <NavButton href={`/${role}/kanban`} name="Kanban" />
          <NavButton href={`/${role}/complaints`} name="Complaints" />
          <NavButton href={`/${role}/discussion`} name="Discussion" />
          <Button variant="ghost" className="justify-start text-black dark:text-white hover:bg-primary hover:text-primary-foreground" onClick={() => { signOut({ callbackUrl: "/" }) }} >
            Logout
          </Button>
        </>
      );
    case "student":
      return (
        <>
          <NavButton href={`/${role}/dashboard`} name="Dashboard" />
        </>
      );
    default:
      return null;
  }
};

export default function MobileSidebar({ role }: { role: UserRole }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-56">
        <SheetHeader>
          <SheetTitle>Pragyaan</SheetTitle>
          <SheetDescription className="sr-only">Menu</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 py-6">
          <RoleBasedNavigation role={role} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
