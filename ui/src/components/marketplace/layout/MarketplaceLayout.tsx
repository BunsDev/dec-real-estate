import React, { ReactNode } from "react";
import { MarketplaceSidebar } from "./Sidebar";

export interface MarketplaceLayoutProps {
  children: ReactNode;
}

export const MarketplaceLayout = ({ children }: MarketplaceLayoutProps) => {
  return (
    <div className="marketplace-layout-container">
      <MarketplaceSidebar />
      <div className="layout-main-content">{children}</div>
    </div>
  );
};
