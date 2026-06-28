"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Copy,
  ShoppingBag,
  Truck,
  Home,
  Calendar,
  Mail,
  Shield,
  ArrowRight,
  Box,
  Gift,
} from "lucide-react";

/* ─── Sakura Petal ─────────────────────────────────────────── */
function Petal({ top, left, size, rotate, color }) {
  return (
    <div
      style={{
        position: "absolute", top, left, zIndex: 0,
        pointerEvents: "none", userSelect: "none",
        transform: `rotate(${rotate}deg)`,
        width: size, height: size * 1.35,
      }}
    >
      <svg viewBox="0 0 60 80" width={size} height={size * 1.35}>
        <path d="M30 75 C10 60 2 40 5 22 C8 8 20 2 30 5 C40 2 52 8 55 22 C58 40 50 60 30 75Z" fill={color} opacity="0.88" />
        <path d="M30 65 C18 52 14 36 16 24 C18 14 24 10 30 12 C36 10 42 14 44 24 C46 36 42 52 30 65Z" fill="white" opacity="0.22" />
        <line x1="30" y1="10" x2="30" y2="68" stroke="white" strokeWidth="1.2" opacity="0.3" />
        <circle cx="30" cy="14" r="5" fill="#fce7f3" opacity="0.7" />
        <circle cx="30" cy="14" r="2.5" fill="#fb7185" opacity="0.85" />
      </svg>
    </div>
  );
}

function Sparkle({ top, left, color }) {
  return (
    <div style={{ position: "absolute", top, left, zIndex: 0, pointerEvents: "none" }}>
      <svg width="13" height="13" viewBox="0 0 13 13">
        <path d="M6.5 0 L7.5 5.5 L13 6.5 L7.5 7.5 L6.5 13 L5.5 7.5 L0 6.5 L5.5 5.5 Z" fill={color} opacity="0.72" />
      </svg>
    </div>
  );
}

