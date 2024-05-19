import React, { useEffect, useState } from "react";
import { MarketplaceLayout } from "@/components/marketplace/layout";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useInputValidation } from "@/hooks/useInputValidation";
import { getLocalProvider } from "@/utils/ethereum";
import { use } from "chai";
import { useLocalWeb3Provider } from "@/hooks/useLocalWeb3Provider";
import { useRealEstateTokenContract } from "@/hooks/useRealEstateTokenContract";

const CreateListing = () => {
  const tokenContract = useRealEstateTokenContract();
  //let listingNameValidation = useInputValidation([{}]);
  let listingValidation = useInputValidation([
    { rule: /^\d+(\.\d+)?$/g, errorMessage: "Please enter a valid number" },
  ]);

  return (
    <MarketplaceLayout>
      <div className="subpage-container">
        <h1 className="page-title">Create New Real Estate Listing</h1>
        <div className="listing-form-container">
          <div className="input-container">
            <Input label={"Listing Name"} />
          </div>
          <div className="input-container">
            <Textarea
              rows={10}
              variant="bordered"
              disableAutosize
              label={"Description"}
            />
          </div>
          <div className="input-container">
            <Input type="number" label={"Amount of Tokens"} />
          </div>
          <div className="input-container">
            <Input
              type="number"
              label={"Token Listing Price"}
              value={listingValidation.value}
              onChange={listingValidation.onChange}
              errorMessage={
                !listingValidation.isValid && listingValidation.errorMessage
              }
              isInvalid={!listingValidation.isValid}
              endContent={<p className="token-list-price-end-content">ETH</p>}
            />
          </div>
          <div className="input-container">
            <Button color="primary">Submit Listing</Button>
          </div>
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default CreateListing;
