import DesktopSidebar from "@/components/desktop-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-row overflow-clip">
      <div className="flex-none">
        <DesktopSidebar role="student" />
      </div>
      <ScrollArea className="h-full w-full flex-1 rounded-md border">
        {children}
      </ScrollArea>
    </div>
  );
}
