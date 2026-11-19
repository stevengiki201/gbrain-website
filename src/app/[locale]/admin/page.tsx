import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileCode2, GitBranch, Mail, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Content management",
  robots: { index: false, follow: false },
};

const tasks = [
  {
    icon: FileCode2,
    title: "Page content",
    description:
      "Translations live in src/messages/en.json and sw.json. Product and article content lives in src/content.",
  },
  {
    icon: GitBranch,
    title: "Publishing workflow",
    description:
      "Open a pull request, let CI run lint, typecheck, tests and build, then merge to main to deploy.",
  },
  {
    icon: Settings2,
    title: "Configuration",
    description:
      "Set NEXT_PUBLIC_SITE_URL and the Resend variables in the hosting environment. See .env.example.",
  },
  {
    icon: Mail,
    title: "Contact and support",
    description:
      "Contact submissions are delivered to CONTACT_TO_EMAIL when Resend is configured.",
  },
];

export default function AdminPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADMIN !== "true") {
    notFound();
  }

  return (
    <div className="py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-display-md text-foreground">
          Content management
        </h1>
        <p className="mt-4 text-body-lg text-muted-foreground">
          This overview explains where website content is stored and how changes
          reach production.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {tasks.map((task) => (
            <Card key={task.title}>
              <CardHeader>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <task.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="font-heading text-lg">
                  {task.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted-foreground">
                  {task.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
