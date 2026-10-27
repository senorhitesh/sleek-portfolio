export interface DesignItem {
  id: string;
  title: string;
  client: string;
  tag: string;
  image: string;
  width: number;
  height: number;
}

export const designItems: DesignItem[] = [
  {
    id: "hero-1",
    title: "Hero section",
    client: "tryhommy",
    tag: "REDESIGN",
    image: "/Designs/hero.png",
    width: 1280,
    height: 832,
  },
  {
    id: "hero-2",
    title: "Hero Section",
    client: "RIVA AI",
    tag: "REDESIGN",
    image: "/Designs/hero2.png",
    width: 1280,
    height: 832,
  },
  {
    id: "hero-3",
    title: "Hero section",
    client: "",
    tag: "DESIGN",
    image: "/Designs/hero3.png",
    width: 5760,
    height: 4096,
  },
  {
    id: "dashboard",
    title: "Landing Page",
    client: "",
    tag: "UI/UX",
    image: "/Designs/dashboard.png",
    width: 891,
    height: 815,
  },
  {
    id: "macbook",
    title: "Landing Page",
    client: "Abun",
    tag: "REDESIGN",
    image: "/Designs/MacBook Air - 9.png",
    width: 1305,
    height: 1684,
  },
  {
    id: "screen-1",
    title: "About Section",
    client: "",
    tag: "CONCEPT",
    image: "/Designs/Screenshot from 2026-10-27 00-13-07.png",
    width: 1344,
    height: 631,
  },
  {
    id: "screen-2",
    title: "Product interface",
    client: "studio",
    tag: "CONCEPT",
    image: "/Designs/Screenshot from 2026-10-27 00-14-48.png",
    width: 1346,
    height: 652,
  },
  {
    id: "screen-3",
    title: "Bento Cards",
    client: "",
    tag: "CONCEPT",
    image: "/Designs/Screenshot from 2026-10-27 00-15-23.png",
    width: 1227,
    height: 650,
  },
  {
    id: "design-canvas",
    title: "Design system sheet",
    client: "figma",
    tag: "SYSTEM",
    image: "/Designs/image 61.png",
    width: 10514,
    height: 5914,
  },
];
