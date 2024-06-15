import { MarketplaceLayout } from "@/components/marketplace/layout";
import { Listing } from "@/components/marketplace/Listing";
import { useMyAssetsQuery } from "@/queries";
import { useMetamaskWalletStore } from "@/stores";
import React from "react";

export default function MyAssets() {
  const wallet = useMetamaskWalletStore((state) => state);
  const myAssets = useMyAssetsQuery(wallet.address);

  return (
    <MarketplaceLayout>
      <Listing realEstates={myAssets.data} />
    </MarketplaceLayout>
  );
}
