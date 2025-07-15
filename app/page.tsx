"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Page() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const applicantId = "a3d2f7c0-68b0-4f9b-93cb-7d4a741f8eaa";

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col font-sans">
      {/* === HERO SECTION === */}
      <section className="relative min-h-screen px-6 md:px-16 py-16">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 hidden md:block">
          <Image
            src="/Vaco.webp"
            alt="Hero Background"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Mobile Background */}
        <div className="absolute inset-0 -z-10 md:hidden block">
          <Image
            src="/vaco_mobile.webp"
            alt="Hero Background"
            fill
            className="object-cover w-full h-screen"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#072a40] via-[#072942]/80 to-[#072a40]/40" />

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row h-full items-center md:items-start justify-center md:justify-start px-6 md:px-24 py-14 md:py-18">
          <div className="max-w-xl text-white z-10 text-center md:text-left">
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
            >
              Place talent at the center of your growth
            </h1>
            <p className="mt-6 text-lg text-gray-200 font-medium">
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
      </section>

      {/* === Section 2 === */}
      <section className="h-screen bg-[#072a40] flex items-center justify-center px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Find the people you need for the projects that matter
            </h2>
            <p className="text-lg text-white font-medium">
              Drive your initiatives forward with guidance from a nimble,
              relationship-based service that understands how to respond to
              unexpected changes.
            </p>
          </div>
          <div className="w-full">
            <video
              src="/Homepage.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* === Section 3 === */}
      <section className="relative h-screen bg-white flex items-center px-6 md:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-56 md:w-72 lg:w-[120vh] z-0">
          <img
            src="https://www.vaco.com/wp-content/uploads/2025/01/vaco-CTA-mobile-1-1024x599.webp"
            alt="Decorative Vaco Image"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Seize opportunities and thrive on change
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              Meet the demands of today’s rapidly evolving business world with
              flexible talent solutions that fit your needs.
            </p>
          </div>
          <div />
        </div>
      </section>

      <section className="relative bg-white py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What our candidates say
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Genuine stories from people we've helped thrive in new roles.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Olivia Daniels",
              role: "UX Designer, Atlanta",
              image: "https://randomuser.me/api/portraits/women/65.jpg",
              quote:
                "I never imagined finding a job could feel so personal. Vaco guided me every step of the way.",
            },
            {
              name: "James Morgan",
              role: "Financial Analyst, New York",
              image: "https://randomuser.me/api/portraits/men/43.jpg",
              quote:
                "Their support was professional, kind, and efficient. I felt valued and well-prepared.",
            },
            {
              name: "Sofia Reyes",
              role: "Project Manager, Dallas",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
              quote:
                "The transition into my new role was seamless. Vaco matched me with a perfect-fit company.",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">“{testimonial.quote}”</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
