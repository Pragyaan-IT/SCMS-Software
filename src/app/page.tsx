import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl uppercase">Smart Classroom Management System (SCMS)</h1>
      <p className="text-2xl">
        Developed by Team Pragyaan
      </p>
      <ul className="text-2xl">
      </ul>
      <h2>This is Landing Page</h2>
      <Button asChild>
        <Link href="/student/dashboard">Student Dashboard</Link>
      </Button>
      <Button asChild>
        <Link href="/teacher">Teacher Dashboard</Link>
      </Button>
    </main>
  );
}
