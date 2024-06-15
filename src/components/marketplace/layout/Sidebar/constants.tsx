import { Coins, Plus, Store } from "lucide-react";
// import { defaultIconColors } from "@/utils";
import { LucideIconWrapper } from "@/components/LucideIconWrapper/LucideIconWrapper";
import { LucideIconThemeColorT } from "@/components/LucideIconWrapper/types";
import { clientURLs } from "@/utils";

type SidebarLinkT = {
  title: string;
  href: string;
  icon(): React.ReactNode;
};

const sidebarIconSize = 24;

const sidebarItemsColors: LucideIconThemeColorT = {
  light: "#e3e4e8",
  dark: "#0070f0",
};

export const sidebarItems: SidebarLinkT[] = [
  {
    title: "Marketplace",
    href: clientURLs.marketplace,
    icon: () => (
      <LucideIconWrapper
        Icon={Store}
        size={sidebarIconSize}
        color={sidebarItemsColors}
      />
    ),
  },
  {
    title: "Create Listing",
    href: clientURLs.marketplace_createListing,
    icon: () => (
      <LucideIconWrapper
        Icon={Plus}
        size={sidebarIconSize}
        color={sidebarItemsColors}
      />
    ),
  },
  {
    title: "My Assets",
    href: clientURLs.marketplace_assets,
    icon: () => (
      <LucideIconWrapper
        Icon={Coins}
        size={sidebarIconSize}
        color={sidebarItemsColors}
      />
    ),
  },
];
