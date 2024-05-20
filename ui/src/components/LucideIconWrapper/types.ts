import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type LucideIconWrapperProps = {
  Icon: LucideIcon;
  color: LucideIconThemeColorT;
  size: number;
};

export type LucideIconThemeColorT = {
  light: string;
  dark: string;
};
