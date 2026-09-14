import type { Metadata } from "next";
import "./globals.css";
import "./interaction.css";
import "./transitions.css";
import "./showcase.css";
import "./v3.css";
import "./brand.css";
import "./pages.css";
import "./case-study.css";
import "./mobile-motion.css";
import SmoothScroll from "@/components/SmoothScroll";
import ArchitectureCursor from "@/components/ArchitectureCursor";
import ProjectMotion from "@/components/ProjectMotion";
import { site } from "@/lib/site";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${site.name} — Architecture`,
    template: `%s — ${site.name}`,
  },
  description: site.statement,
  applicationName: site.name,
  category: "architecture",
  keywords: [
    "architecture",
    "interior architecture",
    "spatial design",
    "architecture studio",
    site.location,
  ],
  openGraph: {
    title: `${site.name} — Architecture`,
    description: site.statement,
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Architecture`,
    description: site.statement,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ArchitectureCursor />
        <ProjectMotion />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
