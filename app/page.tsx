"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "./ui/navbar";

export default function Page() {
  const titleRef = useRef<HTMLHeadingElement>(null);

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
      <Navbar />
      {/* === HERO SECTION === */}
      <section className="relative min-h-screen px-6 md:px-16 py-16">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 hidden md:block">
          <Image
            src="/bryan.webp"
            alt="Luke Bryan supporting community"
            fill
            className="object-cover object-center md:object-[center_5%]" // Adjust focus if needed
            priority
          />
        </div>

        {/* Mobile Background */}
        <div className="absolute inset-0 -z-10 md:hidden block">
          <Image
            src="/bryan.webp"
            alt="Luke Bryan Mobile Banner"
            fill
            className="object-cover w-full h-screen"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#072a40] via-[#072a40]/10 to-transparent" /> */}

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row h-full items-center justify-center md:items-start md:justify-start px-6 md:px-24 py-14 md:py-18">
          <div className="max-w-2xl text-white z-10 text-center md:text-left">
            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
            >
              Opportunity Starts Here — Backed by Luke Bryan
            </h1>
            <p className="mt-6 text-lg text-gray-200 font-medium">
              Empowering the next generation of dreamers, workers, and
              changemakers — no matter where they come from.
            </p>
            <div className="mt-8 space-x-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-md border border-white px-6 py-3 text-white hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in"
              >
                Apply for Sponsorship <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === MISSION SECTION === */}
      <section className="h-full flex items-center justify-center px-6 md:px-24 text-white">
        <div className="grid grid-cols-1  md:grid-cols-2 gap-12 items-center text-[#79aeb2] max-w-7xl w-full">
          <div>
            <h2 className="text-3xl md:text-5xl py-20 font-extrabold ">
              A Mission Rooted in Heart
            </h2>
            <p className="text-lg font-medium">
              Inspired by his roots, Luke Bryan created this initiative to give
              back to the community — uplifting individuals who simply need a
              chance to shine.
            </p>
          </div>
          <div className="w-full ">
            <img
              src="/bry.png"
              alt="Luke Bryan supporting jobs"
              className="w-full h-screen object-cover"
            />
          </div>
        </div>
      </section>

      {/* === IMPACT SECTION === */}
      <section className="relative h-screen bg-[#79aeb2] flex items-center px-6 md:px-24 overflow-hidden">
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl w-full relative z-10">
          {/* Left Column - Main Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Opening Doors for the Underserved
            </h2>
            <p className="text-lg text-white font-medium">
              Whether you're starting fresh, re-entering the workforce, or
              chasing a long-time dream — this program is here to uplift you
              with tools, mentorship, and real job placements.
            </p>
          </div>

          {/* Right Column - Premium Card */}
          <div>
            <div className="bg-yellow-50 border px-6 py-14 rounded-lg flex items-center gap-6 shadow-md">
              <img
                src="/Card.jpg"
                alt="Gold Fan Card"
                className="w-24 h-auto rounded-md shadow-sm"
              />
              <div>
                <p className="text-md font-semibold text-yellow-800">
                  Get the Premium Fan Card!
                </p>
                <p className="text-sm text-yellow-700">
                  Unlock full access to exclusive job placement, mentorship
                  programs, and VIP events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TESTIMONIAL SECTION === */}
      <section className="relative bg-white py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Stories from the Heart
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Real voices. Real transformations. All made possible by a helping
            hand.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Jenna Mckoy",
              role: "Nursing Assistant, Georgia",
              image: "https://randomuser.me/api/portraits/women/66.jpg",
              quote:
                "Thanks to Luke's program, I was able to get certified and land my first job in healthcare. It changed my life.",
            },
            {
              name: "Tony Reed",
              role: "Construction Worker, Kentucky",
              image: "https://randomuser.me/api/portraits/men/55.jpg",
              quote:
                "Nobody had ever believed in me like this. Now I’m building homes for others — and hope for my own family.",
            },
            {
              name: "Jasmine Cole",
              role: "Software Trainee, Nashville",
              image: "https://randomuser.me/api/portraits/women/45.jpg",
              quote:
                "From a small town to the tech world — this program gave me access, education, and a second shot.",
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
