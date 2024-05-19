import React from "react";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { sidebarItems } from "./constants";

export const MarketplaceSidebar = () => {
  const router = useRouter();

  const linkClickHandler = (href: string) => {
    router.push(href);
  };

  return (
    <div className="sidebar-container">
      {sidebarItems.map((item, index) => (
        <div
          key={item.href}
          onClick={() => linkClickHandler(item.href)}
          className="sidebar-item-container"
        >
          {item.icon()}
          <Link href={item.href} className="sidebar-text">
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};
