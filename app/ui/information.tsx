"use client";

import Image from "next/image";
import Link from "next/link";
import OnboardingForm from "@/app/ui/onboarding-form";

export default function Information() {
  return (
    <main className="px-4 py-12 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Feature Card */}
        <div className="bg-white rounded-2xl p-8 md:col-span-1 flex flex-col justify-center shadow-md hover:shadow-lg transition min-h-[300px]">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
            Financial reality check: Are you prepared?
          </h2>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Many Americans are feeling unsure about the impact of economic
            conditions on their personal finances. We're here to help.
          </p>
        </div>

        {/* Right Column Cards */}
        <div className="md:col-span-2 space-y-6">
          {/* Card 1 */}
          <div className="flex bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative w-1/3 h-32">
              <Image
                src="/me.avif"
                alt="Banking products"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 w-2/3">
              <p className="text-xs text-gray-500 mb-1">Banking 101</p>
              <h3 className="font-semibold text-gray-900 text-base">
                Hidden gems: banking products you should be using
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative w-1/3 h-32">
              <Image
                src="/web.jpg"
                alt="Money personality"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 w-2/3">
              <p className="text-xs text-gray-500 mb-1">Budgeting</p>
              <h3 className="font-semibold text-gray-900 text-base">
                What's your money personality?
              </h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative w-1/3 h-32">
              <Image
                src="/article3.jpg"
                alt="BFF banker"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 w-2/3">
              <p className="text-xs text-gray-500 mb-1">Banking 101</p>
              <h3 className="font-semibold text-gray-900 text-base">
                Why you should be BFFs with your banker
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Community Benefits Agreement Section */}
      <section className="mt-16 bg-white rounded-2xl px-6 py-12 shadow-md max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Community Benefits Agreement
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-10">
          We’re committed to improving lives and helping communities thrive. Our support for lending and
          investments to low- and moderate-income clients and census tracts helps build paths for prosperity
          today, tomorrow and for the future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-blue-600 text-2xl font-bold">$2.4 billion</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              over five years in our local communities
            </p>
          </div>
          <div>
            <p className="text-blue-600 text-2xl font-bold">$1.075 billion</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              in community development lending & investments
            </p>
          </div>
          <div>
            <p className="text-blue-600 text-2xl font-bold">$18 million</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              in philanthropy donations
            </p>
          </div>
        </div>

        <div className="mt-8 space-x-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-md border border-white px-6 py-3 text-white hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in"
              >
               Agreement details
              </Link>
            </div>

       
      </section>
    </main>
  );
}
