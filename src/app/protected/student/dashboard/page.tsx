import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-full w-full"></ScrollArea>
    </section>
  );
}
