"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        gsap.set([taglineRef.current, subheadRef.current, buttonsRef.current], {
          y: 60,
          opacity: 0,
        });
        gsap.set(imageRef.current, { scale: 1.15, opacity: 0 });

        tl.to(imageRef.current, {
          scale: 1.03,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        })
          .to(
            taglineRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
            },
            "-=1.6"
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

        // Parallax scroll effect
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          yPercent: 15,
          ease: "none",
        });
      }, containerRef);

      return () => ctx.revert();
    }, 2500); // Wait for the Preloader animation

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
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <div
          ref={imageRef}
          className="absolute inset-[-10%] w-[120%] h-[120%] after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/50 after:via-black/25 after:to-black/70"
        >
          <Image
            src="/images/banners/hero-main.jpg"
            alt="Kidis Arsema Traditional Clothes Hero"
            fill
            priority
            className="object-cover"
          />
        </div>
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
