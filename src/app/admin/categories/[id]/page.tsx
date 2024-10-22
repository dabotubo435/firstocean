export default function Category({ params }: { params: { id: string } }) {
  return (
    <main>
      <section>
        <div className="mb-4">
          <h2 className="text-xl">Category {params.id}</h2>
        </div>
      </section>
    </main>
  );
}
