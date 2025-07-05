"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import Information from "@/app/ui/information";

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

export default function Page() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        duration: 3,
        scrambleText: {
          text: "Place talent at the center of your growth",
          chars: "upperAndLowerCase",
          revealDelay: 0.1,
          speed: 0.4,
        },
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="relative flex-grow">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/Vaco.webp"
            alt="Hero Background"
            fill
            className="object-cover w-full h-screen"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/*  Mobile View */}
        <div className="absolute inset-0 -z-10 md:hidden block">
          <Image
            src="/vaco_mobile.webp"
            alt="Hero Background"
            fill
            className="object-contain w-full h-screen"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row h-full items-center md:items-start justify-center md:justify-start px-6 md:px-24 py-20">
          <div className="text-white max-w-xl md:max-w-md z-10">
            <h1
              ref={titleRef}
              className={`${lusitana.className} text-4xl md:text-6xl font-bold leading-tight`}
            >
              {/* This will be replaced via GSAP */}
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Empower your workforce. Build with the best.
            </p>

            <div className="mt-8 space-x-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-md border border-white px-6 py-3 text-white hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in"
              >
                Apply Now <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
        </div>

        
      </div>
      <Information />
    </main>
  );
}
