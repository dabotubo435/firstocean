export default function ProductNotFound() {
  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Product not found</h2>
        </div>

        <div className="container max-w-lg p-8 mt-16 bg-muted rounded-xl">
          <p className="text-center text-base">
            Sorry we could not find that product
          </p>
        </div>
      </section>
    </main>
  );
}
