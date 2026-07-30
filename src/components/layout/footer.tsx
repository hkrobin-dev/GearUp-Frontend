import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Mountain className="h-5 w-5 text-emerald-600" />
            GearUp
          </div>
          <p className="text-sm text-slate-500">
            Rent Sports & Outdoor Gear Instantly. &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
