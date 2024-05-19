import React from "react";
import { testRealEstates } from "./constants";
import { RealEstateCard } from "./RealEstateCard";

export const Listing = () => {
  const renderRealEstateCards = () => {
    return testRealEstates.map((realEstate) => {
      return (
        <RealEstateCard
          title={realEstate.title}
          pricePerToken={realEstate.pricePerToken}
          tokenSupply={realEstate.tokenSupply}
          currentSupply={realEstate.currentSupply}
          onClick={() => {}}
          creator={realEstate.creator}
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
