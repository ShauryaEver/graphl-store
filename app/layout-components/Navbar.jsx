"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../cart/cartContext";
import AuthSection from "@/components/ui/authSection";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import WishlistDrawer from "@/components/ui/WishlistDrawer";
import { useWishlist } from "@/components/ui/WishlistProvider";

const announcements = [
  "🚚 FREE SHIPPING ON ORDERS ABOVE ₹999",
  "⚡ LIMITED DROP • NEW COLLECTION LIVE",
  "🔥 OVERSIZED FITS • BUILT FOR THE BOLD",
  "✦ EST. 2026 • PREMIUM STREETWEAR BY GRAPHL",
];

const Navbar = () => {
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const { wishlistItems } = useWishlist();
const [wishlistOpen, setWishlistOpen] = useState(false);

  // Announcement bar cycling
  useEffect(() => {
    const id = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#search-container")) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase().trim();
    if (query.includes("hoodie")) {
      router.push("/collection/hoodies");
    } else if (query.includes("tshirt") || query.includes("t-shirt") || query.includes("tee")) {
      router.push("/collection/tshirts");
    } else if (query.includes("street")) {
      router.push("/collection/streetwear");
    } else if (query.includes("spl") || query.includes("edition") || query.includes("limited")) {
      router.push("/collection/spl-edition");
    } else {
      router.push("/shop");
    }
    setSearchOpen(false);
    setSearchQuery("");
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* ── Announcement Bar ── */}
<div className="sticky top-0 z-50 bg-black text-white overflow-hidden py-2.5">
  <div className="flex whitespace-nowrap animate-marquee">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center shrink-0">
        {announcements.map((msg, j) => (
          <span key={j} className="flex items-center gap-8 mx-8 text-[11px] tracking-[0.3em] uppercase font-light">
            {msg}
            <span className="text-white/30">◆</span>
          </span>
        ))}
      </div>
    ))}
  </div>
</div>

      {/* ── Navbar ── */}
      <nav className="sticky top-8 z-50 bg-white/90 backdrop-blur-md text-black shadow-sm border-b border-black/5">
        <div className="flex items-center justify-between px-6 py-2">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/LOGO 4.png"
              alt="Graphl"
              width={40}
              height={40}
              className="transition-transform duration-300 hover:scale-110"
            />
            <span className="text-2xl font-semibold tracking-wider">GRAPHL</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6">
            <Link href="/" className="flex items-center gap-2 hover:text-[#b8962e]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span>Home</span>
            </Link>
            <Link href="/shop" className="nav-link flex items-center gap-2 hover:text-[#b8962e]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span>Lookbook</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div id="search-container" className="relative">
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="hover:text-[#b8962e] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              <div className={`absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 ease-out ${
                searchOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
              }`}>
                {/* Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16" className="text-gray-400 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    autoFocus={searchOpen}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    placeholder="Search collections..."
                    className="w-full text-sm outline-none placeholder:text-gray-400 bg-transparent"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-black transition text-xs shrink-0">✕</button>
                  )}
                </div>

                {/* Quick Browse */}
                <div className="px-5 pt-4 pb-2">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-medium">Quick Browse</p>
                </div>

                {[
                  { label: "Premium Hoodies", value: "hoodies", emoji: "🧥" },
                  { label: "Oversized Tshirts", value: "tshirts", emoji: "👕" },
                  { label: "Streetwear", value: "streetwear", emoji: "🔥" },
                  { label: "Graphl #SPL Edition", value: "spl-edition", emoji: "⚡" },
                ].map((tag) => (
                  <button
                    key={tag.value}
                    onClick={() => {
                      router.push(`/collection/${tag.value}`);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-all duration-200 text-left group border-b border-gray-50"
                  >
                    <span className="text-lg w-6 text-center shrink-0">{tag.emoji}</span>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-black flex-1">{tag.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="13" height="13" className="text-gray-300 group-hover:text-black transition shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12L13.5 19.5M21 12H3" />
                    </svg>
                  </button>
                ))}

                {/* Search Button */}
                <div className="p-4">
                  <button
                    onClick={handleSearch}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition group"
                  >
                    <span>Search "{searchQuery || "anything"}"</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="15" height="15" className="transition-transform group-hover:translate-x-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12L13.5 19.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
{/* Wishlist */}

<button
  onClick={() => setWishlistOpen(true)}
  className="relative hover:text-[#b8962e] transition flex items-center justify-center"
>
  <Heart size={20} className="text-red-500" fill={wishlistItems.length > 0 ? "#ef4444" : "none"} />
  {wishlistItems.length > 0 && (
    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
      {wishlistItems.length}
    </span>
  )}
</button>

            {/* Cart */}
            <Link href="/cart">
              <div className="relative hover:text-[#b8962e]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black px-1 rounded-full text-xs">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            <AuthSection />

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="26" height="26">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#b8962e]">Home</Link>
            <Link href="/shop" onClick={() => setOpen(false)} className="hover:text-[#b8962e]">Lookbook</Link>
          </div>
        )}
      </nav>
      <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
};

export default Navbar;