"use client";

import { usePathname } from "next/navigation";

import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout = pathname === "/order-success";

  return (
    <>
      {!hideLayout && <Navbar />}

      <PageTransition>
        {children}
      </PageTransition>

      {!hideLayout && <Footer />}
    </>
  );
}