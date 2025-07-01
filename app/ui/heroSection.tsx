// app/components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row min-h-screen overflow-hidden bg-gradient-to-r from-blue-900/90 to-blue-900/50">
      {/* Gradient overlay image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-people.jpg" // <-- replace with your image (e.g., /Screenshot-2025.png)
          alt="Smiling people"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/50"></div>
      </div>

      {/* Left content */}
      <div className="z-10 p-10 md:p-20 text-white md:w-1/2 flex items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Place talent at the <br /> center of your growth
          </h1>
          <p className="mt-6 text-lg text-gray-200">
            Empower your workforce. Build with the best.
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-block rounded-md bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Optional: right side spacing (image already covers entire bg) */}
      <div className="hidden md:block md:w-1/2"></div>
    </section>
  );
}
