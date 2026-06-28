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
    items: "24 items",
    href: "/collection/hoodies",  // ← /collection
  },
  {
    title: "Oversized Tshirts",
    img: "/products/tshirts/tshirt1.jpg",
    desc: "Precision-crafted fits for the modern streetwear look",
    items: "18 items",
    href: "/collection/tshirts",  // ← /collection
  },
  {
    title: "Streetwear",
    img: "/products/tshirts/tshirt2.jpg",
    desc: "Refined styles built for confidence and power",
    items: "32 items",
    href: "/collection/streetwear",  // ← /collection
  },
  {
    title: "Graphl #SPL Edition",
    img: "/products/tshirts/tshirt3.jpg",
    desc: "Exclusive drops. Limited runs. Only for the bold.",
    items: "29 items",
    href: "/collection/spl-edition",  // ← /collection
  },
];

const GraphlCategories = [
  {
    id: 1,
    title: "Heavy Fits",        // ← change here
    image: "/products/hoodies/hoodie1.jpg",
    href: "/trending/hoodies",
  },
  {
    id: 2,
    title: "Bold Prints",  // ← change here
    image: "/products/tshirts/tshirt1.jpg",
    href: "/trending/tshirts",
  },
  {
    id: 3,
    title: "Street Code",     // ← change here
    image: "/products/tshirts/tshirt2.jpg",
    href: "/trending/streetwear",
  },
  {
    id: 4,
    title: "Limited Series",    // ← change here
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
    profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    name: "Rohit Sharma",
    occupation: "Frequent Shopper",
    rating: 3.8,
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

 <div
  className="
flex
flex-col
justify-center
items-start
h-full
max-w-3xl
ml-8
lg:ml-24
px-6
gap-4
text-white
hero-content
-translate-y-4
"
>
    <p
  className="
    inline-flex
    mt-8
    items-center
    rounded-full
    border
    border-white/20
    bg-white/10
    backdrop-blur-xl
    px-5
    py-2
    text-xs
    uppercase
    tracking-[0.3em]
    text-white/90
    transition-all
    duration-300
  "
>
  EST. 2026 • PREMIUM STREETWEAR
</p>

    <h1 className="leading-[0.9]">

  <span className="block text-5xl md:text-7xl font-black tracking-tight">
    GRAPHL®
  </span>

  <span className="block mt-4 text-3xl md:text-6xl font-light uppercase tracking-[0.2em]">
    BUILT FOR
  </span>

  <span className="block text-3xl md:text-6xl font-light uppercase tracking-[0.2em]">
    THE BOLD
  </span>

      <span className="font-bold text-2xl sm:text-4xl lg:text-7xl">
        GRAPHL
      </span>

      <LayoutTextFlip />
    </h1>

    <p className="max-w-xl ">
      Designed for creators.
      Built for everyday wear.
    </p>

    <Link href="/shop">
      <button
        className="
          group
          relative
          rounded-full
          bg-white
          text-black
          px-8
          py-4
          font-semibold
          transition-all
          duration-500
          hover:bg-black
          hover:text-white
          hover:border
          hover:border-white
        "
      >


        <div className="flex flex-wrap gap-6 mt-6 text-sm text-white/70">

  <span>✓ Premium Cotton</span>

  <span>✓ Free Shipping</span>

  <span>✓ Easy Returns</span>

</div>
        <span className="relative z-10 flex items-center gap-3">
          SHOP COLLECTION →
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            width={20}
            height={20}
            className="transition-transform group-hover:translate-x-1.5 duration-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12L13.5 19.5M21 12H3"
            />
          </svg>
        </span>
        <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    </Link>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white hidden sm:block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        width={26}
        height={26}
        className="animate-bounce"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v14m0 0l-5-5m5 5l5-5"
        />
      </svg>
    </div>
  </div>
</section>


      <section className="min-h-screen bg-white px-6 sm:px-10 lg:px-20 py-16">
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

      <section className="min-h-screen py-20 font-['Source Sans 3']">
        <div className="flex flex-col justify-center items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            What Our Customers Say
          </h2>
          <p className="my-3 text-base sm:text-lg text-gray-700 max-w-2xl">
            Join the Graphl community and wear designs built for creators, dreamers, and builders.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                  gap-8 px-6 sm:px-10 lg:px-20"
        >
          {ReviewData.map((review, i) => (
            <ReviewsCard key={i} {...review} />
          ))}
        </div>
      </section>
    </>
  );
}
