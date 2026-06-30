"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  "/images/photo_1_2026-06-30_13-36-37.jpg",
  "/images/photo_8_2026-06-30_13-36-37.jpg",
  "/images/photo_12_2026-06-30_13-36-37.jpg",
  "/images/photo_19_2026-06-30_13-36-37.jpg"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Slideshow interval (6 seconds per image)
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        gsap.set([taglineRef.current, subheadRef.current, buttonsRef.current], {
          y: 60,
          opacity: 0,
        });

        tl.to(
          taglineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          }
        )
          .to(
            subheadRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.9"
          )
          .to(
            buttonsRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.8"
          );
      }, containerRef);

      return () => ctx.revert();
    }, 2500); // Wait for Preloader

    return () => clearTimeout(timer);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
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
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[var(--color-black)]"
    >
      {/* Background Slideshow with crossfade & Ken Burns effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-[-10%] w-[120%] h-[120%] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/55 after:via-black/30 after:to-black/75"
          >
            <Image
              src={slides[activeSlide]}
              alt="Kidist Arsema Traditional Clothes Luxury Slideshow"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-6 mt-20 max-w-5xl mx-auto w-full">
        <p
          ref={subheadRef}
          className="text-xs md:text-sm font-bold mb-6 max-w-2xl tracking-[0.4em] text-[var(--color-gold)] uppercase"
        >
          KIDIST ARSEMA • Luxury Couture
        </p>

        <h1
          ref={taglineRef}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.25] mb-12"
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.6)" }}
        >
          Where heritage becomes elegance...
          <span className="block italic text-[var(--color-gold)] mt-2 font-normal">
            reaches the world stage.
          </span>
        </h1>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6">
          <a
            href="#collection"
            onClick={(e) => handleScrollTo(e, "collection")}
            className="group relative px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 mix-blend-difference text-white">Explore Collection</span>
            <div className="absolute inset-0 h-full w-full bg-white scale-y-100 group-hover:scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <div className="absolute inset-0 h-full w-full bg-[var(--color-gold)] -z-10" />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="group relative px-10 py-4 bg-transparent border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-bold hover:border-white transition-colors duration-500"
          >
            Book Custom Design
          </a>
        </div>
      </div>
    </section>
  );
}
