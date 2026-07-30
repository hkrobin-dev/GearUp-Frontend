"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
      <AlertTriangle className="mb-4 h-10 w-10 text-red-500" />
      <h2 className="text-xl font-bold text-slate-900">Couldn&apos;t load this page</h2>
      <p className="mt-2 text-slate-500">{error.message || "Please try again."}</p>
      <Button className="mt-6" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
