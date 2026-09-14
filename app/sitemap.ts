import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/studio", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: "https://example.com" + route,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: "https://example.com/projects/" + project.slug,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
