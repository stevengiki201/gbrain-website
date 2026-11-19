import {
  BrainCircuit,
  GraduationCap,
  MessageSquareText,
  Music2,
  Smartphone,
} from "lucide-react";
import type { ProductKey } from "@/content/docs";

export const docIcons = {
  media: Music2,
  sms: MessageSquareText,
  phonelink: Smartphone,
  neural: BrainCircuit,
  shulebomba: GraduationCap,
} as const satisfies Record<
  ProductKey,
  React.ComponentType<{ className?: string }>
>;
