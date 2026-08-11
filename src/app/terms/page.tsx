export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Last updated: 2026</p>

      <div className="mt-8 space-y-6 text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p className="mt-2">By creating an account or using GearUp, you agree to these Terms of Service.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">2. Accounts & Roles</h2>
          <p className="mt-2">Users register as either a Customer or a Provider. Providers are responsible for the accuracy of their gear listings, pricing, and availability.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">3. Rentals & Payments</h2>
          <p className="mt-2">All rental payments are processed through Stripe. Orders are confirmed once payment is completed. Cancellation and refund terms may vary by provider.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">4. Gear Condition & Liability</h2>
          <p className="mt-2">Customers are responsible for returning gear in the condition it was received, normal wear excepted. GearUp is not liable for injury or damage arising from use of rented equipment.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">5. Account Suspension</h2>
          <p className="mt-2">GearUp reserves the right to suspend accounts that violate these terms, engage in fraud, or misuse the platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">6. Changes to Terms</h2>
          <p className="mt-2">We may update these terms from time to time. Continued use of GearUp after changes constitutes acceptance.</p>
        </section>
      </div>
    </div>
  );
}