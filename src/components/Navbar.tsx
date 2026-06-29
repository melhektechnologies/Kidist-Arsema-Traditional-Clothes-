"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-4 shadow-md border-b border-gray-100/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <Menu size={24} className={isScrolled ? "text-black" : "text-white"} />
          )}
        </button>

        {/* Desktop Links Left */}
        <nav className="hidden md:flex items-center gap-8 w-1/3">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "home")}
            className={`text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 ${
              isScrolled
                ? "text-black hover:text-[var(--color-gold)]"
                : "text-white/80 hover:text-white"
            }`}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, "about")}
            className={`text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 ${
              isScrolled
                ? "text-black hover:text-[var(--color-gold)]"
                : "text-white/80 hover:text-white"
            }`}
          >
            About
          </a>
        </nav>

        {/* Logo */}
        <Link
          href="#home"
          onClick={(e) => handleLinkClick(e, "home")}
          className="absolute left-1/2 -translate-x-1/2 text-center z-10"
        >
          <h1
            className={`font-heading text-xl md:text-2xl font-bold tracking-[0.3em] transition-colors duration-500 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            KIDIST ARSEMA
          </h1>
        </Link>

        {/* Desktop Links Right */}
        <nav className="hidden md:flex items-center justify-end gap-8 w-1/3">
          <a
            href="#collection"
            onClick={(e) => handleLinkClick(e, "collection")}
            className={`text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 ${
              isScrolled
                ? "text-black hover:text-[var(--color-gold)]"
                : "text-white/80 hover:text-white"
            }`}
          >
            Collection
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "contact")}
            className={`text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 ${
              isScrolled
                ? "text-black hover:text-[var(--color-gold)]"
                : "text-white/80 hover:text-white"
            }`}
          >
            Contact Us
          </a>
        </nav>

        {/* Mobile Spacer */}
        <div className="md:hidden w-10 h-10" />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl py-8 px-8 flex flex-col gap-6 md:hidden border-t border-gray-100"
          >
            <a
              href="#home"
              className="text-sm tracking-[0.25em] uppercase font-bold text-black hover:text-[var(--color-gold)] transition-colors py-2 border-b border-gray-50"
              onClick={(e) => handleLinkClick(e, "home")}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm tracking-[0.25em] uppercase font-bold text-black hover:text-[var(--color-gold)] transition-colors py-2 border-b border-gray-50"
              onClick={(e) => handleLinkClick(e, "about")}
            >
              About
            </a>
            <a
              href="#collection"
              className="text-sm tracking-[0.25em] uppercase font-bold text-black hover:text-[var(--color-gold)] transition-colors py-2 border-b border-gray-50"
              onClick={(e) => handleLinkClick(e, "collection")}
            >
              Collection
            </a>
            <a
              href="#contact"
              className="text-sm tracking-[0.25em] uppercase font-bold text-black hover:text-[var(--color-gold)] transition-colors py-2"
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              Contact Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
