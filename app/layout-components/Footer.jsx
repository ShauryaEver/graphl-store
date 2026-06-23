"use client";
import Image from "next/image";
import {
  Share2,
  Camera,
  MessageCircle,
  Image as ImageIcon,
  ShieldCheck,
  Lock,
  Zap,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#171717] via-[#111111] to-[#080808] text-gray-300 pt-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">

          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              
              <Image
               src="/LOGO 4.png"
               alt="Graphl"
               width={22}
              height={22}
              />
              <h2 className="text-white text-xl font-semibold tracking-wide">
                Graphl
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              Graphl is more than clothing — it's a statement of ambition, 
              confidence, and individuality. Designed for those who create their own path.
            </p>

            <div className="flex items-center gap-5 text-gray-400">
  {[Share2, Camera, MessageCircle, ImageIcon].map((Icon, i) => (
    <Icon
      key={i}
      size={18}
      className="cursor-pointer transition-all duration-300 hover:text-yellow-400 hover:-translate-y-1"
    />
  ))}
</div>
              
          </div>

          <FooterColumn
            title="SHOP"
            links={["New Arrivals", "Best Sellers", "Sale", "Collections"]}
          />

          <FooterColumn
            title="CUSTOMER SERVICE"
            links={["Contact Us", "Shipping Info", "Returns", "Size Guide"]}
          />

          <FooterColumn
            title="COMPANY"
            links={["About Graphl", "Our Story", "Contact", "FAQ"]}
          />

          <FooterColumn
            title="LEGAL"
            links={[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
              "Accessibility",
            ]}
          />
        </div>

        <div className="border-t border-white/10 mt-20 pt-6 pb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">
            © 2026 Graphl. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-yellow-400" />
              Secure Shopping
            </div>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-yellow-400" />
              SSL Encrypted
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterColumn = ({ title, links }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-white text-sm font-semibold tracking-widest">
        {title}
      </h3>
      <ul className="space-y-3 text-sm">
        {links.map((link, i) => (
          <li
  key={i}
  className="hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};
