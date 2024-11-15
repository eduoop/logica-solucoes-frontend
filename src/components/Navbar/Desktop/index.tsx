import { Routes } from "../routes";
import LinkButton from "./link-button";

export function Desktop() {
  return (
    <div className="hidden h-screen w-[220px] flex-col justify-between border-r-[1px] border-solid border-[#1C1C1C1A] bg-[#111827] px-4 pb-7 pt-16 laptop:flex">
      <div className="flex flex-col gap-4">
        {Routes.map((route) => (
          <LinkButton key={route.pathname} route={route} />
        ))}
      </div>
    </div>
  );
}

export default Desktop;