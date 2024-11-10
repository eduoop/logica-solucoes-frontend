import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { User } from "@/models/user.model";
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaPencilAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import EditRecordedUserDialog from "../EditRecordedUserDialog";
import { useState } from "react";

interface RecordedUserCardProps {
  variant?: "default" | "select";
  user: User;
  onClick: () => void;
  disableActions?: boolean | null;
  updateRecordedUser: (id: number, updatedData: Omit<User, "id" | "avatar">) => void
}

function RecordedUserCard({
  variant = "default",
  user,
  onClick,
  disableActions = false,
  updateRecordedUser
}: RecordedUserCardProps) {

  const [openEdit, setOpenEdit] = useState(false)

  const cardClasses = cn(
    "p-4 rounded-lg shadow-md w-full group relative transition-transform w-full sm:w-[200px] select-none",
    disableActions ? "cursor-default" : "cursor-pointer hover:scale-105",
    variant === "select"
      ? "bg-yellow-600 border-2 border-solid border-white"
      : "bg-white border-2 border-solid border-transparent",
  );

  const cardContent = (
    <AlertDialog onOpenChange={setOpenEdit} open={openEdit}>
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
            <BsFillBookmarkPlusFill
              size={20}
              className="absolute right-2 top-2 bg-transparent text-[#111827] transition-opacity hover:scale-110 group-hover:opacity-100 opacity-1 sm:opacity-0"
            />
          ) : (
            <BsFillBookmarkDashFill
              size={20}
              className="absolute right-2 top-2 bg-transparent text-[#111827] transition-opacity hover:scale-110 group-hover:opacity-100 opacity-1 sm:opacity-0"
            />
          ))}
        <AlertDialogTrigger asChild>
          <button
            className="absolute left-2 top-2 bg-transparent text-[#111827] opacity-1 sm:opacity-0 transition-opacity hover:scale-110 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FaPencilAlt size={18} />
          </button>
        </AlertDialogTrigger>
      </div>

      <EditRecordedUserDialog user={user} updateRecordedUser={updateRecordedUser} closeEdit={() => setOpenEdit(false)} />
    </AlertDialog>
  );

  return disableActions ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full sm:w-[200px]">{cardContent}</TooltipTrigger>
        <TooltipContent>Não é possível selecionar</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    cardContent
  );
}

export default RecordedUserCard;
