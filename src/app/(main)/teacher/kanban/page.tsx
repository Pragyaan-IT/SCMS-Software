import { KanbanBoard } from "@/components/kanban/kanban-board";
import NewTaskDialog from "@/components/kanban/new-task-dialog";
import PageTitle from "@/components/page-title";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function KanbanPage() {
  return (
    <section>
      <PageTitle title="Kanban" button={<NewTaskDialog />} />
      <ScrollArea className="h-full w-[calc(100dvw-52px)] lg:w-[calc(100dvw-280px)]">
        <KanbanBoard />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
