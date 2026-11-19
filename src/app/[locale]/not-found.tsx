import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 font-heading text-display-md text-foreground">
        Page not found / Ukurasa haupatikani
      </h1>
      <p className="mt-4 max-w-md text-body-lg text-muted-foreground">
        The page you are looking for may have moved. / Ukurasa unaotafuta huenda
        ulihamishwa.
      </p>
      <Button variant="brand" size="lg" asChild className="mt-8">
        <Link href="/">GBrain Technologies</Link>
      </Button>
    </div>
  );
}
