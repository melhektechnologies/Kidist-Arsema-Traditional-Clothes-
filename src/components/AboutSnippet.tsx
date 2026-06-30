"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSnippet() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const craftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const elements = textRef.current.querySelectorAll(".reveal-el");
        gsap.from(elements, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      if (craftRef.current) {
        const image = craftRef.current.querySelector(".craft-img");
        const content = craftRef.current.querySelector(".craft-content");

        gsap.from([image, content], {
          scrollTrigger: {
            trigger: craftRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1.5,
          stagger: 0.25,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[var(--color-cream)] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Main About Text */}
        <div ref={textRef} className="text-center max-w-4xl mx-auto space-y-6 mb-24 md:mb-32">
          <p className="reveal-el text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-bold">
            Our Heritage
          </p>
          <h2 className="reveal-el font-heading text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-[var(--color-black)] font-light">
            We don't just design clothes. We weave the rich threads of Ethiopian history into modern silhouettes.
          </h2>
          <p className="reveal-el text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Every stitch is a tribute to our ancestors. Every pattern tells a story of royalty, faith, and undeniable elegance. Kidist Arsema is where the ancient world meets the vanguard of high fashion.
          </p>
        </div>

        {/* The Making Section */}
        <div
          ref={craftRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-t border-black/5 pt-20"
        >
          {/* Craft Image */}
          <div className="craft-img relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/images/photo_15_2026-06-30_13-36-37.jpg"
              alt="Traditional Hand Weaving Craftsmanship"
              fill
              className="object-cover hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
            {/* Elegant Corner Border Overlay */}
            <div className="absolute inset-4 border border-white/20 pointer-events-none" />
          </div>

          {/* Craft Content */}
          <div className="craft-content space-y-6 lg:pl-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[var(--color-gold)]" />
              <p className="text-[var(--color-gold)] uppercase tracking-[0.25em] text-xs font-bold">
                The Making ✔️
              </p>
            </div>
            <h3 className="font-heading text-3xl md:text-4xl text-[var(--color-black)] font-medium">
              Hand-loomed Artistry, <br />
              Stitched by Tradition
            </h3>
            <div className="text-gray-600 text-sm md:text-base space-y-4 leading-relaxed">
              <p>
                A labor of love, time, and absolute dedication. Every piece in our collection is hand-woven by master weavers (Shemane) in Ethiopia using age-old hand-loom techniques passed down through generations.
              </p>
              <p>
                It takes weeks of precise handwork to create the delicate cotton base, which is then adorned with hand-spun metallic embroidery (Tilet). These patterns represent cultural identity and royal elegance.
              </p>
              <p>
                By preserving these ancient techniques, we ensure that every garment carries the authentic soul of our heritage, crafted to stand out on the global stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
