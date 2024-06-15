import React from "react";
import { testRealEstates } from "./constants";
import { RealEstateCard } from "./RealEstateCard";
import { ListingProps } from "./types";
import { RealEstate } from "@/utils/db/RealEstateCollection/types";

export const Listing = (props: ListingProps) => {
  const renderRealEstateCards = () => {
    if (!props.realEstates) return;
    return props.realEstates.map((realEstate: RealEstate) => {
      return (
        <RealEstateCard
          key={realEstate.title}
          title={realEstate.name}
          pricePerToken={realEstate.tokenPrice}
          tokenSupply={realEstate.totalTokenSUpply}
          currentSupply={realEstate.totalTokenSUpply}
          onClick={() => {}}
          creator={realEstate.creator.toString()}
        />
      );
    });
  };

  return (
    <div>
      <div>
        <h1 className="page-title">Real Estate Listing</h1>
      </div>
      <div className="real-estate-card-container">
        {renderRealEstateCards()}
      </div>
    </div>
  );
};
