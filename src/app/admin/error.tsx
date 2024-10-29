"use client";

export default function AdminErrorBoundary() {
  return (
    <main className="flex items-center justify-center">
      <div className="container pt-20">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          Something went wrong
        </h1>
        <p className="text-center text-gray-600">
          Please refresh your browser.
        </p>
      </div>
    </main>
  );
}
