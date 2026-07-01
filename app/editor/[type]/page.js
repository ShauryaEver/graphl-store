"use client";

import { useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Moveable from "react-moveable";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { useCart } from "@/app/cart/cartContext";

const PRODUCT_LABELS = {
  tshirt: "T-Shirt",
  hoodie: "Hoodie",
};

const OUTLINE_IMAGES = {
  tshirt: {
    front: "/tshirt-front-outline.jpg",
    back: "/tshirt-back-outline.jpg",
  },
  hoodie: {
    front: "/tshirt-front-outline.jpg",
    back: "/tshirt-back-outline.jpg",
  },
};

export default function CustomizeEditor() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const type = params.type;
  const fit = searchParams.get("fit") || "plain1";
  const productLabel = PRODUCT_LABELS[type] || "Product";

  const CUSTOM_PRICE = type === "hoodie" ? 2499 : 1499;

  const [side, setSide] = useState("front");
  const [elements, setElements] = useState([]); // { id, type: 'image'|'text', content, ...transform }
  const [selectedId, setSelectedId] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const targetRefs = useRef({});
  const fileInputRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ─── Upload Image ───
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newElement = {
        id: `img-${Date.now()}`,
        type: "image",
        content: event.target.result,
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        rotate: 0,
      };
      setElements((prev) => [...prev, newElement]);
      setSelectedId(newElement.id);
    };
    reader.readAsDataURL(file);
  };

  // ─── Add Text ───
  const handleAddText = () => {
    if (!textInput.trim()) return;

    const newElement = {
      id: `text-${Date.now()}`,
      type: "text",
      content: textInput,
      x: 100,
      y: 150,
      width: 200,
      height: 50,
      rotate: 0,
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
    setTextInput("");
  };
  const handleAiGenerate = async () => {
  if (!aiPrompt.trim()) return;

  setAiLoading(true);
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: aiPrompt }),
    });

    const data = await res.json();

    if (!data.image) throw new Error(data.error || "Failed");

    const newElement = {
      id: `ai-${Date.now()}`,
      type: "image",
      content: data.image,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      rotate: 0,
    };

    setElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
    setAiOpen(false);
    setAiPrompt("");
    toast.success("AI image added to canvas!");

  } catch (error) {
    toast.error("AI generation failed. Try again!");
  } finally {
    setAiLoading(false);
  }
};

  // ─── Delete Element ───
  const handleDelete = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedId(null);
  };

  // ─── Update Transform ───
  const updateElement = (id, updates) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  // ─── Save Design & Add to Cart ───
