import NavButton from "@/components/nav-button";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { ScrollArea } from "./ui/scroll-area";

export default function DesktopSidebar({
  role
}: {
  role: "teacher" | "student";
}) {
  return (
    <div className="hidden h-full w-full flex-col overflow-hidden p-2 pt-4 lg:flex">
      <Link href={"/"} className="px-4">
        <h1>Pragyaan</h1>
      </Link>
      <ScrollArea className="h-full w-52">
        <nav className="flex flex-col gap-2 py-6">
          <NavButton href={`/${role}/dashboard`} name="Dashboard" />
        </nav>
      </ScrollArea>
      <ThemeToggle />
    </div>
  );
}
