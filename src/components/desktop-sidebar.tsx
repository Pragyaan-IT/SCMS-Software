import NavButton from "@/components/nav-button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { ScrollArea } from "./ui/scroll-area";

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

export default function DesktopSidebar({ role }: { role: UserRole }) {
  return (
    <div className="hidden h-full w-full flex-col overflow-hidden p-2 pt-4 lg:flex">
      <Link href={"/"} className="px-4" aria-label="Home">
        <h1>Pragyaan</h1>
      </Link>
      <ScrollArea className="h-full w-52">
        <nav className="flex flex-col gap-2 py-6">
          <RoleBasedNavigation role={role} />
        </nav>
      </ScrollArea>
      <ThemeToggle />
    </div>
  );
}
