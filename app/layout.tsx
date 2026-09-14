import type { Metadata } from "next";
import "./globals.css";
import "./interaction.css";
import SmoothScroll from "@/components/SmoothScroll";
import ArchitectureCursor from "@/components/ArchitectureCursor";

export const metadata: Metadata = {
  title: "Architecture Studio — Selected Works",
  description:
    "A cinematic architecture portfolio focused on space, material, light and built work.",
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
