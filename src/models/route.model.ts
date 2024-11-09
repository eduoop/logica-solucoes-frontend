import { IconType } from "react-icons/lib";

export type RoutePath = "/" | "recorded-users";

export interface Route {
  pathname: RoutePath;
  icon: IconType;
  label: string;
}