const handleSaveDesign = async () => {
  if (elements.length === 0) {
    toast.error("Add at least one design element first!");
    return;
  }

  setIsExporting(true);

  try {
    // Draw design on canvas
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 500, 600);

    const outlineImg = new window.Image();
    outlineImg.crossOrigin = "anonymous";
    outlineImg.src = OUTLINE_IMAGES[type]?.[side] || "/tshirt-front-outline.jpg";

    await new Promise((resolve) => {
      outlineImg.onload = resolve;
      outlineImg.onerror = resolve;
    });

    const padding = 40;
    ctx.drawImage(outlineImg, padding, padding, 500 - padding * 2, 600 - padding * 2);

    for (const el of elements) {
      ctx.save();
      const cx = el.x + el.width / 2;
      const cy = el.y + el.height / 2;
      ctx.translate(cx, cy);
      ctx.rotate((el.rotate * Math.PI) / 180);

      if (el.type === "text") {
        ctx.font = `bold ${Math.max(el.height * 0.6, 20)}px sans-serif`;
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(el.content, 0, 0);
      } else if (el.type === "image") {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = el.content;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        ctx.drawImage(img, -el.width / 2, -el.height / 2, el.width, el.height);
      }

      ctx.restore();
    }

    const imageDataUrl = canvas.toDataURL("image/png");

    // Upload to Cloudinary
    toast.info("Uploading design...");
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageDataUrl }),
    });

    const uploadData = await uploadRes.json();

    if (!uploadData.url) {
      throw new Error("Upload failed");
    }

    // Add to cart with real Cloudinary URL
    const customProduct = {
      id: `custom-${type}-${Date.now()}`,
      title: `Custom ${productLabel} Design`,
      images: [uploadData.url],
      price: CUSTOM_PRICE,
      category: `custom-${type}`,
    };

    addToCart(customProduct, "M", "Custom", 1);
    toast.success("Custom design added to cart!");
    router.push("/cart");

  } catch (error) {
    console.error("Export failed:", error);
    toast.error("Something went wrong. Try again.");
  } finally {
    setIsExporting(false);
  }
};


  return (
    <main className="min-h-screen flex flex-col lg:flex-row relative">
      {/* AI Panel */}
{aiOpen && (
  <div className="absolute left-20 top-0 h-full w-80 bg-white border-r border-gray-100 shadow-lg z-30 flex flex-col">

    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <h2 className="font-bold text-base">AI image generator</h2>
      <button
        onClick={() => setAiOpen(false)}
        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500"
      >
        ✕
      </button>
    </div>

    <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">

      {/* Example prompts */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Text prompt</p>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setAiPrompt("A fierce dragon breathing fire, detailed digital art, dark fantasy style")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-200 text-purple-600 text-xs font-medium hover:bg-purple-50 transition"
          >
            ✦ Try an example
          </button>
          <button
            onClick={() => setAiPrompt(aiPrompt + " highly detailed, professional, 8k")}
            className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition"
          >
            Enhance prompt
          </button>
        </div>

        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Simply enter a detailed description of the image you want to create (1 image generated per credit)."
          className="w-full h-32 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition resize-none text-gray-700 placeholder:text-gray-400"
        />
      </div>

    </div>

    {/* Generate Button */}
    <div className="px-5 py-4 border-t border-gray-100">
      <button
        onClick={handleAiGenerate}
        disabled={aiLoading || !aiPrompt.trim()}
        className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 text-white hover:bg-black"
      >
        {aiLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Generating...
          </span>
        ) : "Generate image"}
      </button>
      <p className="text-xs text-gray-400 text-center mt-3">
        By generating you agree to our Terms of Use
      </p>
    </div>

  </div>
)}

    
      {/* Sidebar */}
<aside className="w-20 bg-white border-r border-gray-100 flex flex-col items-center gap-1 py-4 shrink-0">

  {/* Back */}
  <button
    onClick={() => router.push(`/customize/${type}`)}
    className="flex flex-col items-center gap-1 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  </button>

  <div className="w-12 h-px bg-gray-100 my-1" />

  {/* Upload */}
  <button
    onClick={() => fileInputRef.current?.click()}
    className="flex flex-col items-center gap-1.5 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 7.5m0 0L7.5 12m4.5-4.5V21" />
    </svg>
    <span className="text-[10px] font-medium">Upload</span>
  </button>

  {/* AI */}
  <button
  onClick={() => setAiOpen(true)}
  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition w-full ${
    aiOpen ? "bg-gray-100 text-black" : "text-gray-600 hover:text-black hover:bg-gray-50"
  }`}
>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
    <span className="text-[10px] font-medium">AI</span>
  </button>

  {/* Add Text */}
  <button
    onClick={() => {
      const text = prompt("Enter text to add:");
      if (text?.trim()) {
        const newElement = {
          id: `text-${Date.now()}`,
          type: "text",
          content: text,
          x: 100,
          y: 150,
          width: 200,
          height: 50,
          rotate: 0,
        };
        setElements((prev) => [...prev, newElement]);
        setSelectedId(newElement.id);
      }
    }}
    className="flex flex-col items-center gap-1.5 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
    <span className="text-[10px] font-medium">Add text</span>
  </button>

  {/* My Library */}
  <button
    onClick={() => toast.info("Library coming soon!")}
    className="flex flex-col items-center gap-1.5 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
    </svg>
    <span className="text-[10px] font-medium">My library</span>
  </button>

  {/* Graphics */}
  <button
    onClick={() => toast.info("Graphics coming soon!")}
    className="flex flex-col items-center gap-1.5 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
    <span className="text-[10px] font-medium">Graphics</span>
  </button>

  {/* My Templates */}
  <button
    onClick={() => toast.info("Templates coming soon!")}
    className="flex flex-col items-center gap-1.5 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h7.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m-7.5 0h7.5" />
    </svg>
    <span className="text-[10px] font-medium">My templates</span>
  </button>

  {/* Shutterstock */}
  <button
    onClick={() => toast.info("Shutterstock coming soon!")}
    className="flex flex-col items-center gap-1.5 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
    <span className="text-[10px] font-medium">Shutterstock</span>
  </button>

  {/* Fiverr */}
  <button
    onClick={() => toast.info("Fiverr coming soon!")}
    className="flex flex-col items-center gap-1.5 p-3 text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition w-full"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
    <span className="text-[10px] font-medium">Fiverr</span>
  </button>

  {/* Help */}
  <div className="mt-auto">
    <button className="flex flex-col items-center gap-1.5 p-3 text-gray-400 hover:text-black hover:bg-gray-50 rounded-xl transition w-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="22" height="22">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    </button>
  </div>

</aside>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Custom Graphl</p>
            <h1 className="text-lg font-bold">{productLabel} Editor</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold">₹{CUSTOM_PRICE}</p>
            <button
              onClick={handleSaveDesign}
              disabled={isExporting}
              className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? "Saving..." : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 relative overflow-hidden">

          <div
            id="canvas-container"
            ref={canvasContainerRef}
            className="relative w-[500px] h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden"
            onClick={(e) => {
              if (e.target.id === "canvas-container") setSelectedId(null);
            }}
          >
            {/* Garment Outline */}
            <Image
              src={OUTLINE_IMAGES[type]?.[side] || OUTLINE_IMAGES.tshirt[side]}
              alt="Garment outline"
              fill
              className="object-contain pointer-events-none p-6"
            />

            {/* Elements */}
            {elements.map((el) => (
              <div
                key={el.id}
                ref={(node) => (targetRefs.current[el.id] = node)}
                onClick={() => setSelectedId(el.id)}
                style={{
                  position: "absolute",
                  left: el.x,
                  top: el.y,
                  width: el.width,
                  height: el.height,
                  transform: `rotate(${el.rotate}deg)`,
                  cursor: "move",
                }}
                className={`${
                  selectedId === el.id ? "ring-2 ring-black" : ""
                }`}
              >
                {el.type === "image" ? (
                  <img
                    src={el.content}
                    alt="design"
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                ) : (
                  <p className="w-full h-full flex items-center justify-center text-2xl font-bold text-black select-none pointer-events-none">
                    {el.content}
                  </p>
                )}
              </div>
            ))}

            {/* Moveable for selected element */}
            {selectedId && targetRefs.current[selectedId] && (
              <Moveable
                target={targetRefs.current[selectedId]}
                container={document.getElementById("canvas-container")}
                draggable
                resizable
                rotatable
                onDrag={({ left, top }) => {
                  updateElement(selectedId, { x: left, y: top });
                }}
                onResize={({ width, height, drag }) => {
                  updateElement(selectedId, {
                    width,
                    height,
                    x: drag.left,
                    y: drag.top,
                  });
                }}
                onRotate={({ beforeRotate }) => {
                  updateElement(selectedId, { rotate: beforeRotate });
                }}
                keepRatio={false}
                throttleDrag={0}
                throttleResize={0}
                throttleRotate={0}
              />
            )}
          </div>

          {/* Front/Back Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setSide("front")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition ${
                side === "front" ? "bg-[#4a4a3a] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Front side
            </button>
            <button
              onClick={() => setSide("back")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition ${
                side === "back" ? "bg-[#4a4a3a] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Back side
            </button>
          </div>

        </div>

        {/* Bottom Text Input Bar */}
        <div className="border-t border-gray-100 bg-white px-6 py-4 flex items-center gap-3">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAddText(); }}
            placeholder="Type text to add to your design..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black transition"
          />
          <button
            onClick={handleAddText}
            className="px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-900 transition"
          >
            Add Text
          </button>
          {selectedId && (
            <button
              onClick={() => handleDelete(selectedId)}
              className="px-5 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition"
            >
              Delete Selected
            </button>
          )}
        </div>

      </div>
       {/* Hidden File Picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

    </main>
  );
}