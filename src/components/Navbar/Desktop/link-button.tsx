import { Route } from "@/models";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LinkButtonProps {
  route: Route;
}

const LinkButton = ({ route }: LinkButtonProps) => {
  const currentLinkStyle =
    "flex items-center font-[400] text-white text-[16px] gap-2 bg-gray-200/10 p-2 rounded-xl";
  const linkStyle =
    "flex items-center font-[400] text-white text-[16px] gap-2 p-2 rounded-xl duration-200 hover:bg-gray-100/20 hover:opacity-80";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <NavLink
            className={({ isActive }) =>
              isActive ? currentLinkStyle : linkStyle
            }
            to={route.pathname}
          >
            {route.icon && <route.icon size={26} />}
            <span className="truncate">{route.label}</span>
          </NavLink>
        </TooltipTrigger>
        <TooltipContent>{route.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LinkButton;
