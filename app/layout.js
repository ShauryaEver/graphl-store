import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "./cart/cartContext";
import { WishlistProvider } from "@/components/ui/WishlistProvider";

import Providers from "./providers";
import LayoutWrapper from "./layout-components/LayoutWrapper";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Graphl | Premium Fashion & Modern Style",
  description:
    "Graphl is a premium fashion destination offering modern, elegant, and trend-driven clothing designed for everyday luxury and timeless style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-img.png"
          fetchPriority="high"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <CartProvider>
            <WishlistProvider>

              <LayoutWrapper>
                {children}
              </LayoutWrapper>

              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnHover
              />

            </WishlistProvider>
          </CartProvider>
        </Providers>

        <SpeedInsights />
      </body>
    </html>
  );
}