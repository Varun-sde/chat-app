import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import logo from "../../images/chatify-logo.png"
import Image from "next/image";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2"> 
    <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
       <div className="flex flex-row w-full justify-center items-center pb-5"><Image src={logo} width={40} alt="logo"/><p className="ml-3 text-xl">Chatify</p></div> 
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        <label className="text-md mt-3" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          />
        <SubmitButton formAction={signIn} className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"pendingText="Creating Account...">Signup</SubmitButton>
        <Link href={"/login"} className="flex flex-row justify-center items-center space-x-4 mt-6">
          <p className="mr-0 text-zinc-600">If you have an account? <span className="text-green-500 ml-1 hover:underline mb-1">Login Here</span></p>
          {/* <SubmitButton className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2" pendingText="Signing Up...">Login</SubmitButton> */}
        </Link>
      </form>
    </div>
          </main>
        </body>
  );
}
