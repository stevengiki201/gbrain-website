"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-display-md text-foreground">
        Something went wrong / Hitilafu imetokea
      </h1>
      <p className="mt-4 max-w-md text-body-lg text-muted-foreground">
        Please try again or return to the home page. / Tafadhali jaribu tena au
        rudi kwenye ukurasa wa nyumbani.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="brand" size="lg" onClick={reset}>
          Try again / Jaribu tena
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">Home / Nyumbani</Link>
        </Button>
      </div>
    </div>
  );
}
