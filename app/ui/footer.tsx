import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#79aeb2] text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Mission Statement */}
        <div className="space-y-4">
          <p className="text-white font-bold text-lg tracking-wide">Luke Bryan</p>
          <p className="text-white leading-relaxed">
            This initiative supports individuals from underserved communities with access to jobs, training, and mentorship — backed by Luke Bryan's belief in second chances and strong futures.
          </p>
        </div>

        {/* Program Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Our Programs</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white transition">
                Job Opportunities
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Mentorship
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Workforce Training
              </Link>
            </li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h3 className="text-white font-semibold mb-3">Get Involved</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white transition">
                Become a Partner
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Volunteer
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Connected</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white transition">
                Instagram
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Twitter/X
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#0F3A52] text-center text-xs text-gray-500 py-5">
        &copy; {new Date().getFullYear()} Luke Bryan Community Initiative. All rights reserved.
      </div>
    </footer>
  );
}
