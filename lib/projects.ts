export type Project = {
  slug: string;
  number: string;
  title: string;
  location: string;
  year: string;
  type: string;
  area: string;
  status: string;
  image: string;
  gallery: string[];
  intro: string;
  concept: string;
};

export const projects: Project[] = [
  {
    slug: "courtyard-house",
    number: "01",
    title: "Courtyard House",
    location: "Quetta, Pakistan",
    year: "2026",
    type: "Residential",
    area: "5,200 ft²",
    status: "Design development",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88",
    ],
    intro:
      "A private home organised around a shaded internal court, using depth, filtered light and planted thresholds to create a calm centre within the city.",
    concept:
      "The courtyard is treated as an environmental room rather than leftover open space. Living areas borrow light and air from it while deep openings protect the interiors from glare and heat.",
  },
  {
    slug: "stone-residence",
    number: "02",
    title: "Stone Residence",
    location: "Islamabad, Pakistan",
    year: "2025",
    type: "Residential",
    area: "7,800 ft²",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2400&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600573472591-ee6c8e695481?auto=format&fit=crop&w=2200&q=88",
    ],
    intro:
      "A residence defined by weight, shadow and tactile material. Heavy masonry volumes frame long views while lighter glazed spaces open toward the landscape.",
    concept:
      "The project balances permanence with openness. Stone walls act as anchors, while courtyards and glazed cuts pull daylight deep into the plan and separate public from private life.",
  },
  {
    slug: "house-of-light",
    number: "03",
    title: "House of Light",
    location: "Karachi, Pakistan",
    year: "2025",
    type: "Residential",
    area: "4,900 ft²",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2400&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=88",
    ],
    intro:
      "A compact urban house shaped by controlled daylight, privacy and cross ventilation. Voids and screens transform intense sun into a softer interior atmosphere.",
    concept:
      "Rather than maximising glass, the design edits light through depth. Perforated surfaces, planted edges and double-height volumes create changing brightness through the day.",
  },
  {
    slug: "desert-pavilion",
    number: "04",
    title: "Desert Pavilion",
    location: "Balochistan, Pakistan",
    year: "2026",
    type: "Hospitality",
    area: "12,400 ft²",
    status: "Concept",
    image:
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=2400&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2200&q=88",
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2200&q=88",
    ],
    intro:
      "A low hospitality pavilion conceived as a sequence of shaded rooms embedded into an arid landscape, with framed horizons and protected outdoor living.",
    concept:
      "Roof planes extend beyond the enclosed rooms to create inhabited shade. Local material, thermal mass and carefully oriented openings reduce environmental load while strengthening the sense of place.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
