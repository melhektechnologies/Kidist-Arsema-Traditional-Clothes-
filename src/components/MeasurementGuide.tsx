"use client";

import { useState, useEffect, useRef } from "react";
import { Info, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: "Shoulder to Shoulder",
    view: "back",
    desc: "Measure across the upper back from one shoulder tip to the other, close to the neckline.",
    tip: "Keep your shoulders relaxed. Do not puff out your chest or pull shoulders back.",
  },
  {
    id: 2,
    title: "Full Bust",
    view: "front",
    desc: "Measure around the fullest part of the bust, passing around the back and across the fullest part.",
    tip: "Ensure the measuring tape is level all the way around your back and parallel to the floor.",
  },
  {
    id: 3,
    title: "Waist Size",
    view: "front",
    desc: "Measure around your natural waistline, passing around the back.",
    tip: "Your natural waist is the narrowest part of your torso, typically an inch above your belly button.",
  },
  {
    id: 4,
    title: "Shoulder to Waist",
    view: "front",
    desc: "Measure from the shoulder (near the neck) to the bust tip, then down to about the middle of your waist.",
    tip: "Follow the contour of your chest rather than pulling the tape straight down.",
  },
  {
    id: 5,
    title: "Waist to Ankle Length",
    view: "side",
    desc: "Measure from your natural waistline down the side of your body to the ankle (or your desired dress length).",
    tip: "We recommend wearing the shoes you plan to wear with the dress when taking this measurement.",
  },
  {
    id: 6,
    title: "Full Arm Length",
    view: "side",
    desc: "Measure from the shoulder tip down the outside of the arm to the wrist.",
    tip: "Hold your arm with a slight bend at the elbow to allow movement room in the final sleeve.",
  },
];

