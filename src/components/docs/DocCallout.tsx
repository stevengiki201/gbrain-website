import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { DocCallout as Callout } from "@/content/docs";
import type { Locale } from "@/config/i18n";
import { cn } from "@/lib/utils";

const tones = {
  info: {
    icon: Info,
    wrapper: "border-sky-500/30 bg-sky-500/5",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  tip: {
    icon: Lightbulb,
    wrapper: "border-brand-500/30 bg-brand-500/5",
    iconColor: "text-brand-600 dark:text-brand-400",
  },
  warning: {
    icon: TriangleAlert,
    wrapper: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
} as const;

export function DocCallout({
  callout,
  locale,
}: {
  callout: Callout;
  locale: Locale;
}) {
  const tone = tones[callout.tone];
  const Icon = tone.icon;

  return (
    <aside
      className={cn("my-8 flex gap-3 rounded-2xl border p-5", tone.wrapper)}
    >
      <Icon
        className={cn("mt-0.5 h-5 w-5 shrink-0", tone.iconColor)}
        aria-hidden="true"
      />
      <div>
        <p className="font-heading text-sm font-semibold text-foreground">
          {callout.title[locale]}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {callout.body[locale]}
        </p>
      </div>
    </aside>
  );
}
