import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <Compass className="h-14 w-14 text-slate-300" />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">404</h1>
      <p className="mt-1 text-slate-500">
        We couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
