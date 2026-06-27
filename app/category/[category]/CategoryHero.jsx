import Image from "next/image";

export default function CategoryHero({
  currentCategory,
  products,
}) {
  return (
    <section className="relative h-[420px] lg:h-[500px] rounded-3xl overflow-hidden mb-16">

      <Image
        src={currentCategory.image}
        alt={currentCategory.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-8">

        <p className="uppercase tracking-[0.35em] text-sm">
          GRAPHL COLLECTION
        </p>

        <h1 className="text-5xl lg:text-7xl font-black mt-4">
          {currentCategory.title}
        </h1>

        <p className="max-w-2xl mt-6 text-lg text-gray-200">
          {currentCategory.description}
        </p>

        <div className="mt-8 flex items-center gap-6">

          <div>
            <p className="text-3xl font-bold">
              {products.length}
            </p>

            <p className="uppercase tracking-[0.2em] text-xs">
              Products
            </p>
          </div>

          <div className="w-px h-10 bg-white/40" />

          <div>
            <p className="text-3xl font-bold">
              Premium
            </p>

            <p className="uppercase tracking-[0.2em] text-xs">
              Quality
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}