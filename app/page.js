"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import ProductCard from "@/components/ui/productCard";
import ReviewsCard from "@/components/ui/reviewsCard";
import PreviewCard from "@/components/ui/previewCard";
import Link from "next/link";
import Image from "next/image";

const LayoutTextFlip = dynamic(
  () => import("@/components/ui/layout-text-flip.client"),
  { ssr: false }
);

const FeaturedCollection = [
  {
    title: "Premium Hoodies",
    img: "/products/hoodies/hoodie1.jpg",
    desc: "Everyday comfort with effortless street style",
    items: "5 items",
    href: "/collection/hoodies",
  },
  {
    title: "Oversized Tshirts",
    img: "/products/tshirts/tshirt1.jpg",
    desc: "Precision-crafted fits for the modern streetwear look",
    items: "12 items",
    href: "/collection/tshirts",
  },
  {
    title: "Streetwear",
    img: "/products/tshirts/tshirt2.jpg",
    desc: "Refined styles built for confidence and power",
    items: "7 items",
    href: "/collection/streetwear",
  },
  {
    title: "Graphl #SPL Edition",
    img: "/products/tshirts/tshirt3.jpg",
    desc: "Exclusive drops. Limited runs. Only for the bold.",
    items: "5 items",
    href: "/collection/spl-edition",
  },
];

const CustomGraphl = [
  {
    title: "Design Your Tee",
    desc: "Pick a blank canvas and bring your own graphic to life",
    icon: "👕",
    gradient: "from-[#2c2c2c] to-[#0a0a0a]",
    href: "/customize/tshirt",
  },
  {
    title: "Design Your Hoodie",
    desc: "Build a custom hoodie with your own art and colorway",
    icon: "🧥",
    gradient: "from-[#3a2c1c] to-[#0a0a0a]",
    href: "/customize/hoodie",
  },
  {
    title: "Upload Your Art",
    desc: "Got a design ready? Upload it and we'll bring it to life",
    icon: "🎨",
    gradient: "from-[#1c2c3a] to-[#0a0a0a]",
    href: "/customize/upload",
  },
  {
    title: "Pick a Template",
    desc: "Choose from curated Graphl templates and personalize them",
    icon: "✨",
    gradient: "from-[#2c1c3a] to-[#0a0a0a]",
    href: "/customize/templates",
  },
];

const GraphlCategories = [
  {
    id: 1,
    title: "Heavy Fits",
    image: "/products/hoodies/hoodie1.jpg",
    href: "/trending/hoodies",
  },
  {
    id: 2,
    title: "Bold Prints",
    image: "/products/tshirts/tshirt1.jpg",
    href: "/trending/tshirts",
  },
  {
    id: 3,
    title: "Street Code",
    image: "/products/tshirts/tshirt2.jpg",
    href: "/trending/streetwear",
  },
  {
    id: 4,
    title: "Limited Series",
    image: "/products/tshirts/tshirt3.jpg",
    href: "/trending/spl-edition",
  },
];

const ReviewData = [
  {
    profilePic: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    name: "Amitabh Bachchan",
    occupation: "Regular Customer",
    rating: 4.5,
    comment:
      "Quality is really good for the price. Fabric feels premium and fitting is perfect.",
  },
  {
    profilePic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    name: "Radhika Merchant",
    occupation: "First-time Buyer",
    rating: 4.0,
    comment:
      "Product looks exactly like the images. Delivery was fast and packaging was neat.",
  },
  {
    profilePic: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    name: "Riya Gurnani",
    occupation: "Frequent Shopper",
    rating: 5.0,
    comment: "Overall good, but the size runs slightly small. Go one size up.",
  },
  {
    profilePic: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    name: "Kiara Advani",
    occupation: "Fashion Enthusiast",
    rating: 4.7,
    comment: "Loved the design and comfort. Totally worth the money!",
  },
];

