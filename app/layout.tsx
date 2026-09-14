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
import "./premium.css";
import SmoothScroll from "@/components/SmoothScroll";
import ArchitectureCursor from "@/components/ArchitectureCursor";
import ProjectMotion from "@/components/ProjectMotion";
import { site } from "@/lib/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

const metadataBase = new URL(siteUrl);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: siteUrl,
  description: site.statement,
  areaServed: site.location,
  ...(site.email ? { email: site.email } : {}),
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.address
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressCountry: "PK",
        },
      }
    : {}),
  sameAs: [site.instagram, site.linkedin].filter(Boolean),
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ArchitectureCursor />
        <ProjectMotion />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
