"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FashionVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax and scale effect on the video wrapper
      gsap.fromTo(
        videoWrapperRef.current,
        { scale: 0.9, borderRadius: "2rem" },
        {
          scale: 1,
          borderRadius: "0rem",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Text reveal
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[var(--color-cream)] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div
          ref={videoWrapperRef}
          className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden group cursor-pointer"
        >
          {/* Simulated Video Poster */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/banners/runway-video-poster.jpg"
              alt="Fashion Runway"
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-700" />
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700">
              <Play fill="white" size={32} className="text-white ml-2 opacity-80 group-hover:opacity-100" />
            </div>
          </div>

          {/* Overlay Text */}
          <div ref={textRef} className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
            <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-bold mb-4">
              The 2026 Collection
            </p>
            <h2 className="text-white font-heading text-4xl md:text-6xl max-w-2xl drop-shadow-lg">
              A Cinematic Journey Through Ethiopian Heritage
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
