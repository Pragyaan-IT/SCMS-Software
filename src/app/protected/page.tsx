import AuthButton from "@/components/AuthButton";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // TODO Redirect to the user's dashboard based on their role
  return (
    <div>
      Redirecting...
    </div>
  );
}
