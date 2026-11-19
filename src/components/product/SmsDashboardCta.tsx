import Link from "next/link";
import { ExternalLink, MessageCircle, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function SmsDashboardCta() {
  const steps = [
    "Create a company account and sign in here.",
    "Run gbrain-cli sign-in on the PC that runs gbrain-sms.",
    "Enter the AudioLink pairing code in the phone app, then send SMS from this browser.",
  ];
  const icons = [MessageCircle, MonitorSmartphone, ExternalLink];

  return (
    <section className="bg-muted/30 py-20 sm:py-24" aria-labelledby="sms-dashboard-heading">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Remote SMS dashboard</p>
          <h2 id="sms-dashboard-heading" className="mb-4 font-heading text-display-md text-foreground">
            Manage GBrain SMS from anywhere
          </h2>
          <p className="mb-8 text-body-lg text-muted-foreground">
            Sign in with your GBrain account, connect each PC with gbrain-cli, and use the AudioLink phone pairing code to keep your SIM available from the browser.
          </p>
          <Button variant="brand" size="lg" asChild>
            <Link href="/dashboard/sms" className="inline-flex items-center gap-2">
              Open SMS dashboard
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Connect in three steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <div key={step} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="pt-2 text-sm leading-relaxed text-foreground">{step}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
