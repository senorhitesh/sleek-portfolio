"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import displayPicture from "@/public/profile.jpeg";
import { getCalApi } from "@calcom/embed-react";

const Profile = () => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const timeString = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(`IST ${timeString}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "quickchat" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div
      className="bg-transparent z-12 mt-7 w-full mx-auto max-w-2xl"
    >
      <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              style={{
                background:
                  "linear-gradient(45deg,#999 5%,#fff 10%,#ccc 30%,#ddd 50%,#ccc 70%,#fff 80%,#999 95%)",
              }}
              className="w-16 h-16 p-0.5 rounded-[14px] bg-neutral-200 dark:bg-neutral-800 active:scale-90 transition select-none relative overflow-hidden"
            >
              <div className="bg-white dark:bg-neutral-300 absolute h-full blur-lg w-2 profile-sweep left-4" />
              <Image
                src={displayPicture}
                loading="eager"
                alt="Hitesh Suthar"
                className="object-cover pointer-events-none rounded-[14px] w-full h-full"
              />
            </div>
          </div>
          <div>
            <p className="text-2xl font-Neue font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Hitesh Suthar
            </p>
            <p
              className="text-[13px] sm:text-[14px] text-neutral-500 dark:text-neutral-400 transition-opacity duration-300"
            >
              19 • Curios • Full-Stack Engineer
            </p>
          </div>
        </div>
        {/* Clock */}
        <span className="font-mono text-[11px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 px-2.5 py-1 rounded-full shrink-0">
          {currentTime}
        </span>
      </div>
    </div>
  );
};

export default Profile;
