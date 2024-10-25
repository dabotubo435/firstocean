export default function Products({ params }: { params: { id: string } }) {
  return (
    <main>
      <section className="container py-10">
        <h1 className="text-3xl font-bold mb-6 capitalize text-center">
          Product {params.id}
        </h1>
      </section>
    </main>
  );
}
