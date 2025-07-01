// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlassIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0C2D48] text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png" // Replace with your actual logo file in /public
            alt="Vaco logo"
            width={40}
            height={40}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold">vaco</span>
            <span className="text-[10px] tracking-widest">BY HIGHSPRING</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-sm font-semibold">
          <Link href="#" className="hover:text-orange-400">Solutions and Services</Link>
          <Link href="#" className="hover:text-orange-400">Expertise</Link>
          <Link href="#" className="hover:text-orange-400">Careers</Link>
          <Link href="#" className="hover:text-orange-400">Client Success</Link>
          <Link href="#" className="hover:text-orange-400">Resources</Link>
          <Link href="#" className="hover:text-orange-400">About Us</Link>
        </div>

        {/* Right Icons and CTA */}
        <div className="flex items-center gap-4">
          <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer text-white" />
          <GlobeAltIcon className="w-5 h-5 cursor-pointer text-white" />
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
