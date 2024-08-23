import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Home() {
  const allUsers = await db.select().from(users);

  return (
    <main className=" flex justify-center items-center flex-col">
      <h1 className=" uppercase text-6xl ">pragyaan</h1>
      <ul className=" p-10 text-2xl">
        {allUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age}) - {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
