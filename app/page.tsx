import type { Metadata } from "next";
import HomePageV3 from "@/components/HomePageV3";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — Architecture`,
  },
  description: site.statement,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomePageV3 />;
}
