import { Button } from "@/components/ui/button";
import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const allUsers = await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl uppercase">pragyaan</h1>
      <ul className="text-2xl">
        {allUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h2>This is Landing Page</h2>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/student/dashboard">Student Dashboard</Link>
      </Button>
      <Button asChild>
        <Link href="/teacher/dashboard">Teacher Dashboard</Link>
      </Button>
    </main>
  );
}
