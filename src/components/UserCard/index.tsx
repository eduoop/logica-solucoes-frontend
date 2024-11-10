import { cn } from "@/lib/utils";
import { User } from "@/models/user.model";
import { FaUser, FaEnvelope, FaPhoneAlt, FaBirthdayCake } from "react-icons/fa";
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface UserCardProps {
  variant?: "default" | "select";
  user: User;
  onClick: () => void;
  disableActions?: boolean | null;
}

function UserCard({
  variant = "default",
  user,
  onClick,
  disableActions = false,
}: UserCardProps) {
  const cardClasses = cn(
    "p-4 rounded-lg shadow-md w-[200px] group relative transition-transform w-full sm:w-[200px] select-none",
    disableActions ? "cursor-default" : "cursor-pointer hover:scale-105",
    variant === "select"
      ? "bg-yellow-600 border-2 border-solid border-white"
      : "bg-white border-2 border-solid border-transparent",
  );

  const cardContent = (
    <div
      className={cardClasses}
      onClick={!disableActions ? onClick : undefined}
    >
      <div className="flex w-full items-center justify-center">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="mb-4 h-16 w-16 rounded-md"
        />
      </div>
      <div className="truncate text-lg font-bold">
        {user.first_name} {user.last_name}
      </div>
      <div
        className={`flex items-center space-x-2 text-sm ${variant === "select" ? "text-white" : "text-gray-500"}`}
      >
        <FaUser />
        <span className="truncate">{user.username}</span>
      </div>
      <div
        className={`flex items-center space-x-2 text-sm ${variant === "select" ? "text-white" : "text-gray-500"}`}
      >
        <FaEnvelope />
        <span className="truncate">{user.email}</span>
      </div>
      <div
        className={`flex items-center space-x-2 text-sm ${variant === "select" ? "text-white" : "text-gray-500"}`}
      >
        <FaPhoneAlt />
        <span className="truncate">{user.phone_number}</span>
      </div>
      <div
        className={`flex items-center space-x-2 text-sm ${variant === "select" ? "text-white" : "text-gray-500"}`}
      >
        <FaBirthdayCake />
        <span className="truncate">
          {format(new Date(user.date_of_birth), "dd/MM/yyyy")}
        </span>
      </div>
      {!disableActions &&
        (variant === "select" ? (
          <BsFillBookmarkDashFill
            size={20}
            className="absolute right-2 top-2 bg-transparent text-[#111827] opacity-0 transition-opacity hover:scale-110 group-hover:opacity-100"
          />
        ) : (
          <BsFillBookmarkPlusFill
            size={20}
            className="absolute right-2 top-2 bg-transparent text-[#111827] opacity-0 transition-opacity hover:scale-110 group-hover:opacity-100"
          />
        ))}
    </div>
  );

  return disableActions ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{cardContent}</TooltipTrigger>
        <TooltipContent>Não é possível selecionar</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    cardContent
  );
}

export default UserCard;
