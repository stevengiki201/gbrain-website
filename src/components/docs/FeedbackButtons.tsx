"use client";

import * as React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedbackButtonsProps = {
  title: string;
  yesLabel: string;
  noLabel: string;
  thanksLabel: string;
};

export function FeedbackButtons({
  title,
  yesLabel,
  noLabel,
  thanksLabel,
}: FeedbackButtonsProps) {
  const [answer, setAnswer] = React.useState<"yes" | "no" | null>(null);

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 rounded-2xl border bg-muted/30 px-5 py-4">
      <span className="mr-auto text-sm font-medium text-foreground">
        {title}
      </span>
      {answer ? (
        <span className="text-sm text-brand-600 dark:text-brand-400">
          {thanksLabel}
        </span>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setAnswer("yes")}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary",
            )}
          >
            <ThumbsUp className="h-4 w-4" aria-hidden="true" />
            {yesLabel}
          </button>
          <button
            type="button"
            onClick={() => setAnswer("no")}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
          >
            <ThumbsDown className="h-4 w-4" aria-hidden="true" />
            {noLabel}
          </button>
        </>
      )}
    </div>
  );
}
