"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Mail } from "lucide-react";

export default function LocationMap() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            Find Us
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Visit Our Location
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Based in Dhaka, Bangladesh — serving customers and providers across the city.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]"
        >
          {/* Map embed */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg dark:border-slate-700">
            <iframe
              title="GearUp location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117085.68!2d90.3654!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjEnNTUuNCJF!5e0!3m2!1sen!2sbd!4v1700000000000"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full"
            />
          </div>

          {/* Info card */}
          <div className="flex flex-col justify-center gap-5 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Address</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Support Hours</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Sat – Thu, 9 AM – 6 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  support@gearup.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}