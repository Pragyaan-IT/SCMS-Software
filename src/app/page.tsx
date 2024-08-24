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
console.log(process.env.DATABASE_URL)
  return (
    <main className=" flex justify-center items-center flex-col gap-4">
      <h1 className=" uppercase text-6xl ">pragyaan</h1>
      <ul className="text-2xl">
        {allUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <h2>This is Landing Page</h2>
      <Button asChild>
        <Link href="/dashboard">Go To Dashboard</Link>
      </Button>
    </main>
  );
}
