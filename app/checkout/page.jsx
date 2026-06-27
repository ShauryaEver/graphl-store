"use client";

import Link from "next/link";
import { useCart } from "../cart/cartContext";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 99;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-12">

  <div className="flex items-center justify-center">

    {/* Shipping */}

    <div className="flex flex-col items-center">

      <div
        className="
        w-10
        h-10
        rounded-full
        bg-black
        text-white
        flex
        items-center
        justify-center
        font-semibold
        "
      >
        1
      </div>

      <p className="mt-3 text-sm font-medium">
        Shipping
      </p>

    </div>

    <div className="w-28 lg:w-40 h-[2px] bg-gray-300 mb-6"></div>

    {/* Payment */}

    <div className="flex flex-col items-center">

      <div
        className="
        w-10
        h-10
        rounded-full
        border-2
        border-gray-300
        flex
        items-center
        justify-center
        font-semibold
        "
      >
        2
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Payment
      </p>

    </div>

    <div className="w-28 lg:w-40 h-[2px] bg-gray-300 mb-6"></div>

    {/* Review */}

    <div className="flex flex-col items-center">

      <div
        className="
        w-10
        h-10
        rounded-full
        border-2
        border-gray-300
        flex
        items-center
        justify-center
        font-semibold
        "
      >
        3
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Review
      </p>

    </div>

  </div>

</div>
        <div className="mb-12">

  <p className="uppercase tracking-[0.35em] text-gray-500 text-sm">
    GRAPHL SECURE CHECKOUT
  </p>

  <h1 className="text-5xl lg:text-6xl font-black mt-3">
    Checkout
  </h1>

  <p className="mt-4 text-lg text-gray-500 max-w-2xl">
    Complete your purchase securely. Every Graphl order is protected with encrypted checkout and trusted payment processing.
  </p>

</div>
<div className="bg-white rounded-3xl shadow-sm p-8 mb-12">

  <h2 className="text-xl font-bold">
    Express Checkout
  </h2>

  <p className="text-gray-500 mt-2">
    Pay instantly using your preferred payment method.
  </p>

  <div className="grid md:grid-cols-2 gap-4 mt-8">

    <button
      className="
      border
      rounded-2xl
      py-4
      font-semibold
      hover:bg-black
      hover:text-white
      transition
      "
    >
      Google Pay
    </button>

    <button
      className="
      border
      rounded-2xl
      py-4
      font-semibold
      hover:bg-black
      hover:text-white
      transition
      "
    >
      Apple Pay
    </button>

  </div>

  <div className="flex items-center gap-4 my-8">

    <div className="flex-1 h-px bg-gray-200"></div>

    <span className="text-gray-400 text-sm uppercase tracking-[0.25em]">
      OR
    </span>

    <div className="flex-1 h-px bg-gray-200"></div>

  </div>

</div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left Side */}

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-3xl font-bold mb-8">
  Shipping Information
</h2>

