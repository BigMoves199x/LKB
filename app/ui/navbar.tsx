"use client";

import Link from "next/link";
import {
  MagnifyingGlassIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Blurred glass background */}
      <div className="absolute inset-0 pointer-events-none" />

      <nav className="relative mx-auto max-w-7xl flex items-center justify-between px-6 py-5 md:py-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-2xl tracking-wide"
        >
          L.B
        </Link>

        {/* Right Side: Icons + CTA */}
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon className="w-5 h-5 text-white cursor-pointer hover:text-orange-300 transition-colors" />
          <GlobeAltIcon className="w-5 h-5 text-white cursor-pointer hover:text-orange-300 transition-colors" />
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 transition px-4 py-2 text-sm font-semibold rounded-md text-white"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
