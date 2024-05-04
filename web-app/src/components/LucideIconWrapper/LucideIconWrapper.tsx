import { LucideIcon } from "lucide-react";
import React, { useContext } from "react";
import { LucideIconWrapperProps } from "./types";
import { ThemeContext } from "@/contexts";

/**
 * @name LucideIconWrapper
 * @description A wrapper for Lucide icons that allows the easy handling changin color between light and dark mode
 * @param {React.ReactNode} icon - The Lucide icon to render
 * @param {string} color - The color of the icon
 * @param {number} size - The size of the icon
 */
export const LucideIconWrapper = ({
  Icon,
  color,
  size,
}: LucideIconWrapperProps) => {
  const themeContext = useContext(ThemeContext);

  return <Icon color={color[themeContext.theme]} size={size} />;
};