export default function MeasurementGuide() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
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

  const activeView = steps.find((s) => s.id === activeStep)?.view || "front";

  return (
    <section
      id="measurements"
      ref={containerRef}
      className="py-24 md:py-36 bg-[var(--color-cream)] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-4">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-bold">
            Perfect Fit Guarantee
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[var(--color-black)] tracking-wide">
            Body Measurement Guide
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed">
            No showroom visit required. Follow our interactive visual guide below to take accurate measurements in the comfort of your home.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Silhouettes Panel */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* View Selector Tabs (Front/Back/Side) */}
            <div className="flex gap-4 mb-10 bg-white/60 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-gray-100">
              {["back", "front", "side"].map((view) => (
                <button
                  key={view}
                  onClick={() => {
                    // Set active step to the first step of this view
                    const firstStepOfView = steps.find((s) => s.view === view);
                    if (firstStepOfView) setActiveStep(firstStepOfView.id);
                  }}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    activeView === view
                      ? "bg-[var(--color-gold)] text-black shadow-md"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {view} View
                </button>
              ))}
            </div>

            {/* SVG Visualizer Container */}
            <div className="relative bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md aspect-[4/5] flex items-center justify-center border border-gray-100 overflow-hidden">
              
              {/* Back View */}
              {activeView === "back" && (
                <svg className="w-full h-full max-h-[360px]" viewBox="0 0 160 380" fill="none">
                  {/* Styled Back Silhouette Path */}
                  <path
                    d="M35,90 C35,90 40,65 50,60 C60,55 70,55 80,55 C90,55 100,55 110,60 C120,65 125,90 125,90 C125,90 135,115 138,150 C141,185 138,200 138,200 C138,200 142,210 140,240 C138,270 130,340 125,360 L115,360 L115,320 L110,260 L95,260 L95,360 L80,360 L65,360 L65,260 L50,260 L45,320 L45,360 L35,360 C30,340 22,270 20,240 C18,210 22,200 22,200 C22,200 19,185 22,150 C25,115 35,90 35,90 Z"
                    stroke="#E5DDC8"
                    strokeWidth="1.5"
                    fill="#FDFBF7"
                  />
                  {/* Head & Neck */}
                  <path
                    d="M68,55 C68,45 68,35 73,30 C76,28 78,28 80,28 C82,28 84,28 87,30 C92,35 92,45 92,55 Z"
                    stroke="#E5DDC8"
                    strokeWidth="1.5"
                    fill="#FDFBF7"
                  />
                  {/* Bun Hair */}
                  <circle cx="80" cy="22" r="10" stroke="#E5DDC8" strokeWidth="1.5" fill="#FDFBF7" />

                  {/* 1. Shoulder to Shoulder Line */}
                  <g className="transition-all duration-500">
                    <line
                      x1="38"
                      y1="82"
                      x2="122"
                      y2="82"
                      stroke={activeStep === 1 ? "var(--color-gold)" : "#E5E1D8"}
                      strokeWidth={activeStep === 1 ? "3" : "1.5"}
                      strokeDasharray="4 4"
                      className={activeStep === 1 ? "animate-[pulse_2s_infinite]" : ""}
                    />
                    {/* Markers */}
                    <circle cx="38" cy="82" r="4" fill={activeStep === 1 ? "var(--color-gold)" : "#C8B195"} />
                    <circle cx="122" cy="82" r="4" fill={activeStep === 1 ? "var(--color-gold)" : "#C8B195"} />
                    {/* Glowing active step number tag */}
                    <g transform="translate(80, 82)">
                      <circle
                        r="12"
                        fill={activeStep === 1 ? "var(--color-gold)" : "#E5DDC8"}
                        className="transition-colors duration-300"
                      />
                      <text
                        textAnchor="middle"
                        y="4"
                        fill={activeStep === 1 ? "black" : "#666"}
                        className="text-[10px] font-bold"
                      >
                        1
                      </text>
                    </g>
                  </g>
                </svg>
              )}

              {/* Front View */}
              {activeView === "front" && (
                <svg className="w-full h-full max-h-[360px]" viewBox="0 0 160 380" fill="none">
                  {/* Silhouette Path */}
                  <path
                    d="M35,90 C35,90 40,65 50,60 C60,55 70,55 80,55 C90,55 100,55 110,60 C120,65 125,90 125,90 C125,90 135,115 138,150 C141,185 138,200 138,200 C138,200 142,210 140,240 C138,270 130,340 125,360 L115,360 L115,320 L110,260 L95,260 L95,360 L80,360 L65,360 L65,260 L50,260 L45,320 L45,360 L35,360 C30,340 22,270 20,240 C18,210 22,200 22,200 C22,200 19,185 22,150 C25,115 35,90 35,90 Z"
                    stroke="#E5DDC8"
                    strokeWidth="1.5"
                    fill="#FDFBF7"
                  />
                  {/* Face outline & Neck */}
                  <path
                    d="M68,55 C68,45 68,35 73,30 C76,28 78,28 80,28 C82,28 84,28 87,30 C92,35 92,45 92,55"
                    stroke="#E5DDC8"
                    strokeWidth="1.5"
                  />
                  {/* Hair */}
                  <path
                    d="M65,30 C65,30 75,18 80,18 C85,18 95,30 95,30 C95,30 100,45 92,52 C88,55 80,55 80,55 C80,55 72,55 68,52 C60,45 65,30 65,30 Z"
                    fill="#E5DDC8"
                  />

                  {/* 2. Full Bust Line */}
                  <g className="transition-all duration-500">
                    <line
                      x1="32"
                      y1="125"
                      x2="128"
                      y2="125"
                      stroke={activeStep === 2 ? "var(--color-gold)" : "#E5E1D8"}
                      strokeWidth={activeStep === 2 ? "3" : "1.5"}
                      strokeDasharray="4 4"
                      className={activeStep === 2 ? "animate-pulse" : ""}
                    />
                    <circle cx="32" cy="125" r="4" fill={activeStep === 2 ? "var(--color-gold)" : "#C8B195"} />
                    <circle cx="128" cy="125" r="4" fill={activeStep === 2 ? "var(--color-gold)" : "#C8B195"} />
                    {/* Glowing active step number tag */}
                    <g transform="translate(80, 125)">
                      <circle r="12" fill={activeStep === 2 ? "var(--color-gold)" : "#E5DDC8"} />
                      <text textAnchor="middle" y="4" fill={activeStep === 2 ? "black" : "#666"} className="text-[10px] font-bold">
                        2
                      </text>
                    </g>
                  </g>

                  {/* 3. Waist Size Line */}
                  <g className="transition-all duration-500">
                    <line
                      x1="45"
                      y1="175"
                      x2="115"
                      y2="175"
                      stroke={activeStep === 3 ? "var(--color-gold)" : "#E5E1D8"}
                      strokeWidth={activeStep === 3 ? "3" : "1.5"}
                      strokeDasharray="4 4"
                    />
                    <circle cx="45" cy="175" r="4" fill={activeStep === 3 ? "var(--color-gold)" : "#C8B195"} />
                    <circle cx="115" cy="175" r="4" fill={activeStep === 3 ? "var(--color-gold)" : "#C8B195"} />
                    <g transform="translate(80, 175)">
                      <circle r="12" fill={activeStep === 3 ? "var(--color-gold)" : "#E5DDC8"} />
                      <text textAnchor="middle" y="4" fill={activeStep === 3 ? "black" : "#666"} className="text-[10px] font-bold">
                        3
                      </text>
                    </g>
                  </g>

                  {/* 4. Shoulder to Waist Line */}
                  <g className="transition-all duration-500">
                    {/* Path over shoulder down bust to waist */}
                    <path
                      d="M58,74 L73,125 L65,175"
                      stroke={activeStep === 4 ? "var(--color-gold)" : "#E5E1D8"}
                      strokeWidth={activeStep === 4 ? "3" : "1.5"}
                      strokeDasharray="4 4"
                    />
                    <circle cx="58" cy="74" r="4" fill={activeStep === 4 ? "var(--color-gold)" : "#C8B195"} />
                    <circle cx="65" cy="175" r="4" fill={activeStep === 4 ? "var(--color-gold)" : "#C8B195"} />
                    <g transform="translate(68, 120)">
                      <circle r="12" fill={activeStep === 4 ? "var(--color-gold)" : "#E5DDC8"} />
                      <text textAnchor="middle" y="4" fill={activeStep === 4 ? "black" : "#666"} className="text-[10px] font-bold">
                        4
                      </text>
                    </g>
                  </g>
                </svg>
              )}

              {/* Side View */}
              {activeView === "side" && (
                <svg className="w-full h-full max-h-[360px]" viewBox="0 0 160 380" fill="none">
                  {/* Silhouette Side Path */}
                  <path
                    d="M60,60 C65,58 75,58 80,60 C85,63 87,67 87,70 C87,80 84,95 82,108 C80,121 93,135 93,148 C93,161 88,175 87,185 C86,195 88,210 88,225 C88,245 84,330 81,360 L71,360 C71,340 70,300 70,270 L65,220 L60,185 C57,175 52,160 52,148 C52,135 56,120 58,108 C60,95 56,80 57,70 C58,67 59,62 60,60 Z"
                    stroke="#E5DDC8"
                    strokeWidth="1.5"
                    fill="#FDFBF7"
                  />
                  {/* Head Side & Bun */}
                  <path
                    d="M74,60 C74,52 74,40 77,33 C80,31 82,31 84,31 C88,34 90,44 87,55"
                    stroke="#E5DDC8"
                    strokeWidth="1.5"
                  />
                  <circle cx="89" cy="40" r="7" stroke="#E5DDC8" strokeWidth="1.5" fill="#FDFBF7" />

                  {/* 5. Waist to Ankle Line */}
                  <g className="transition-all duration-500">
                    <line
                      x1="68"
                      y1="180"
                      x2="68"
                      y2="355"
                      stroke={activeStep === 5 ? "var(--color-gold)" : "#E5E1D8"}
                      strokeWidth={activeStep === 5 ? "3" : "1.5"}
                      strokeDasharray="4 4"
                    />
                    <circle cx="68" cy="180" r="4" fill={activeStep === 5 ? "var(--color-gold)" : "#C8B195"} />
                    <circle cx="68" cy="355" r="4" fill={activeStep === 5 ? "var(--color-gold)" : "#C8B195"} />
                    <g transform="translate(68, 260)">
                      <circle r="12" fill={activeStep === 5 ? "var(--color-gold)" : "#E5DDC8"} />
                      <text textAnchor="middle" y="4" fill={activeStep === 5 ? "black" : "#666"} className="text-[10px] font-bold">
                        5
                      </text>
                    </g>
                  </g>

                  {/* 6. Full Arm Length Line */}
                  <g className="transition-all duration-500">
                    {/* Line following arm side */}
                    <path
                      d="M84,80 L92,150 L84,230"
                      stroke={activeStep === 6 ? "var(--color-gold)" : "#E5E1D8"}
                      strokeWidth={activeStep === 6 ? "3" : "1.5"}
                      strokeDasharray="4 4"
                    />
                    <circle cx="84" cy="80" r="4" fill={activeStep === 6 ? "var(--color-gold)" : "#C8B195"} />
                    <circle cx="84" cy="230" r="4" fill={activeStep === 6 ? "var(--color-gold)" : "#C8B195"} />
                    <g transform="translate(90, 150)">
                      <circle r="12" fill={activeStep === 6 ? "var(--color-gold)" : "#E5DDC8"} />
                      <text textAnchor="middle" y="4" fill={activeStep === 6 ? "black" : "#666"} className="text-[10px] font-bold">
                        6
                      </text>
                    </g>
                  </g>
                </svg>
              )}
            </div>
          </div>

          {/* Steps List Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-500 flex gap-4 ${
                    activeStep === step.id
                      ? "bg-white border-[var(--color-gold)] shadow-lg translate-x-2"
                      : "bg-white/40 border-gray-100 hover:bg-white/70"
                  }`}
                >
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      activeStep === step.id
                        ? "bg-[var(--color-gold)] text-black"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.id}
                  </div>

                  {/* Step Description */}
                  <div className="flex-1 space-y-2">
                    <h3
                      className={`font-semibold text-base transition-colors duration-300 ${
                        activeStep === step.id ? "text-[var(--color-gold)]" : "text-[var(--color-black)]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    
                    {activeStep === step.id && (
                      <div className="space-y-3 mt-2 text-xs md:text-sm text-gray-600 leading-relaxed animate-fadeIn">
                        <p>{step.desc}</p>
                        
                        {/* Tip Box */}
                        <div className="bg-[var(--color-cream)] border-l-2 border-[var(--color-gold)] p-3 rounded-r-md flex gap-2.5 mt-2">
                          <Info size={16} className="text-[var(--color-gold)] shrink-0 mt-0.5" />
                          <p className="italic text-gray-500 text-[11px] md:text-xs">
                            <strong>Tip:</strong> {step.tip}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* General Advice Banner */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-md space-y-3">
              <div className="flex items-center gap-2.5 text-[var(--color-gold)] font-bold text-xs uppercase tracking-widest">
                <HelpCircle size={18} />
                <span>Measurement Guidelines</span>
              </div>
              <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1.5 leading-relaxed">
                <li>Please measure while standing straight and wearing light, thin clothing.</li>
                <li>Use a flexible tape measure (not a metal hardware tape).</li>
                <li>Keep the tape snug but not tight or pinching your body.</li>
                <li>For best results, we highly recommend having someone else assist you.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
