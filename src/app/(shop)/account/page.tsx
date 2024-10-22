import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";

export default async function Account() {
  const supabase = createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="">
      <section className="container py-10">
        <p>Email: {user?.email}</p>
      </section>
    </main>
  );
}
