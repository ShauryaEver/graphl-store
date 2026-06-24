"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function AuthSection() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") return null;

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="px-4 font-semibold py-2 rounded-xl bg-[#d4af37] text-black hover:bg-[#b8962e]"
      >
        Log in
      </button>
    );
  }

  return (
    <div className="relative">
      <button
  onClick={() => setOpen(!open)}
  className="
    flex items-center gap-2
    rounded-full
    p-1
    transition-all duration-300
    hover:bg-white/20
    hover:backdrop-blur-md
    hover:shadow-lg
    hover:scale-105
  "
>
        <Image
  src={session.user.image}
  alt="Avatar"
  width={36}
  height={36}
  className="
    rounded-full
    border border-white/30
    shadow-md
    transition-all duration-300
  "
/>

      </button>

      {open && (
  <div
  className="
    absolute right-0 mt-3 w-64
    rounded-2xl
    border border-white/20
    bg-white/10
    backdrop-blur-xl
    shadow-2xl
    overflow-hidden
  "
>

    <div className="px-4 py-3 border-b">
      <p className="font-semibold text-black">
        {session.user.name}
      </p>
      <p className="text-xs text-gray-500 truncate">
        {session.user.email}
      </p>
    </div>

    <Link
      href="/profile"
      className="block px-4 py-3 text-sm hover:bg-gray-100"
      onClick={() => setOpen(false)}
    >
      👤 Profile
    </Link>

    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
    >
      🚪 Logout
    </button>

  </div>
)}
    </div>
  );
}
