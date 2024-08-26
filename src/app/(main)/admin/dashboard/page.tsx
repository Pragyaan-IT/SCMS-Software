import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChatBot from "@/components/chatbot";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <section>
      <ScrollArea className="h-full w-full flex-1">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Welcome back, {session.user.role}!</h1>
          <ChatBot />
        </div>
      </ScrollArea>
    </section>
  );
}
