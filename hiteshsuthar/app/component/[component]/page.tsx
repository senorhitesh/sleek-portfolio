import CopyButton from "@/components/CopyBtn";
import Footer from "@/components/Footer/Footer";
import PackageManagerCommand from "@/components/PackageManagerCommand";
import componentData from "@/data/components/data";
import { Cancel, ReactFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { notFound } from "next/navigation";
import Link from "next/link"
interface Props {
  params: Promise<{ component: string }>;
}
const page = async ({ params }: Props) => {
  const { component } = await params;
  const activePageComponent = componentData.find(
    (c) => c.fileName === component,
  );
  console.log("FOUND:", activePageComponent);
  if (!activePageComponent) {
    return notFound();
  }
  const Component = activePageComponent.component;
  return (
    <div className="max-w-2xl px-3 flex flex-col w-full mx-auto">
      <div className="flex items-center justify-between mt-30">
        <p className="font-semibold text-neutral-900 dark:text-neutral-100">{activePageComponent?.label}</p>
        <Link href="/component" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
          <HugeiconsIcon
            className="active:scale-75 transition-all"
            icon={Cancel}
          />
        </Link>
      </div>
      {/* Component Preview */}
      <div className="w-full overflow-hidden relative mt-4 bg-neutral-50 dark:bg-neutral-900/60 p-1 rounded-lg border grid border-neutral-200 dark:border-neutral-800 min-h-45">
        <div className="rounded-md w-full h-full border flex items-center justify-center border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <Component />
        </div>
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          Install the following dependencies
        </p>
        <PackageManagerCommand dependency={activePageComponent.dependency} />
      </div>
      {/* Code */}
      <div className="flex flex-col mt-8 gap-2">
        <p className="font-medium text-neutral-900 dark:text-neutral-100">Code</p>
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-8 p-1.5 w-full rounded-xl">
          <div className="flex justify-between mt-1">
            <p className="gap-1 text-neutral-500 dark:text-neutral-400 flex items-center">
              <HugeiconsIcon
                className="ml-1.5"
                icon={ReactFreeIcons}
                size={18}
              />
              <span>components/{activePageComponent.fileName}.tsx</span>
            </p>
            {/* Top Header */}
            <CopyButton code={activePageComponent.code} />
          </div>
          {/* Actual Code */}
          <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2 mt-2 w-full">
            <pre className="overflow-x-auto text-neutral-700 dark:text-neutral-300 text-sm leading-6">
              <code>{activePageComponent.code}</code>
            </pre>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default page;
