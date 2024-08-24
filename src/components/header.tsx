import Link from "next/link";
// import Logo from "./logo";
import MobileSidebar from "./mobile-sidebar";
import ThemeToggle from "./theme-toggle";

export default function Header({ role }: { role: "teacher" | "student" }) {
  return (
    <header className="flex w-full flex-row items-center justify-between bg-background px-4 py-2 lg:hidden">
      <div className="flex flex-row items-center justify-center gap-2">
        <MobileSidebar role={role} />
        <Link href={"/"}>
          <h1>Pragyaan</h1>
        </Link>
      </div>
      <nav className="flex flex-row items-center gap-2">
        <ThemeToggle />
        {/* <AuthButton /> */}
      </nav>
    </header>
  );
}
