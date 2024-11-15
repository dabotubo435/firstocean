import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormMessage } from "@/context/form";
import { LoaderCircleIcon } from "lucide-react";
import { contact } from "./actions";

export default function ContactUs() {
  return (
    <main className="container max-w-6xl grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
      <section className="p-8 pt-0 md:pt-8">
        <h1 className="text-xl font-semibold text-center md:text-left text-primary mb-6">
          How to reach us
        </h1>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-zinc-600 uppercase">Email:</p>
            <a
              href="mailto:info@firstoceansupermarket.com"
              className="text-sm font-bold underline"
            >
              info@firstoceansupermarket.com
            </a>
          </div>
          <div>
            <p className="text-xs text-zinc-600 uppercase">Phone:</p>
            <a
              href="tel:+2348069627649"
              className="text-sm font-bold underline"
            >
              +234 806 962 7649
            </a>
          </div>
          <div>
            <p className="text-xs text-zinc-600 uppercase">Address:</p>
            <a
              href="mailto:info@firstoceansupermarket.com"
              className="text-sm font-bold"
            >
              No.1. Olufunmilayo Street Ikosi, Ketu, Lagos
            </a>
          </div>
        </div>
      </section>

      <section className="p-8">
        <h1 className="text-xl font-semibold text-center md:text-left text-primary mb-6">
          Contact Us
        </h1>

        <Form action={contact} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <Input required id="name" name="name" placeholder="Enter name" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email">Email address</label>
            <Input
              required
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="message">Message</label>
            <Textarea
              required
              id="message"
              name="message"
              placeholder="Enter message"
            />
          </div>

          <FormMessage className="data-[success=false]:text-red-500 text-center" />

          <Button className="text-base rounded-none w-full group-data-[success=true]/form:hidden">
            Submit
            <LoaderCircleIcon className="ml-2 animate-spin size-5 hidden group-data-[pending=true]/form:inline" />
          </Button>
        </Form>
      </section>
    </main>
  );
}
