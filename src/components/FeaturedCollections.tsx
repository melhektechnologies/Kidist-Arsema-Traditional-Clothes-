"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    title: "Women's Collection",
    subtitle: "Timeless Identity & Modern Silhouette",
    image: "/images/photo_10_2026-06-30_13-36-37.jpg",
    fieldValue: "Women's Collection",
    aspectRatio: "aspect-[3/4]",
    gridClass: "md:col-span-5",
    marginTop: "md:mt-0",
  },
  {
    id: 2,
    title: "Mens' Collection",
    subtitle: "Sophisticated Traditional Tailoring",
    image: "/images/photo_18_2026-06-30_13-36-37.jpg",
    fieldValue: "Mens' Collection",
    aspectRatio: "aspect-[4/5]",
    gridClass: "md:col-span-7",
    marginTop: "md:mt-32",
  },
  {
    id: 3,
    title: "Wedding Gold Edition",
    subtitle: "Royal Custom Embroidery",
    image: "/images/photo_20_2026-06-30_13-36-37.jpg",
    fieldValue: "Wedding Gold Edition",
    aspectRatio: "aspect-[16/9]",
    gridClass: "md:col-span-12",
    marginTop: "md:mt-24",
  },
];

export default function FeaturedCollections() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Cards Animation
      cardsRef.current.forEach((card, index) => {
        const image = card?.querySelector(".parallax-img");
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        });

        if (image) {
          gsap.to(image, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            y: "15%",
            ease: "none",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, fieldValue: string) => {
    e.preventDefault();
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

      // Emit custom event to let the form know a collection was pre-selected
      const event = new CustomEvent("preselect-collection", { detail: fieldValue });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[var(--color-primary)] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="flex justify-between items-end mb-20">
          <h2
            ref={headerRef}
            className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-black)] uppercase"
          >
            Explore <br /> Collection
          </h2>
          <span className="text-[var(--color-gold)] font-bold text-xs uppercase tracking-[0.25em] border-b border-[var(--color-gold)] pb-2 hidden sm:inline-block">
            Timeless Luxury Couture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {collections.map((collection, index) => (
            <a
              key={collection.id}
              href="#contact"
              onClick={(e) => handleCardClick(e, collection.fieldValue)}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`group relative block w-full ${collection.gridClass} ${collection.marginTop}`}
            >
              <div className={`relative w-full overflow-hidden ${collection.aspectRatio} rounded-lg shadow-lg`}>
                <div className="absolute inset-[-10%] w-[120%] h-[120%] parallax-img">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                </div>
                {/* Dark premium overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-700" />
              </div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <p className="text-[var(--color-gold)] uppercase tracking-[0.25em] text-[10px] md:text-xs font-bold mb-3 drop-shadow-md opacity-90">
                  {collection.subtitle}
                </p>
                <h3 className="text-white font-heading text-3xl md:text-4xl lg:text-5xl tracking-wide drop-shadow-lg">
                  {collection.title}
                </h3>
                <span className="inline-block mt-4 text-[10px] uppercase text-white/60 tracking-[0.2em] border-b border-white/20 pb-1 group-hover:text-[var(--color-gold)] group-hover:border-[var(--color-gold)] transition-colors duration-300">
                  Request Custom Design &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
