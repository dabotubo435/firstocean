import { FacebookIcon } from "@/components/icons/facebook";
import { InstagramIcon } from "@/components/icons/instagram";
import { TwitterIcon } from "@/components/icons/twitter";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Image
            src="/logo.png"
            alt="First Ocean Supermarket"
            width={80}
            height={80}
          />
        </div>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <Link
              href="#"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              Careers
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              History
            </Link>
          </li>

          <li>
            <Link
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/services"
            >
              Services
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              Projects
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              Blog
            </Link>
          </li>
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Facebook</span>
              <FacebookIcon className="size-6" />
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Instagram</span>
              <InstagramIcon className="size-6" />
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="size-6" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
