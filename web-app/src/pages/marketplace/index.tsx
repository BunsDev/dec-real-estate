import React from "react";
import { MarketplaceLayout } from "@/components/marketplace/layout/MarketplaceLayout";
import { Listing } from "@/components/marketplace/Listing";

const Marketplace = () => {
  return (
    <MarketplaceLayout>
      <Listing />
    </MarketplaceLayout>
  );
};

export default Marketplace;
