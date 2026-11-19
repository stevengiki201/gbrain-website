import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type DocImagePlaceholderProps = {
  label: string;
  caption: string;
  placeholderLabel: string;
  hint: string;
  className?: string;
};

export function DocImagePlaceholder({
  label,
  caption,
  placeholderLabel,
  hint,
  className,
}: DocImagePlaceholderProps) {
  return (
    <figure className={cn("my-8", className)}>
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-muted/30">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex flex-col items-center gap-3 px-6 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-background text-muted-foreground">
            <ImageIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-medium text-foreground">
            {label}
          </span>
          <span className="rounded-full border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {placeholderLabel}
          </span>
          <span className="max-w-sm text-xs text-muted-foreground">{hint}</span>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
