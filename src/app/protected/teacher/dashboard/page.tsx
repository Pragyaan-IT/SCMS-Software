import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-full w-full"></ScrollArea>
    </section>
  );
}
