import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

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
        {children}
      </div>
      <Toaster richColors />
    </>
  );
}
