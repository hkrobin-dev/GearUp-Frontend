export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Last updated: 2026</p>

      <div className="mt-8 space-y-6 text-slate-600 dark:text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">1. Information We Collect</h2>
          <p className="mt-2">We collect information you provide when registering, such as your name, email, and phone number, as well as gear listings, rental orders, and payment records processed through Stripe.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">2. How We Use Your Information</h2>
          <p className="mt-2">Your information is used to process rentals, facilitate payments, communicate order updates, and improve our platform. We do not sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">3. Payment Security</h2>
          <p className="mt-2">All payments are processed securely through Stripe. GearUp does not store your card details on our servers.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">4. Data Sharing</h2>
          <p className="mt-2">Gear providers can see your name and contact information only for orders you place with them, to coordinate pickup and return.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">5. Your Rights</h2>
          <p className="mt-2">You may request access to, correction of, or deletion of your personal data by contacting us through our Contact page.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">6. Contact</h2>
          <p className="mt-2">Questions about this policy can be sent to support@gearup.com.</p>
        </section>
      </div>
    </div>
  );
}