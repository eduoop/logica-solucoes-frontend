import { useLocation } from "react-router-dom";
import { Routes } from "../Navbar/routes";

const PageHeader = () => {
  const location = useLocation().pathname.split("/")[1];
  const matchedRoute = Routes.find((route) => route.pathname === location);

  return (
    <div className="flex w-full flex-wrap items-center justify-center sm:justify-start gap-2 laptop:gap-0">
      <h1 className="text-2xl sm:text-3xl font-semibold text-white">
        {matchedRoute ? matchedRoute.label : Routes[0].label}
      </h1>
    </div>
  );
};

export default PageHeader;
