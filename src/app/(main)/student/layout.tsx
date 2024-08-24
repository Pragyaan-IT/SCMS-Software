import DesktopSidebar from "@/components/desktop-sidebar";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] p-2 lg:grid-rows-none">
      <Header role="student" />
      <div className="flex h-full flex-row overflow-clip">
        <div className="flex-none">
          <DesktopSidebar role="student" />
        </div>
        <ScrollArea className="h-full w-full flex-1 rounded-md border">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
