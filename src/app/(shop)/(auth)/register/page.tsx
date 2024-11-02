import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormMessage, FormStatus } from "@/context/form";
import { createSupabaseServerClient } from "@/supabase/server";
import { LoaderCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { register } from "../actions";

export default async function Register() {
  const supabase = createSupabaseServerClient(cookies());
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/account");

  return (
    <main className="px-2 py-12">
      <section className="border max-w-xl mx-auto">
        <div className="max-w-sm mx-auto py-12">
          <h3 className="text-xl mb-4 text-center">Register for an account</h3>

          <Form action={register} className="grid gap-4 p-4">
            <div className="grid gap-2">
              <p>Email address</p>
              <Input
                required
                type="email"
                name="email"
                placeholder="Enter email"
                className="h-14 px-4 rounded-none"
              />
            </div>

            <div className="grid gap-2">
              <p>Password</p>
              <Input
                required
                type="password"
                name="password"
                placeholder="Enter password"
                className="h-14 px-4 rounded-none"
              />
            </div>

            <div className="grid gap-2">
              <p>Confirm Password</p>
              <Input
                required
                type="password"
                name="passwordConfirm"
                placeholder="Enter password"
                className="h-14 px-4 rounded-none"
              />
            </div>

            <FormMessage
              type="error"
              className="text-destructive text-center"
            />

            <FormStatus>
              <Button className="h-14 text-base rounded-none w-full">
                Register{" "}
                <LoaderCircleIcon className="ml-2 animate-spin size-5 hidden group-data-[pending=true]:inline" />
              </Button>
            </FormStatus>

            <div className="text-center">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login now
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </section>
    </main>
  );
}
