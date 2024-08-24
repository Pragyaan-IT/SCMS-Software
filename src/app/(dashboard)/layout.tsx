import DesktopSidebar from "@/components/desktop-sidebar";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-dvh p-2 grid grid-rows-[auto_1fr] lg:grid-rows-none">
        <Header />
        <div className="h-full flex flex-row overflow-clip">
          <div className=" flex-none">
            <DesktopSidebar />
          </div>
          <ScrollArea className="h-full flex-1 w-full rounded-md border">
            {children}
          </ScrollArea>
        </div>
      </div>
      <Toaster richColors />
    </>
  );
}
