import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  const staticRoutes = ["", "/projects", "/studio", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: baseUrl + route,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: baseUrl + "/projects/" + project.slug,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
