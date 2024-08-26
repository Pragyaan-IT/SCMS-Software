import DesktopSidebar from "@/components/desktop-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationSidebar from "./_components/sidebar";
import Header from "./_components/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] lg:grid-rows-none overflow-hidden">
      <div className="flex h-full w-full flex-row overflow-hidden">
        <NavigationSidebar />
        <div className="p-4 xl:ml-80 w-full">
          <Header />
          <ScrollArea className="h-full w-full flex-1">
            <div className="mt-12">
              {children}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
