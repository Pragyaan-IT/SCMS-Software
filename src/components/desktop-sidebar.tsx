import Link from "next/link";
// import AuthButton from "./auth-button";
// import Logo from "./logo";
import NavButton from "@/components/nav-button";
import ThemeToggle from "./theme-toggle";
import { ScrollArea } from "./ui/scroll-area";

export default function DesktopSidebar() {
  return (
    <div className="hidden w-full h-full flex-col overflow-hidden p-2 pt-4 lg:flex">
      <Link href={"/"} className="px-4">
        {/* <Logo /> */}
        <h1>Pragyaan</h1>
      </Link>
      <ScrollArea className="h-full w-52">
        <nav className="flex flex-col gap-2 py-6">
          <NavButton href="/dashboard" name="Dashboard" />
        </nav>
      </ScrollArea>
      {/* <AuthButton /> */}
      <ThemeToggle />
    </div>
  );
}
