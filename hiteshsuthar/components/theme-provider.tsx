"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { playClickSound } from "@/lib/click-sound";

function ThemeShortcutListener() {
  const { resolvedTheme, setTheme } = useTheme();
  const themeRef = React.useRef(resolvedTheme);

  React.useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrMeta = event.ctrlKey || event.metaKey;
      if (
        isCtrlOrMeta &&
        !event.altKey &&
        !event.shiftKey &&
        (event.key.toLowerCase() === "d" || event.code === "KeyD")
      ) {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.isContentEditable ||
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT")
        ) {
          return;
        }

        event.preventDefault();
        const nextTheme = themeRef.current === "dark" ? "light" : "dark";
        playClickSound(nextTheme);
        setTheme(nextTheme);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeShortcutListener />
      {children}
    </NextThemesProvider>
  );
}
