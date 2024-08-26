import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMain } from "./_components/sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] lg:grid-rows-none overflow-hidden">
      <Header role="student" />
      <div className="flex h-full flex-row overflow-hidden">
        <SidebarMain>
          <ScrollArea className="h-full w-full flex-1">
            {children}
          </ScrollArea>
        </SidebarMain>
      </div>
    </div>
  );
}
