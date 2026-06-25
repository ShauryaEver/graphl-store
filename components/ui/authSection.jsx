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
        className="flex items-center gap-2 rounded-full p-1 transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-md hover:shadow-lg hover:scale-105"
      >
        <Image
  src={session.user.image}
  alt="Avatar"
  width={36}
  height={36}
  className="
    rounded-full
    object-cover
    ring-2 ring-white/20
    hover:ring-[#C6A74A]
    transition-all duration-300
  "
/>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-5 bg-black/10">
            <h3 className="text-white font-semibold text-xl">
              {session.user.name}
            </h3>
            <p className="text-white/70 text-sm mt-1">
              {session.user.email}
            </p>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-3 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300"
          >
            Profile
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-6 py-4 text-red-300 hover:bg-red-500/10 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
