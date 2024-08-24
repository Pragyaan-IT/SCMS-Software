import DesktopSidebar from "@/components/desktop-sidebar";
import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  return (
    <>
      <div className="grid h-dvh grid-rows-[auto_1fr] p-2 lg:grid-rows-none">
        <Header />
        <div className="flex h-full flex-row overflow-clip">
          <div className="flex-none">
            <DesktopSidebar />
          </div>
          <ScrollArea className="h-full w-full flex-1 rounded-md border">
            {children}
          </ScrollArea>
        </div>
      </div>
      <Toaster richColors />
    </>
  );
}
