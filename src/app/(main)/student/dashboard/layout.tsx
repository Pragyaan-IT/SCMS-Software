import DesktopSidebar from "@/components/desktop-sidebar";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMain } from "./_components/sidebar";
import NavigationSidebar from "./_components/sidebartwo";

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
        {/* <NavigationSidebar /> */}
        <ScrollArea className="h-full w-full flex-1">
          {children}
        </ScrollArea>
        </SidebarMain>
      </div>
    </div>
  );
}
