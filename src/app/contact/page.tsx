"use client";

import { FormEvent, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useCreateContactMessage } from "@/lib/api/contact";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createContactMessage = useCreateContactMessage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Name validation
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Subject validation
    if (subject.length < 3) {
      toast.error("Subject must be at least 3 characters.");
      return;
    }

    // Message validation
    if (message.length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createContactMessage.mutateAsync({
        name,
        email,
        subject,
        message,
      });

      toast.success("Message sent successfully!");

      form.reset();
    } catch (err: unknown) {
      const error = err as {
        message?: string;
      };

      toast.error(
        error.message || "Failed to send message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* Animated background */}
        <div className="absolute -left-24 -top-24 h-72 w-72 animate-pulse rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="absolute -right-24 top-10 h-72 w-72 animate-pulse rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm transition-transform duration-500 hover:scale-110 dark:bg-emerald-950 dark:text-emerald-400">
            <MessageCircle className="h-7 w-7" />
          </div>

          {/* Badge */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Get in touch
          </p>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Let&apos;s talk about your next adventure
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Have a question about renting gear, placing an order, or becoming
            a provider? Send us a message and our team will get back to you.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* =================================================
              CONTACT INFORMATION
          ================================================== */}
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Contact information
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                We&apos;re here to help
              </h2>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                Reach out through any of the channels below and we&apos;ll help
                you get the most out of GearUp.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <ContactCard
                icon={Mail}
                title="Email"
                value="support@gearup.com"
                description="Send us an email anytime"
              />

              <ContactCard
                icon={Phone}
                title="Phone"
                value="+880 1234-567890"
                description="Available during business hours"
              />

              <ContactCard
                icon={MapPin}
                title="Location"
                value="Dhaka, Bangladesh"
                description="Our GearUp team"
              />

              <ContactCard
                icon={Clock}
                title="Support hours"
                value="Sat – Thu, 9 AM – 6 PM"
                description="Bangladesh Standard Time"
              />
            </div>
          </div>

          {/* =================================================
              CONTACT FORM
          ================================================== */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Send us a message
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Fill out the form and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  id="name"
                  label="Name"
                  placeholder="Your name"
                  required
                />

                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Subject */}
              <FormField
                id="subject"
                label="Subject"
                placeholder="How can we help?"
                required
              />

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  minLength={10}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   CONTACT CARD
============================================================ */

function ContactCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-950 dark:text-emerald-400">
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <p className="mt-1 break-words font-semibold text-slate-900 dark:text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
      />
    </div>
  );
}