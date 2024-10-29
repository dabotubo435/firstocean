"use client";

import Link from "next/link";

export default function ErrorBoundary() {
  return (
    <main>
      <div className="container pt-20">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          Something went wrong
        </h1>
        <p className="text-center text-gray-600">
          This page has encountered an error.{" "}
          <Link href="/" className="underline">
            Go home
          </Link>
        </p>
      </div>
    </main>
  );
}
