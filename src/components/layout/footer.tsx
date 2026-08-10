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
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-white"
            >
              <Mountain className="h-6 w-6 text-emerald-500" />
              GearUp
            </Link>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              GearUp helps outdoor enthusiasts rent premium sports and
              adventure equipment with ease. Enjoy quality gear at affordable
              prices for every journey.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500 hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500 hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500 hover:text-white"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-emerald-500 hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-emerald-400"
                >
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
                  href="/about"
                  className="transition hover:text-emerald-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-emerald-400"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/login"
                  className="transition hover:text-emerald-400"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/register"
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

            <ul className="space-y-3 text-sm text-slate-400">
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

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-emerald-500" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <a
                href="tel:+8801234567890"
                className="flex items-center gap-3 transition hover:text-emerald-400"
              >
                <Phone className="h-5 w-5 shrink-0 text-emerald-500" />
                <span>+880 1234-567890</span>
              </a>

              <a
                href="mailto:support@gearup.com"
                className="flex items-center gap-3 transition hover:text-emerald-400"
              >
                <Mail className="h-5 w-5 shrink-0 text-emerald-500" />
                <span>support@gearup.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} GearUp. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              href="/about"
              className="transition hover:text-emerald-400"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-emerald-400"
            >
              Contact
            </Link>

            <Link
              href="/gear"
              className="transition hover:text-emerald-400"
            >
              Browse Gear
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}