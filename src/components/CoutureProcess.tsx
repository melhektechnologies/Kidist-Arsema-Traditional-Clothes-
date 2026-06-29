"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Ruler, PenTool, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    number: "01",
    title: "Share Your Vision",
    icon: <Send className="text-[var(--color-gold)]" size={24} />,
    desc: "Complete our quick Custom Design request form by sharing your event date, custom notes, and uploading inspiration photos.",
  },
  {
    number: "02",
    title: "Supply Measurements",
    icon: <Ruler className="text-[var(--color-gold)]" size={24} />,
    desc: "Use our interactive sizing guide to take your measurements at home. Insert them directly into the form or provide them later.",
  },
  {
    number: "03",
    title: "Artisan Crafting",
    icon: <PenTool className="text-[var(--color-gold)]" size={24} />,
    desc: "Our master weavers (Shemane) hand-weave the cotton threads in Addis Ababa, and tailors stitch your dress to your exact fit.",
  },
  {
    number: "04",
    title: "Luxurious Delivery",
    icon: <Globe className="text-[var(--color-gold)]" size={24} />,
    desc: "Your bespoke Habesha couture is packaged beautifully and shipped via premium global courier directly to your doorstep.",
  },
];

export default function CoutureProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll(".step-card");
        const lines = stepsRef.current.querySelectorAll(".connector-line");

        gsap.from(steps, {
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        });

        if (lines.length > 0) {
          gsap.from(lines, {
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 70%",
            },
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.5,
            stagger: 0.3,
            ease: "power2.out",
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-bold">
            How It Works
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[var(--color-black)] tracking-wide">
            The Couture Journey
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
            From your initial sketch or idea to the final masterwork delivered to your door. A seamless process for remote tailoring.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative"
        >
          {journeySteps.map((step, idx) => (
            <div
              key={step.number}
              className="step-card group flex flex-col items-center text-center space-y-6 relative z-10"
            >
              {/* Step Circle with Icon */}
              <div className="relative w-20 h-20 rounded-full border border-gray-100 bg-[var(--color-cream)] flex items-center justify-center shadow-md group-hover:border-[var(--color-gold)] group-hover:bg-white group-hover:scale-105 transition-all duration-500">
                {step.icon}
                {/* Float Large Gold Number behind circle */}
                <span className="absolute -top-4 -right-4 font-heading text-3xl font-bold text-[var(--color-gold)]/30 select-none">
                  {step.number}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-3">
                <h3 className="font-heading text-xl font-semibold text-[var(--color-black)] group-hover:text-[var(--color-gold)] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>

              {/* Connecting Line (Only visible on desktop/md, and not on the last item) */}
              {idx < journeySteps.length - 1 && (
                <div className="connector-line hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-[var(--color-gold)]/40 to-[var(--color-gold)]/10 -z-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
