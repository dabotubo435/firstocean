import Link from "next/link";

export default function Notfound() {
  return (
    <main>
      <div className="container py-20">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          Page not found
        </h1>
        <p className="text-center text-gray-600">
          The link you followed does not exist.{" "}
          <Link href="/" className="underline">
            Go home
          </Link>
        </p>
      </div>
    </main>
  );
}
