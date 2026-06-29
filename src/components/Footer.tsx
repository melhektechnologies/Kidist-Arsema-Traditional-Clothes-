"use client";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
    <footer className="bg-[var(--color-black)] text-[var(--color-cream)] pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-heading text-2xl font-bold tracking-[0.2em] mb-6">
              KIDIST ARSEMA
            </h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-xs">
              Where heritage becomes elegance... reaches the world stage. Crafting luxury traditional fashion for timeless identity.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-[var(--color-gold)] transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-[var(--color-gold)] transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[var(--color-gold)] transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold tracking-[0.25em] uppercase mb-6 text-xs text-[var(--color-gold)]">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, "home")} className="hover:text-white transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, "about")} className="hover:text-white transition-colors duration-300">About</a>
              </li>
              <li>
                <a href="#collection" onClick={(e) => handleLinkClick(e, "collection")} className="hover:text-white transition-colors duration-300">Collection</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")} className="hover:text-white transition-colors duration-300">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold tracking-[0.25em] uppercase mb-6 text-xs text-[var(--color-gold)]">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <span className="block text-gray-500 text-xs tracking-wider uppercase mb-1">Boutique Address</span>
                <span className="text-gray-300">Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li>
                <span className="block text-gray-500 text-xs tracking-wider uppercase mb-1">Call / WhatsApp</span>
                <span className="text-gray-300 font-semibold">+251 911 234 567</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold tracking-[0.25em] uppercase mb-6 text-xs text-[var(--color-gold)]">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive private updates and exclusive collection launches.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-gold)] focus:bg-white/10 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-[var(--color-gold)] text-black font-bold tracking-[0.2em] uppercase text-xs py-3 hover:bg-white hover:text-black transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kidist Arsema. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
