import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMain } from "./_components/sidebar";
import ChatBot from "@/components/chatbot";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] overflow-hidden lg:grid-rows-none">
      <div className="flex h-full flex-row overflow-hidden">
        <SidebarMain>
          <ScrollArea className="h-full w-full flex-1">{children}</ScrollArea>
        </SidebarMain>
      </div>
      <ChatBot />
    </div>
  );
}