function GreenLeaf({ top, left, rotate }) {
  return (
    <div style={{ position: "absolute", top, left, zIndex: 0, pointerEvents: "none", transform: `rotate(${rotate}deg)` }}>
      <svg width="18" height="11" viewBox="0 0 18 11">
        <ellipse cx="9" cy="5.5" rx="8.5" ry="5" fill="#22c55e" opacity="0.75" />
        <line x1="1.5" y1="5.5" x2="16.5" y2="5.5" stroke="#15803d" strokeWidth="0.7" opacity="0.45" />
      </svg>
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────────── */
const PETALS = [
  { top: "0%",  left: "2%",  size: 30, rotate: -20, color: "#f9a8d4" },
  { top: "1%",  left: "18%", size: 22, rotate:  12, color: "#fb7185" },
  { top: "0%",  left: "50%", size: 19, rotate: -38, color: "#fda4af" },
  { top: "2%",  left: "70%", size: 26, rotate:  33, color: "#f472b6" },
  { top: "0%",  left: "87%", size: 21, rotate: -12, color: "#f9a8d4" },
  { top: "9%",  left: "0%",  size: 17, rotate:  58, color: "#fda4af" },
  { top: "8%",  left: "89%", size: 25, rotate: -48, color: "#f9a8d4" },
  { top: "16%", left: "9%",  size: 28, rotate:  22, color: "#f472b6" },
  { top: "17%", left: "80%", size: 19, rotate: -28, color: "#fda4af" },
  { top: "27%", left: "1%",  size: 23, rotate:  42, color: "#f9a8d4" },
  { top: "29%", left: "91%", size: 17, rotate: -18, color: "#fb7185" },
  { top: "37%", left: "0%",  size: 21, rotate:  68, color: "#f472b6" },
  { top: "39%", left: "93%", size: 27, rotate: -58, color: "#fda4af" },
  { top: "48%", left: "4%",  size: 19, rotate:  28, color: "#f9a8d4" },
  { top: "50%", left: "89%", size: 23, rotate: -38, color: "#f472b6" },
  { top: "58%", left: "1%",  size: 25, rotate:  52, color: "#fda4af" },
  { top: "60%", left: "92%", size: 19, rotate: -23, color: "#fb7185" },
  { top: "68%", left: "7%",  size: 21, rotate:  14, color: "#f9a8d4" },
  { top: "70%", left: "83%", size: 29, rotate: -43, color: "#f472b6" },
  { top: "78%", left: "2%",  size: 17, rotate:  62, color: "#fda4af" },
  { top: "80%", left: "88%", size: 23, rotate: -19, color: "#f9a8d4" },
  { top: "87%", left: "14%", size: 19, rotate:  34, color: "#fb7185" },
  { top: "89%", left: "76%", size: 25, rotate: -57, color: "#f472b6" },
  { top: "93%", left: "31%", size: 21, rotate:  18, color: "#fda4af" },
  { top: "94%", left: "62%", size: 17, rotate: -68, color: "#f9a8d4" },
];

const SPARKLES = [
  { top: "7%",  left: "37%", color: "#d97706" },
  { top: "14%", left: "59%", color: "#92400e" },
  { top: "23%", left: "27%", color: "#d97706" },
  { top: "34%", left: "77%", color: "#92400e" },
  { top: "43%", left: "17%", color: "#d97706" },
  { top: "53%", left: "67%", color: "#92400e" },
  { top: "64%", left: "39%", color: "#d97706" },
  { top: "73%", left: "57%", color: "#92400e" },
  { top: "83%", left: "23%", color: "#d97706" },
];

const STEPS = [
  {
    icon: Check,
    title: "Order Confirmed",
    badge: "Completed",
    badgeStyle: { backgroundColor: "#d1fae5", color: "#065f46" },
    desc: "We've received your order successfully.",
    time: "Today, 11:42 AM",
    state: "done",
  },
  {
    icon: Gift,
    title: "Preparing Your Order",
    badge: "In Progress",
    badgeStyle: { backgroundColor: "#e0f2fe", color: "#0369a1" },
    desc: "We are carefully packing your items.",
    time: null,
    state: "active",
  },
  {
    icon: Truck,
    title: "Shipped",
    badge: null,
    badgeStyle: null,
    desc: "We will update you with tracking details.",
    time: null,
    state: "idle",
  },
  {
    icon: Home,
    title: "Delivered",
    badge: null,
    badgeStyle: null,
    desc: "Enjoy your Graphl order.",
    time: null,
    state: "idle",
  },
];

/* ─── Step Row ─────────────────────────────────────────────── */
function StepRow({ step, isLast }) {
  const Icon = step.icon;
  const isDone   = step.state === "done";
  const isActive = step.state === "active";
  const isIdle   = step.state === "idle";

  return (
    <div style={{ display: "flex", gap: "12px", position: "relative" }}>
      {!isLast && (
        <div style={{
          position: "absolute", left: "17px", top: "36px",
          width: "2px", height: "40px", borderRadius: "9999px",
          backgroundColor: isDone ? "#34d399" : "#e5e7eb",
        }} />
      )}
      <div style={{
        flexShrink: 0, width: "36px", height: "36px",
        borderRadius: "9999px", display: "flex",
        alignItems: "center", justifyContent: "center",
        marginTop: "2px", position: "relative", zIndex: 1,
        backgroundColor: isDone ? "#10b981" : isActive ? "#ffffff" : "#f3f4f6",
        border: isDone ? "none" : isActive ? "2px solid #34d399" : "1.5px solid #e5e7eb",
      }}>
        <Icon size={15} strokeWidth={2.5} color={isDone ? "#fff" : isActive ? "#10b981" : "#9ca3af"} />
      </div>
      <div style={{ paddingBottom: isLast ? "4px" : "36px" }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          <span style={{ fontSize: "13.5px", fontWeight: "700", color: isIdle ? "#9ca3af" : "#111827" }}>
            {step.title}
          </span>
          {step.badge && step.badgeStyle && (
            <span style={{
              fontSize: "11px", fontWeight: "600",
              padding: "2px 8px", borderRadius: "9999px",
              lineHeight: "1.4", ...step.badgeStyle,
            }}>
              {step.badge}
            </span>
          )}
        </div>
        <p style={{ fontSize: "12px", color: isIdle ? "#d1d5db" : "#6b7280", margin: "2px 0 0", lineHeight: "1.5" }}>
          {step.desc}
        </p>
        {step.time && (
          <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>{step.time}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function Page() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [shopHover, setShopHover]   = useState(false);
  const [trackHover, setTrackHover] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("GRP-208193").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const card = {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  };

  return (
    <div style={{
      position: "relative", minHeight: "100vh",
      backgroundColor: "#ffffff", overflowX: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>

      {/* decorations */}
      {PETALS.map((p, i)   => <Petal   key={i} {...p} />)}
      {SPARKLES.map((s, i) => <Sparkle key={i} {...s} />)}
      <GreenLeaf top="20%" left="46%" rotate={-35} />
      <GreenLeaf top="67%" left="3%"  rotate={20}  />

      {/* navbar */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px", maxWidth: "420px", margin: "0 auto",
      }}>
        <div style={{ width: "28px" }} />
        <span style={{
          fontSize: "17px", fontWeight: "900",
          letterSpacing: "0.2em", color: "#111827", textTransform: "uppercase",
        }}>
          GRAPHL
        </span>
        {/* Clicking bag icon → home */}
        <button
          onClick={() => router.push("/")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
        >
          <ShoppingBag size={20} strokeWidth={1.75} color="#374151" />
        </button>
      </div>

      {/* main */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "0 16px 60px", maxWidth: "420px", margin: "0 auto",
      }}>

        {/* success circle */}
        <div style={{
          marginTop: "8px", marginBottom: "16px",
          position: "relative", width: "88px", height: "88px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "9999px", backgroundColor: "#f0fdf4" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "9999px", border: "2.5px solid #86efac" }} />
          <div style={{
            position: "relative", zIndex: 1,
            width: "56px", height: "56px", borderRadius: "9999px",
            backgroundColor: "#ffffff", border: "2.5px solid #10b981",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(16,185,129,0.15)",
          }}>
            <Check size={26} strokeWidth={3} color="#10b981" />
          </div>
        </div>

        {/* heading */}
        <h1 style={{ fontSize: "36px", fontWeight: "900", color: "#111827", margin: 0, letterSpacing: "-0.5px" }}>
          Thank You!
        </h1>
        <p style={{ marginTop: "6px", color: "#6b7280", fontSize: "14px", textAlign: "center" }}>
          Your order has been placed successfully.
        </p>

        {/* order ID */}
        <button onClick={copy} style={{
          marginTop: "14px", display: "flex", alignItems: "center", gap: "8px",
          border: "1.5px solid #d1d5db", borderRadius: "12px", padding: "10px 18px",
          backgroundColor: "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: "pointer",
        }}>
          <span style={{ fontWeight: "700", fontSize: "15px", color: "#1f2937" }}>
            Order #GRP-208193
          </span>
          {copied
            ? <Check size={15} color="#10b981" />
            : <Copy  size={15} color="#9ca3af" />}
        </button>

        {/* email */}
        <p style={{ marginTop: "10px", color: "#6b7280", fontSize: "13.5px", textAlign: "center" }}>
          A confirmation email has been sent to{" "}
          <strong style={{ color: "#111827" }}>shaurya@gmail.com</strong>
        </p>

        {/* order progress */}
        <div style={{ ...card, marginTop: "18px", padding: "16px 16px 8px" }}>
          <p style={{ fontWeight: "800", fontSize: "15px", color: "#111827", margin: "0 0 14px" }}>
            Order Progress
          </p>
          {STEPS.map((step, i) => (
            <StepRow key={step.title} step={step} isLast={i === STEPS.length - 1} />
          ))}
        </div>

        {/* info strip */}
        <div style={{ ...card, marginTop: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "14px 6px" }}>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textAlign: "center", padding: "0 4px", borderRight: "1px solid #f3f4f6" }}>
              <Calendar size={18} color="#6b7280" strokeWidth={1.5} />
              <span style={{ fontSize: "10px", color: "#9ca3af", lineHeight: 1.3 }}>Estimated Delivery</span>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#111827", lineHeight: 1.3 }}>27 – 29 June 2025</span>
              <span style={{ fontSize: "10px", color: "#9ca3af" }}>3 – 5 Business Days</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textAlign: "center", padding: "0 4px", borderRight: "1px solid #f3f4f6" }}>
              <Mail size={18} color="#6b7280" strokeWidth={1.5} />
              <span style={{ fontSize: "10px", color: "#9ca3af", lineHeight: 1.3 }}>Confirmation Email</span>
              <span style={{ fontSize: "10px", color: "#6b7280" }}>Sent to</span>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#1f2937", wordBreak: "break-all" }}>shaurya@gmail.com</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textAlign: "center", padding: "0 4px" }}>
              <Shield size={18} color="#6b7280" strokeWidth={1.5} />
              <span style={{ fontSize: "10px", color: "#9ca3af", lineHeight: 1.3 }}>Secure Payment</span>
              <span style={{ fontSize: "10px", color: "#6b7280" }}>Your payment is</span>
              <span style={{ fontSize: "11px", fontWeight: "800", color: "#10b981" }}>100% secure</span>
            </div>

          </div>
        </div>

        {/* points */}
        <div style={{ ...card, marginTop: "14px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "32px", lineHeight: 1 }} aria-hidden="true">🎁</span>
          <div>
            <p style={{ margin: 0, fontWeight: "800", fontSize: "13.5px", color: "#111827" }}>
              You earned 199 Points{" "}
              <span style={{ color: "#60a5fa" }} aria-hidden="true">✦</span>
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#9ca3af" }}>for this purchase</p>
          </div>
        </div>

        {/* ── CTA buttons ── */}
        <div style={{ marginTop: "18px", width: "100%", display: "flex", gap: "10px" }}>

          {/* Continue Shopping → / */}
          <button
            onClick={() => router.push("/")}
            onMouseEnter={() => setShopHover(true)}
            onMouseLeave={() => setShopHover(false)}
            style={{
              flex: 1, display: "flex", alignItems: "center",
              justifyContent: "center", gap: "6px",
              backgroundColor: shopHover ? "#1f2937" : "#111827",
              color: "#ffffff", borderRadius: "12px",
              padding: "14px 10px", fontSize: "13.5px",
              fontWeight: "700", border: "none", cursor: "pointer",
              transform: shopHover ? "scale(0.98)" : "scale(1)",
              transition: "all 0.15s ease",
            }}
          >
            Continue Shopping
            <ArrowRight size={14} />
          </button>

          {/* Track Order → / (update to /track-order when ready) */}
          <button
            onClick={() => router.push("/")}
            onMouseEnter={() => setTrackHover(true)}
            onMouseLeave={() => setTrackHover(false)}
            style={{
              flex: 1, display: "flex", alignItems: "center",
              justifyContent: "center", gap: "6px",
              backgroundColor: trackHover ? "#f9fafb" : "#ffffff",
              color: "#1f2937", borderRadius: "12px",
              padding: "14px 10px", fontSize: "13.5px",
              fontWeight: "700", border: "1.5px solid #d1d5db",
              cursor: "pointer",
              transform: trackHover ? "scale(0.98)" : "scale(1)",
              transition: "all 0.15s ease",
            }}
          >
            Track Order
            <Box size={14} />
          </button>

        </div>

        {/* footer */}
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "13.5px", fontWeight: "800", color: "#111827" }}>Need help?</p>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#6b7280" }}>
            Contact our support team at{" "}
            <a href="mailto:support@graphl.store" style={{ fontWeight: "700", color: "#111827", textDecoration: "underline" }}>
              support@graphl.store
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
