import Link from "next/link";

const faqs = [
  {
    q: "How do I rent gear?",
    a: "Browse gear on the Gear page, pick your rental dates on the item's detail page, place the order, then complete payment via Stripe.",
  },
  {
    q: "How do I become a provider?",
    a: "Register with the \"List Gear\" option, or use the \"Become a Provider\" button on the homepage. You'll get access to a Provider Dashboard to add and manage gear.",
  },
  {
    q: "What payment methods are supported?",
    a: "All payments are securely processed through Stripe using credit or debit cards.",
  },
  {
    q: "How do I track my order?",
    a: "Go to Dashboard → My Orders to see the live status of every rental, from Placed to Returned.",
  },
  {
    q: "Can I cancel a rental order?",
    a: "Orders can be cancelled before they're confirmed by the provider. Contact the provider directly for cancellations after confirmation.",
  },
  {
    q: "How do I leave a review?",
    a: "Once your rental order status is \"Returned\", a review option appears on that order in your dashboard.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Help Center</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Answers to common questions about renting and listing gear on GearUp.
      </p>

      <div className="mt-8 space-y-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-900 dark:text-white">
              {item.q}
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-center text-slate-500 dark:text-slate-400">
        Still need help?{" "}
        <Link href="/contact" className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
          Contact us
        </Link>
      </p>
    </div>
  );
}