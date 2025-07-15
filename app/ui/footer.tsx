import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#05273D] text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div className="space-y-4">
          <Image
            src="https://www.vaco.com/wp-content/uploads/2025/02/Vaco-logo-light.svg"
            alt="Vaco Logo"
            width={120}
            height={30}
            className=""
          />
          <p className="text-gray-400 leading-relaxed">
            Vaco is the talent solutions division of Highspring, a leading global professional services organization. Vaco focuses on Contract Staffing and Direct Hire solutions.
          </p>
        </div>

        {/* Solutions and Services */}
        <div>
          <h3 className="text-white font-semibold mb-3">Solutions and Services</h3>
          <ul className="space-y-2">
            <li>Consulting</li>
            <li>Managed Services</li>
            <li>Talent Solutions</li>
            <li className="text-gray-400">Direct Hire</li>
            <li className="text-gray-400">Contract Staffing</li>
          </ul>
        </div>

        {/* Expertise */}
        <div>
          <h3 className="text-white font-semibold mb-3">Expertise</h3>
          <ul className="space-y-2">
            <li>Technology and Digital</li>
            <li>HR and Operations</li>
            <li>Finance and Accounting</li>
          </ul>
        </div>

        {/* Resource Center */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resource Center</h3>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>Newsroom</li>
            <li>White Papers</li>
            <li>Case Studies</li>
            <li>Events</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#0F3A52] text-center text-xs text-gray-500 py-5">
        &copy; {new Date().getFullYear()} Vaco by Highspring. All rights reserved.
      </div>
    </footer>
  );
}
