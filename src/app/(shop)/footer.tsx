import logo from "@/assets/images/logo.png";
import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { TwitterIcon } from "@/components/icons/twitter";
import { createSupabaseServerClient } from "@/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Image
            src={logo}
            alt="First Ocean Supermarket"
            className="h-10 w-auto"
          />

          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12 text-gray-700/50">
            <Suspense>
              <AuthLinks />
            </Suspense>

            <li>
              <Link
                href="/checkout"
                className="transition-colors hover:text-gray-700"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="transition-colors hover:text-gray-700"
              >
                Shop now
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="transition-colors hover:text-gray-700"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-gray-700"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 text-gray-700/50">
          <ul className="flex justify-center gap-4">
            <li>
              <a
                href="#"
                rel="noreferrer"
                target="_blank"
                className="transition-colors hover:text-gray-700"
              >
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="size-6" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/firstoceansupermarket?igsh=MTZpaXcwbjFjMWVsMQ=="
                rel="noreferrer"
                target="_blank"
                className="transition-colors hover:text-gray-700"
              >
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="size-6" />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/_FirstOcean"
                rel="noreferrer"
                target="_blank"
                className="transition-colors hover:text-gray-700"
              >
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="size-6" />
              </a>
            </li>
          </ul>
          <p>©️ 2024 First Ocean Supermarket. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export async function AuthLinks() {
  const supabase = createSupabaseServerClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return null;

  return (
    <>
      <li>
        <Link href="/login" className="transition-colors hover:text-gray-700">
          Sign in
        </Link>
      </li>

      <li>
        <Link
          href="/register"
          className="transition-colors hover:text-gray-700"
        >
          Sign up
        </Link>
      </li>
    </>
  );
}
