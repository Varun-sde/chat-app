import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import Interface from "@/components/Interface";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="App">
      <nav className="item-1">
        <DeployButton />
        <AuthButton />
      </nav>   
      <Interface />
    </div>
  );
}