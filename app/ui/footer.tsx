import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
       <img src="https://www.vaco.com/wp-content/uploads/2025/02/Vaco-logo-dark.svg" alt="" />
        {/* Navigation */}
        <div className="space-y-2">
          <h3 className="text-gray-800 font-medium">Navigation</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:text-gray-900 transition">Home</Link>
            </li>
            <li>
              <Link href="/apply" className="hover:text-gray-900 transition">Apply</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-900 transition">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-gray-800 font-medium">Contact</h3>
          <p>Email: <a href="mailto:hello@acmetalent.com" className="hover:text-gray-900">hello@acmetalent.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-gray-900">+1 (234) 567-890</a></p>
          <p>Location: Lagos, Nigeria</p>
        </div>
      </div>

      <div className="border-t border-gray-100 text-center text-xs text-gray-400 py-6">
        &copy; {new Date().getFullYear()} Acme Talent. All rights reserved.
      </div>
    </footer>
  );
}
