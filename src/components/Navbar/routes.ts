import { Route } from "@/models";
import { HiUsers } from "react-icons/hi2";
import { MdBookmarks  } from "react-icons/md";

export const Routes: Route[] = [
  {
    icon: HiUsers,
    pathname: "/",
    label: "Todos usuários",
  },
  {
    icon: MdBookmarks,
    pathname: "recorded-users",
    label: "Usuários gravados",
  },
];