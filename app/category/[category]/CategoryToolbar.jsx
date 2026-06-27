export default function CategoryToolbar({ products }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

      <div>
        <h2 className="text-xl font-semibold">
          {products.length} Products
        </h2>

        <p className="text-gray-500 mt-1">
          Explore the latest Graphl collection.
        </p>
      </div>

      <div className="flex gap-4">

        <button
          className="
            border
            rounded-xl
            px-5
            py-3
            font-medium
            hover:bg-black
            hover:text-white
            transition
          "
        >
          Filter
        </button>

        <select
          className="
            border
            rounded-xl
            px-5
            py-3
            outline-none
            bg-white
          "
        >
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Best Rated</option>
        </select>

      </div>

    </div>
  );
}