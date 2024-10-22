import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormMessage, FormStatus } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { LoaderCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "./actions";

export default async function Login() {
  const supabase = createSupabaseServerClient(cookies());
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/account");

  return (
    <main className="px-2 py-12">
      <section className="border max-w-xl mx-auto">
        <div className="max-w-sm mx-auto py-12">
          <h3 className="text-xl mb-4 text-center">Login your account</h3>

          <Form action={login} className="grid gap-4 p-4">
            <div className="grid gap-2">
              <label htmlFor="email">Email address</label>
              <Input
                required
                id="email"
                type="email"
                name="email"
                placeholder="Enter email"
                className="h-14 px-4 rounded-none"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <Input
                required
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                className="h-14 px-4 rounded-none"
              />
            </div>

            <FormMessage type="error" className="text-red-500 text-center" />

            <FormStatus>
              <Button className="h-14 text-base rounded-none w-full">
                Login{" "}
                <LoaderCircleIcon className="ml-2 animate-spin size-5 hidden group-data-[pending=true]:inline" />
              </Button>
            </FormStatus>

            <div className="text-center">
              <p>
                {"Don't have an account?"}{" "}
                <Link href="/register" className="underline">
                  Register now
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
}
