import Link from "next/link";
import { Mountain, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      {" "}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Mountain className="h-7 w-7 text-emerald-500" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">GearUp</h2>
            </div>

            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
              GearUp helps outdoor enthusiasts rent premium sports and adventure
              equipment with ease. Enjoy quality gear at affordable prices for
              every journey.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaXTwitter size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="transition hover:text-emerald-400">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/gear"
                  className="transition hover:text-emerald-400"
                >
                  Browse Gear
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition hover:text-emerald-400"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="transition hover:text-emerald-400"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Categories
            </h3>

            <ul className="space-y-3">
              <li>🏕 Camping Gear</li>
              <li>🥾 Hiking Equipment</li>
              <li>🚴 Cycling Gear</li>
              <li>🏄 Water Sports</li>
              <li>🎿 Winter Sports</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-emerald-500" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500" />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500" />
                <span>support@gearup.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} GearUp. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="transition hover:text-emerald-400">
              Privacy Policy
            </Link>

            <Link href="#" className="transition hover:text-emerald-400">
              Terms of Service
            </Link>

            <Link href="#" className="transition hover:text-emerald-400">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