<div className="grid md:grid-cols-2 gap-6">

  <div>
    <label className="block text-sm font-medium mb-2">
      First Name
    </label>

    <input
      type="text"
      placeholder="Shaurya"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Last Name
    </label>

    <input
      type="text"
      placeholder="Surname"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div className="md:col-span-2">
    <label className="block text-sm font-medium mb-2">
      Email
    </label>

    <input
      type="email"
      placeholder="you@example.com"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div className="md:col-span-2">
    <label className="block text-sm font-medium mb-2">
      Phone Number
    </label>

    <input
      type="tel"
      placeholder="+91 9876543210"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div className="md:col-span-2">
    <label className="block text-sm font-medium mb-2">
      Street Address
    </label>

    <input
      type="text"
      placeholder="House No., Street, Area"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      City
    </label>

    <input
      type="text"
      placeholder="Pune"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      State
    </label>

    <input
      type="text"
      placeholder="Maharashtra"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      PIN Code
    </label>

    <input
      type="text"
      placeholder="411001"
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-2">
      Country
    </label>

    <select
      className="w-full border rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-black transition"
    >
      <option>India</option>
    </select>
  </div>
  <div className="mt-12">

  <h2 className="text-3xl font-bold mb-8">
    Delivery Method
  </h2>

  <div className="space-y-5">

    {/* Standard Delivery */}

    <label
      className="
      flex
      justify-between
      items-center
      border
      rounded-2xl
      p-6
      cursor-pointer
      hover:border-black
      transition
      "
    >

      <div className="flex items-center gap-4">

        <input
          type="radio"
          name="shipping"
          defaultChecked
          className="w-5 h-5"
        />

        <div>

          <h3 className="font-semibold text-lg">
            Standard Delivery
          </h3>

          <p className="text-gray-500 text-sm">
            Delivered in 3–5 business days
          </p>

        </div>

      </div>

      <span className="font-bold">
        FREE
      </span>

    </label>

    {/* Express Delivery */}

    <label
      className="
      flex
      justify-between
      items-center
      border
      rounded-2xl
      p-6
      cursor-pointer
      hover:border-black
      transition
      "
    >

      <div className="flex items-center gap-4">

        <input
          type="radio"
          name="shipping"
          className="w-5 h-5"
        />

        <div>

          <h3 className="font-semibold text-lg">
            Express Delivery
          </h3>

          <p className="text-gray-500 text-sm">
            Delivered in 1–2 business days
          </p>

        </div>

      </div>

      <span className="font-bold">
        ₹199
      </span>

    </label>

  </div>

</div>

</div>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            {cartItems.map((item) => (
  <div
    key={`${item.id}-${item.size}-${item.color}`}
    className="flex gap-4 mb-6"
  >
    <div className="w-20 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">

      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover"
      />

    </div>

    <div className="flex-1">

      <h3 className="font-semibold">
        {item.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {item.color} • Size {item.size}
      </p>

      <p className="text-sm text-gray-500">
        Qty: {item.quantity}
      </p>

    </div>

    <p className="font-semibold">
      ₹{item.price * item.quantity}
    </p>

  </div>
))}

            <hr className="my-6" />
            <div className="mb-6">

  <label className="block text-sm font-semibold mb-3">
    Coupon Code
  </label>

  <div className="flex gap-3">

    <input
      placeholder="Enter coupon"
      className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
    />

    <button
      className="px-5 rounded-xl border hover:bg-black hover:text-white transition"
    >
      Apply
    </button>

  </div>

</div>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="border-t pt-6 mt-6">

  <div className="flex justify-between items-center">

    <div>

      <p className="text-gray-500">
        Total Payable
      </p>

      <p className="text-4xl font-black mt-1">
        ₹{total}
      </p>

    </div>

    <div className="text-right text-sm text-gray-500 space-y-1">

      <p>✓ Taxes Included</p>

      <p>✓ Secure Checkout</p>

    </div>

  </div>

</div>

<button
  className="
  mt-8
  w-full
  bg-black
  text-white
  py-5
  rounded-2xl
  text-lg
  font-semibold
  hover:scale-[1.02]
  hover:bg-gray-900
  transition-all
  duration-300
  shadow-lg
  "
>
  🔒 Continue to Secure Payment →
</button>
            <div className="mt-8 border-t pt-6 space-y-3 text-sm text-gray-600">

  <p>
    🔒 Secure encrypted checkout
  </p>

  <p>
    🚚 Fast delivery across India
  </p>

  <p>
    ↩️ Easy returns within 7 days
  </p>

</div>

           <div className="mt-8 border-t pt-6">

  <div className="flex items-center justify-between text-sm text-gray-500">

    <span>🚚 Free Shipping</span>

    <span>↩ Easy Returns</span>

    <span>🔒 SSL Secure</span>

  </div>

  <Link
    href="/cart"
    className="block text-center mt-8 font-medium hover:underline"
  >
    ← Return to Cart
  </Link>

</div>

          </div>

        </div>

      </div>

    </section>
  );
}