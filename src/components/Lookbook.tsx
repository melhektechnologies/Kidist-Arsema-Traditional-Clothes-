"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Ruler, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lookbookItems = [
  { id: 1, src: "/images/photo_1_2026-06-30_13-36-37.jpg", category: "women", label: "Classic Habesha Kemis" },
  { id: 2, src: "/images/photo_2_2026-06-30_13-36-37.jpg", category: "women", label: "Modern Silhouette Dress" },
  { id: 3, src: "/images/photo_3_2026-06-30_13-36-37.jpg", category: "women", label: "Golden Thread Tilet" },
  { id: 4, src: "/images/photo_4_2026-06-30_13-36-37.jpg", category: "women", label: "Minimalist Border Kemis" },
  { id: 5, src: "/images/photo_5_2026-06-30_13-36-37.jpg", category: "women", label: "Regal Weave Dress" },
  { id: 6, src: "/images/photo_6_2026-06-30_13-36-37.jpg", category: "women", label: "Contemporary Couture Dress" },
  { id: 7, src: "/images/photo_7_2026-06-30_13-36-37.jpg", category: "women", label: "Handwoven Royal Kemis" },
  { id: 8, src: "/images/photo_8_2026-06-30_13-36-37.jpg", category: "wedding", label: "Wedding Gold Edition Front" },
  { id: 9, src: "/images/photo_9_2026-06-30_13-36-37.jpg", category: "men", label: "Men's Embroidered Vest" },
  { id: 10, src: "/images/photo_10_2026-06-30_13-36-37.jpg", category: "women", label: "Timeless Identity Dress" },
  { id: 11, src: "/images/photo_11_2026-06-30_13-36-37.jpg", category: "women", label: "Royal Silhouette Kemis" },
  { id: 12, src: "/images/photo_12_2026-06-30_13-36-37.jpg", category: "wedding", label: "Wedding Gold Silhouette" },
  { id: 13, src: "/images/photo_13_2026-06-30_13-36-37.jpg", category: "women", label: "Artisan Tilet Dress" },
  { id: 14, src: "/images/photo_14_2026-06-30_13-36-37.jpg", category: "women", label: "Golden Embroidery Dress" },
  { id: 15, src: "/images/photo_15_2026-06-30_13-36-37.jpg", category: "women", label: "Detail Craftsmanship Close-up" },
  { id: 16, src: "/images/photo_16_2026-06-30_13-36-37.jpg", category: "women", label: "Contemporary Habesha Gown" },
  { id: 17, src: "/images/photo_17_2026-06-30_13-36-37.jpg", category: "women", label: "Sleek Modern Traditional" },
  { id: 18, src: "/images/photo_18_2026-06-30_13-36-37.jpg", category: "men", label: "Men's Embroidered Tunic" },
  { id: 19, src: "/images/photo_19_2026-06-30_13-36-37.jpg", category: "wedding", label: "Wedding Gold Detail" },
  { id: 20, src: "/images/photo_20_2026-06-30_13-36-37.jpg", category: "wedding", label: "Wedding Gold Royal Gown" },
  { id: 21, src: "/images/photo_21_2026-06-30_13-36-37.jpg", category: "women", label: "Classic White Tilet Gown" },
];

const categories = [
  { id: "all", label: "All Works" },
  { id: "women", label: "Women's Collection" },
  { id: "men", label: "Mens' Collection" },
  { id: "wedding", label: "Wedding Gold Edition" },
];

export default function Lookbook() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const filteredItems = filter === "all" 
    ? lookbookItems 
    : lookbookItems.filter(item => item.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const prevIdx = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
      setLightboxIndex(prevIdx);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const nextIdx = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
      setLightboxIndex(nextIdx);
    }
  };

  const handleCustomRequest = (item: typeof lookbookItems[0]) => {
    setLightboxIndex(null);
    const element = document.getElementById("contact");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Dispatch custom event to auto-populate form
      const event = new CustomEvent("lookbook-select", {
        detail: {
          src: item.src,
          label: item.label,
          category: item.category
        }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="lookbook"
      ref={containerRef}
      className="py-24 md:py-36 bg-white overflow-hidden border-t border-gray-100"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-bold">
            Artisan Lookbook
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[var(--color-black)] tracking-wide">
            Portfolio of Creations
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
            Browse our gallery of completed designs. Each piece is custom-tailored and hand-woven to perfection.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                filter === cat.id
                  ? "bg-[var(--color-gold)] border-[var(--color-gold)] text-black shadow-md"
                  : "bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lookbook Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid relative overflow-hidden rounded-xl shadow-md border border-gray-100/50 group cursor-pointer aspect-[3/4] md:aspect-auto"
              >
                <div className="relative w-full h-full min-h-[260px] md:min-h-[300px] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                  {/* Luxury Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <p className="text-[var(--color-gold)] text-[10px] uppercase tracking-widest font-bold mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      {item.category === "wedding" ? "Wedding Gold Edition" : item.category === "men" ? "Mens' Collection" : "Women's Collection"}
                    </p>
                    <h4 className="text-white font-heading text-lg tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-[50ms]">
                      {item.label}
                    </h4>
                    <span className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <Plus size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-6 md:p-12 cursor-zoom-out"
            >
              {/* Controls */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={24} />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 text-white/70 hover:text-white p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 z-50 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 text-white/70 hover:text-white p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 z-50 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Main Lightbox Content */}
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="relative max-w-4xl w-full h-[70vh] flex flex-col items-center justify-center cursor-default"
              >
                <div className="relative w-full h-full max-h-[55vh] aspect-[3/4]">
                  <Image
                    src={filteredItems[lightboxIndex].src}
                    alt={filteredItems[lightboxIndex].label}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>

                {/* Details Footer inside Lightbox */}
                <div className="text-center mt-6 space-y-4 max-w-md w-full">
                  <div>
                    <span className="text-[var(--color-gold)] text-[10px] uppercase tracking-widest font-bold">
                      {filteredItems[lightboxIndex].category === "wedding" ? "Wedding Gold Edition" : filteredItems[lightboxIndex].category === "men" ? "Mens' Collection" : "Women's Collection"}
                    </span>
                    <h3 className="text-white font-heading text-2xl tracking-wide mt-1">
                      {filteredItems[lightboxIndex].label}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleCustomRequest(filteredItems[lightboxIndex])}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-gold)] text-black font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 rounded-md cursor-pointer shadow-lg shadow-[var(--color-gold)]/10"
                  >
                    <Ruler size={14} />
                    <span>Request Custom Design Like This</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
