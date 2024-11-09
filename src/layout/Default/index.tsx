import AppBar from "@/components/AppBar";
import PageHeader from "@/components/PageHeader";
import { Outlet } from "react-router-dom";

export const Default = () => {
  return (
    <div className="block laptop:flex laptop:h-screen">
      <AppBar />
      <div className="w-full pb-2 pl-5 pr-5 pt-2 laptop:h-full laptop:overflow-y-scroll laptop:pr-5 laptop:pt-10 bg-[#030712] laptop:pl-8">
        <div className="mb-10 w-full">
          <PageHeader />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
