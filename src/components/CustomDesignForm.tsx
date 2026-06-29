"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, X, Check, Loader2, ChevronDown, ChevronUp, Ruler } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CustomDesignForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [vision, setVision] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Measurement States
  const [isMeasurementsOpen, setIsMeasurementsOpen] = useState(false);
  const [measureUnit, setMeasureUnit] = useState<"cm" | "in">("cm");
  const [measureShoulder, setMeasureShoulder] = useState("");
  const [measureBust, setMeasureBust] = useState("");
  const [measureWaist, setMeasureWaist] = useState("");
  const [measureShoulderToWaist, setMeasureShoulderToWaist] = useState("");
  const [measureWaistToAnkle, setMeasureWaistToAnkle] = useState("");
  const [measureArmLength, setMeasureArmLength] = useState("");

  // Status States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // File drag & drop states
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Listen to collection pre-select clicks
    const handlePreselect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setOccasion(customEvent.detail);
      }
    };

    window.addEventListener("preselect-collection", handlePreselect);

    // GSAP Entrance
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

    return () => {
      window.removeEventListener("preselect-collection", handlePreselect);
      ctx.revert();
    };
  }, []);

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Clear image error if set
      if (errors.image) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.image;
          return next;
        });
      }
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
  };

  const handleScrollToGuide = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("measurements");
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!imageFile) newErrors.image = "An inspirational photo or image is required";
    if (!occasion) newErrors.occasion = "Please select or describe the event/occasion";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate luxury submission animation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form states
      setFullName("");
      setEmail("");
      setPhone("");
      setOccasion("");
      setVision("");
      setImageFile(null);
      setImagePreview(null);
      
      // Reset measurements
      setMeasureShoulder("");
      setMeasureBust("");
      setMeasureWaist("");
      setMeasureShoulderToWaist("");
      setMeasureWaistToAnkle("");
      setMeasureArmLength("");
      setIsMeasurementsOpen(false);
    }, 2500);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 md:py-36 bg-[var(--color-black)] text-[var(--color-cream)] relative overflow-hidden"
    >
      {/* Decorative luxury gradient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-gold)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-brown)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-xs font-bold">
            Tailor-Made Luxury
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            Your Vision, Our Craft
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
            Collaborate directly with our master designers to craft a bespoke couture garment that honors heritage and expresses your unique elegance.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl">
          {isSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-[var(--color-gold)]/20 border border-[var(--color-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-[var(--color-gold)]" size={36} />
              </div>
              <h3 className="font-heading text-3xl text-white font-medium">Request Received</h3>
              <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                Thank you for sharing your vision with us. Our head designer is reviewing your request and will contact you directly on phone/WhatsApp within 24 hours.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-8 py-3 bg-[var(--color-gold)] text-black text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-300 rounded-md"
              >
                Book Another Consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-[0.2em] text-gray-300 font-bold">
                    Full Name <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    placeholder="Enter your full name"
                    className={`w-full bg-white/5 border ${
                      errors.fullName ? "border-red-500" : "border-white/10"
                    } px-5 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] focus:bg-white/10 transition-all duration-300 rounded-md`}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-xs uppercase tracking-[0.2em] text-gray-300 font-bold">
                    Phone Number <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="e.g. +251 911 234 567"
                    className={`w-full bg-white/5 border ${
                      errors.phone ? "border-red-500" : "border-white/10"
                    } px-5 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] focus:bg-white/10 transition-all duration-300 rounded-md`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email (Optional) */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
                    Email Address <span className="text-gray-500 text-[10px] tracking-wide normal-case">(Optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@luxury.com"
                    className="w-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] focus:bg-white/10 transition-all duration-300 rounded-md"
                  />
                </div>

                {/* Event / Occasion */}
                <div className="space-y-2">
                  <label htmlFor="occasion" className="block text-xs uppercase tracking-[0.2em] text-gray-300 font-bold">
                    Event / Occasion <span className="text-[var(--color-gold)]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="occasion"
                      value={occasion}
                      onChange={(e) => {
                        setOccasion(e.target.value);
                        if (errors.occasion) setErrors((prev) => ({ ...prev, occasion: "" }));
                      }}
                      className={`w-full bg-black border ${
                        errors.occasion ? "border-red-500" : "border-white/10"
                      } px-5 py-3 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] transition-all duration-300 rounded-md appearance-none`}
                    >
                      <option value="" disabled className="text-gray-500">Select collection category or occasion</option>
                      <option value="Women's Collection">Women's Habesha Couture</option>
                      <option value="Mens' Collection">Men's Traditional Couture</option>
                      <option value="Wedding Gold Edition">Wedding Gold Edition</option>
                      <option value="Special Custom Event">Special Event / Anniversary</option>
                      <option value="Other Boutique Design">Other / Creative Collaboration</option>
                    </select>
                  </div>
                  {errors.occasion && <p className="text-red-400 text-xs mt-1">{errors.occasion}</p>}
                </div>
              </div>

              {/* Photo / Image Upload (Mandatory) */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] text-gray-300 font-bold">
                  Inspirational Photo / Image <span className="text-[var(--color-gold)]">*</span>
                </label>
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className={`w-full border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[180px] ${
                    isDragging
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10"
                      : errors.image
                      ? "border-red-500 bg-red-500/5 hover:bg-red-500/10"
                      : "border-white/20 bg-white/0 hover:border-[var(--color-gold)] hover:bg-white/5"
                  }`}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageChange(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative w-full flex flex-col items-center space-y-4">
                      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border border-white/20 shadow-xl">
                        <Image
                          src={imagePreview}
                          alt="Bespoke Inspiration Preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full transition-colors duration-300 shadow-md"
                          aria-label="Remove Image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400">
                        {imageFile?.name} ({(((imageFile?.size || 0) / (1024 * 1024))).toFixed(2)} MB)
                      </p>
                    </div>
                  ) : (
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-2 group-hover:border-[var(--color-gold)] transition-colors duration-300">
                        <Upload className="text-[var(--color-gold)]" size={20} />
                      </div>
                      <p className="text-sm font-semibold text-gray-300">
                        Drag & drop your inspiration image, or <span className="text-[var(--color-gold)]">browse files</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports JPEG, PNG, or WEBP up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
              </div>

              {/* Collapsible Sizing / Measurement Guide Accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsMeasurementsOpen(!isMeasurementsOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Ruler className="text-[var(--color-gold)]" size={18} />
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-200">
                      Add Your Body Measurements (Optional)
                    </span>
                  </div>
                  {isMeasurementsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isMeasurementsOpen && (
                  <div className="p-6 md:p-8 bg-white/[0.02] border-t border-white/10 space-y-6">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-400 max-w-md">
                        Providing measurements guarantees a tailored fit. If you don't know your size, click the link to view our interactive measuring guide.
                      </p>
                      {/* Unit Selector Toggle */}
                      <div className="flex rounded-md overflow-hidden border border-white/10">
                        <button
                          type="button"
                          onClick={() => setMeasureUnit("cm")}
                          className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                            measureUnit === "cm"
                              ? "bg-[var(--color-gold)] text-black"
                              : "bg-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          cm
                        </button>
                        <button
                          type="button"
                          onClick={() => setMeasureUnit("in")}
                          className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                            measureUnit === "in"
                              ? "bg-[var(--color-gold)] text-black"
                              : "bg-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          inches
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {/* 1. Shoulder to Shoulder */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400">
                          1. Shoulder to Shoulder
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={measureShoulder}
                            onChange={(e) => setMeasureShoulder(e.target.value)}
                            placeholder="e.g. 40"
                            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] rounded-md"
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-gray-500">{measureUnit}</span>
                        </div>
                      </div>

                      {/* 2. Full Bust */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400">
                          2. Full Bust
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={measureBust}
                            onChange={(e) => setMeasureBust(e.target.value)}
                            placeholder="e.g. 90"
                            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] rounded-md"
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-gray-500">{measureUnit}</span>
                        </div>
                      </div>

                      {/* 3. Waist Size */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400">
                          3. Waist Size
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={measureWaist}
                            onChange={(e) => setMeasureWaist(e.target.value)}
                            placeholder="e.g. 72"
                            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] rounded-md"
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-gray-500">{measureUnit}</span>
                        </div>
                      </div>

                      {/* 4. Shoulder to Waist */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400">
                          4. Shoulder to Waist
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={measureShoulderToWaist}
                            onChange={(e) => setMeasureShoulderToWaist(e.target.value)}
                            placeholder="e.g. 43"
                            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] rounded-md"
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-gray-500">{measureUnit}</span>
                        </div>
                      </div>

                      {/* 5. Waist to Ankle */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400">
                          5. Waist to Ankle
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={measureWaistToAnkle}
                            onChange={(e) => setMeasureWaistToAnkle(e.target.value)}
                            placeholder="e.g. 100"
                            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] rounded-md"
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-gray-500">{measureUnit}</span>
                        </div>
                      </div>

                      {/* 6. Full Arm Length */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400">
                          6. Full Arm Length
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={measureArmLength}
                            onChange={(e) => setMeasureArmLength(e.target.value)}
                            placeholder="e.g. 58"
                            className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] rounded-md"
                          />
                          <span className="absolute right-3 top-2.5 text-[10px] text-gray-500">{measureUnit}</span>
                        </div>
                      </div>
                    </div>

                    {/* How to Measure Scroll Helper */}
                    <div className="pt-2 text-right">
                      <a
                        href="#measurements"
                        onClick={handleScrollToGuide}
                        className="inline-flex items-center gap-1.5 text-xs text-[var(--color-gold)] hover:text-white transition-colors duration-300 font-bold uppercase tracking-wider"
                      >
                        <Ruler size={12} />
                        <span>How to Measure? View Interactive Guide</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Describe Vision (Optional) */}
              <div className="space-y-2">
                <label htmlFor="vision" className="block text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
                  Describe Your Vision <span className="text-gray-500 text-[10px] tracking-wide normal-case">(Optional)</span>
                </label>
                <textarea
                  id="vision"
                  rows={4}
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder="Share details about fabrics, embroidery styles, fit, color palettes, or any custom concepts you'd like to integrate..."
                  className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm text-white focus:outline-none focus:border-[var(--color-gold)] focus:bg-white/10 transition-all duration-300 rounded-md resize-none"
                />
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-gold)] text-black font-bold uppercase text-xs tracking-[0.25em] py-4 hover:bg-white hover:text-black disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 rounded-md cursor-pointer shadow-lg hover:shadow-xl shadow-[var(--color-gold)]/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin text-black" size={16} />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <span>Send Request</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
