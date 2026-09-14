import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <SiteHeader />

      <div className="not-found-top">
        <span>404 / Not found</span>
        <span>Architecture portfolio</span>
      </div>

      <div className="not-found-copy">
        <p>This space does not exist.</p>
        <h1>
          WRONG
          <br />
          TURN.
        </h1>
      </div>

      <div className="not-found-actions">
        <Link href="/" data-cursor-label="HOME">
          <ArrowLeft size={18} strokeWidth={1.2} />
          Return home
        </Link>

        <Link href="/projects" data-cursor-label="VIEW">
          View projects
          <ArrowUpRight size={18} strokeWidth={1.2} />
        </Link>
      </div>
    </main>
  );
}
