import { projectBackgrounds, projectImages } from "@/lib/assest/project";
import { StaticImageData } from "next/image";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiRender,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { BiLogoJavascript } from "react-icons/bi";
interface ProjectCardProps {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  isActive: boolean;
  backgroundImage: StaticImageData;
  projectImage: StaticImageData;
  link: string;
  video?: any;
  longDescription?: string;
  github?: string;
  stack: StackProp[]; // ← change from ReactNode[] to StackProp[]
  users?: string;
}
interface StackProp {
  icon: React.ReactNode;
  label: string;
}
export const Project: ProjectCardProps[] = [
  {
    id: 1,
    name: "GoatMCP",
    slug: "GoatMCP",
    type: "Directory",
    description:
      "A simple bookmark management tool that keeps all your favorite links organized in one place.",
    isActive: true,
    backgroundImage: projectBackgrounds.bg4,
    projectImage: projectImages.goatmcp,
    stack: [
      { icon: <RiNextjsFill size={18} />, label: "Next.js" },
      { icon: <SiTypescript size={18} color="#017ACB" />, label: "TypeScript" },
      { icon: <SiTailwindcss size={18} color="#06B6D4" />, label: "Tailwind" },
      {
        icon: <SiExpress size={18} color="#3fd600" />,
        label: "Express.js",
      },
    ],
    github: "https://github.com/senorhitesh",
    link: "https://bmarked.vercel.app/",
    video: "/Project/ProjectVideos/goatmcp.mp4",
  },
  {
    id: 11,
    name: "Bmarked",
    slug: "bmark",
    type: "Managment Tool",
    description:
      "GoatMCP is directory for finding  MCPs and Agent Skills and built in workflows for agents.",
    isActive: true,
    backgroundImage: projectBackgrounds.bg4,
    projectImage: projectImages.bmarked,
    stack: [
      { icon: <RiNextjsFill size={18} />, label: "Next.js" },
      { icon: <SiTypescript size={18} color="#017ACB" />, label: "TypeScript" },
      { icon: <SiTailwindcss size={18} color="#06B6D4" />, label: "Tailwind" },
      {
        icon: <SiNodedotjs size={18} color="#3fd600" />,
        label: "Node.js",
      },
      {
        icon: <SiExpress size={18} color="#3fd600" />,
        label: "Express.js",
      },
      {
        icon: <SiMongodb size={18} color="#3fd600" />,
        label: "MongoDB",
      },
      {
        icon: <SiRender size={18} color="#000000" />,
        label: "Render",
      },
    ],
    github: "https://github.com/senorhitesh",
    link: "https://bmarked.vercel.app/",
    video: "/Project/ProjectVideos/bmark.mp4",
  },
];
