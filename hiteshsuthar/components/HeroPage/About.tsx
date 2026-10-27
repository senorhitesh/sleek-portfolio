import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sent02Icon, Mail01Icon, Github } from "@hugeicons/core-free-icons";
import DesignLinkPreview from "./DesignLinkPreview";
const About = () => {
  return (
    <div className="w-full">
      <div className="relative text-neutral-600 dark:text-neutral-400 mx-auto w-full max-w-2xl mt-5">
        <h1 className="leading-5.5 sm:text-md md:text-md">
          yo, I’m Hitesh, an engineer based in India,
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">
            {" "}
            obsessed
          </span>{" "}
          in building{" "}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">
            scalable web
          </span>{" "}
          products, developer tools, and{" "}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">
            good design
          </span>
          .
        </h1>
        <p className="mt-2 leading-5.5 sm:text-md md:text-md">
          Outside of work, I love to watch anime and play chess.
        </p>
        <p className="mt-2 leading-5.5 sm:text-md md:text-md">
          You can reach me at{" "}
          <Link
            className="text-neutral-900   dark:text-neutral-100 font-medium hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            href="https://x.com/hiteshxdev"
            target="_blank"
          >
            @hiteshxdev
          </Link>{" "}
          and via{" "}
          <Link
            className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 font-medium hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors align-middle"
            href="mailto:senorhitesh@gmail.com"
            target="_blank"
          >
            <HugeiconsIcon icon={Mail01Icon} size={16} />
            <span>Email</span>
          </Link>{" "}
          or{" "}
          <Link
            className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 font-medium hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors align-middle"
            href="https://t.me/hiteshxdev"
            target="_blank"
          >
            <HugeiconsIcon icon={Sent02Icon} size={16} />
            <span>Telegram</span>
          </Link>
        </p>{" "}
        <p className="leading-5.5 sm:text-md md:text-md">
          See my <DesignLinkPreview /> and code on{" "}
          <Link
            className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 font-medium hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors align-middle"
            href="https://github.com/senorhitesh"
            target="_blank"
          >
            <HugeiconsIcon
              size={16}
              icon={Github}
              className="fill-neutral-900 dark:fill-white"
            />
            Github
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default About;
