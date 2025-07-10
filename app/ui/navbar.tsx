"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MagnifyingGlassIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  

  return (
<header className="sticky top-0 z-50 bg-gradient-to-r from-[#072a40] via-[#072a40]/90 to-[#082A45] text-white shadow-md">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://www.vaco.com/wp-content/uploads/2025/02/Vaco-logo-light.svg"
            alt="Vaco logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-sm font-semibold items-center relative">
          {/* Hoverable Solutions and Services */}
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Link href="#" className="hover:text-orange-400">
              Solutions and Services
            </Link>

            {/* Dropdown */}
            {hovered && (
              <div className="absolute left-0 top-full mt-4 w-[960px] bg-white text-black shadow-2xl rounded-xl p-6 z-50 grid grid-cols-4 gap-6 text-sm">
                {/* Column 1 */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Solutions and Services</h3>
                  <p className="mt-2 text-gray-600">
                    Our holistic approach integrates with Highspring’s broader services, spanning
                    strategy, implementation, and talent.
                  </p>
                </div>

                {/* Column 2 */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Talent Solutions</h4>
                  <p className="text-gray-600">
                    Recruiting and strategic staffing services to strengthen your existing team or
                    build new capabilities
                  </p>
                  <Link
                    href="#"
                    className="text-orange-600 font-semibold mt-2 inline-block hover:underline"
                  >
                    Learn more ↗
                  </Link>
                </div>

                {/* Column 3 */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">Consulting</h4>
                  <p className="text-gray-600">
                    Advice, expertise, and capability to move your business initiatives forward with
                    confidence
                  </p>
                  <Link
                    href="#"
                    className="text-orange-600 font-semibold mt-2 inline-block hover:underline"
                  >
                    Learn more ↗
                  </Link>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-slate-900">Managed Services</h4>
                    <p className="text-gray-600">
                      Outsourcing for critical business operations so your team can focus on what
                      they do best
                    </p>
                  </div>
                </div>

                {/* Column 4 */}
                <div className="flex flex-col justify-between">
                  <img
                    src="/highspring-index.png"
                    alt="White Paper"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <span className="bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full mt-3 inline-block w-max">
                    WHITE PAPER
                  </span>
                  <p className="text-slate-900 font-semibold mt-1">Highspring Agility Index</p>
                  <Link
                    href="#"
                    className="text-orange-600 font-semibold mt-2 flex items-center gap-1 hover:underline"
                  >
                    Read more ↗
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Other nav items */}
          <Link href="#" className="hover:text-orange-400">
            Expertise
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Careers
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Client Success
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Resources
          </Link>
          <Link href="#" className="hover:text-orange-400">
            About Us
          </Link>
        </div>

        {/* Icons and CTA */}
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