export default function Home() {
  const bgRef = useRef(null);
  const sliderRef = useRef(null);
  const speedRef = useRef(100);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
    });

    let rafId;
    let scrollY = 0;

    lenis.on("scroll", ({ scroll }) => {
      scrollY = scroll;
    });

    lenis.raf(0);

    const raf = (time) => {
      lenis.raf(time);

      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
      }

      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    let lastTime = null;
    let direction = 1;

    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );

    observer.observe(slider);

    speedRef.current = 50;

    const animate = (time) => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTime) lastTime = time;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      slider.scrollLeft += direction * speedRef.current * deltaTime;

      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll) direction = -1;
      if (slider.scrollLeft <= 0) direction = 1;

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      speedRef.current = 0;
    };

    const handleMouseLeave = () => {
      speedRef.current = 50;
    };

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <section className="relative h-screen overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 -z-20 
            bg-[url('/hero-img.png')] 
            bg-cover bg-center sm:bg-top-right
            will-change-transform transform-gpu"
        />

        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div className="flex flex-col justify-center items-start h-full max-w-2xl ml-8 lg:ml-24 px-6 gap-5 text-white -translate-y-4">

          {/* Badge */}
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/90">
            EST. 2026 • PREMIUM STREETWEAR
          </p>

          {/* Heading */}
          <h1 className="leading-[0.95] flex flex-col gap-2">
            <span className="block text-5xl md:text-7xl font-black tracking-tight">
              GRAPHL®
            </span>
            <span className="block text-3xl md:text-5xl font-light uppercase tracking-[0.15em] text-white/80">
              BUILT FOR THE BOLD
            </span>
            <span className="block text-3xl md:text-5xl font-light uppercase tracking-[0.15em] text-white/80 overflow-hidden">
              <LayoutTextFlip />
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-white/60 text-sm tracking-widest uppercase">
            Designed for creators. Built for everyday wear.
          </p>

          {/* Button */}
          <Link href="/shop">
            <button className="group relative overflow-hidden flex items-center gap-4 px-8 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-light tracking-[0.2em] uppercase text-sm transition-all duration-500 hover:bg-white hover:text-black hover:border-white hover:tracking-[0.3em]">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Explore The Lookbook</span>
              <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border border-white/40 group-hover:border-black/40 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={14} height={14} className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12L13.5 19.5M21 12H3" />
                </svg>
              </span>
            </button>
          </Link>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 text-xs text-white/40 tracking-widest uppercase">
            <span>✓ Premium Cotton</span>
            <span>✓ Free Shipping</span>
            <span>✓ Easy Returns</span>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={26} height={26} className="animate-bounce">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v14m0 0l-5-5m5 5l5-5" />
            </svg>
          </div>

        </div>
      </section>

      {/* Featured Collections */}
      <section className="min-h-screen px-6 sm:px-10 lg:px-20 py-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Featured Collections
          </h2>
          <p className="my-3 text-base sm:text-lg text-gray-700 max-w-2xl">
            Explore our carefully curated collections designed for every
            occasion and style preference.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-12">
          {FeaturedCollection.map((item) => (
            <Link key={item.title} href={item.href}>
              <div
                className="group relative overflow-hidden flex flex-col justify-end 
                     px-4 py-4 w-full h-[280px] sm:h-[320px] lg:h-[360px] 
                     rounded-3xl text-white cursor-pointer"
              >
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
                  <p className="text-sm sm:text-base">{item.desc}</p>
                  <span className="text-gray-300 text-sm">{item.items}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Custom Graphl */}
      <section className="px-6 sm:px-10 lg:px-20 py-16">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
            Make It Yours
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Graphl Studio
          </h2>
          <p className="my-3 text-base sm:text-lg text-gray-700 max-w-2xl">
            Design something that's uniquely yours. Start from scratch or personalize a Graphl piece.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-12">
          {CustomGraphl.map((item) => (
            <Link key={item.title} href={item.href}>
              <div
                className={`group relative overflow-hidden flex flex-col justify-between
                     px-6 py-8 w-full h-[280px] sm:h-[300px]
                     rounded-3xl text-white cursor-pointer
                     bg-gradient-to-br ${item.gradient}
                     transition-transform duration-500 hover:-translate-y-2`}
              >
                <div className="text-5xl transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>

                <div className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="14" height="14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12L13.5 19.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="min-h-screen px-6 sm:px-10 lg:px-20 py-16">
        <div className="flex flex-col">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Trending Now
          </h2>
          <p className="my-3 text-base sm:text-lg text-gray-700 max-w-2xl">
            Discover our most popular pieces loved by fashion enthusiasts
            worldwide.
          </p>
        </div>

        <div
          ref={sliderRef}
          className="mt-10 flex flex-nowrap gap-6 sm:gap-8 lg:gap-10 
               overflow-x-scroll no-scrollbar"
        >
          {GraphlCategories.map((category) => (
            <div
              key={category.id}
              className="min-w-[260px] sm:min-w-[280px] lg:min-w-[300px] 
                   py-5 transition-transform duration-300 hover:scale-105"
            >
              <Link href={category.href}>
                <div className="group cursor-pointer">
                  <div className="relative w-full h-[420px] overflow-hidden rounded-3xl">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl sm:text-5xl font-black leading-tight text-black">
              What Our Customers Say About Graphl
            </h2>
            <p className="text-gray-500 text-lg max-w-md">
              Real people. Real fits. Join the Graphl community built for creators, dreamers, and the bold.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-3">
                {ReviewData.slice(0, 3).map((r, i) => (
                  <img
                    key={i}
                    src={r.profilePic}
                    alt={r.name}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-black">2,000+</span> happy customers
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="text-sm font-semibold text-black">4.8</span>
              <span className="text-sm text-gray-400">average rating</span>
            </div>
            <button className="mt-2 w-fit px-8 py-3 rounded-full bg-[#4a8c6a] text-white text-sm font-medium hover:bg-[#3d7559] transition">
              View More
            </button>
          </div>

          {/* Right — 3 reviews only */}
          <div className="flex flex-col gap-4">
            {ReviewData.slice(0, 3).map((review, i) => (
              <ReviewsCard key={i} {...review} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
} 