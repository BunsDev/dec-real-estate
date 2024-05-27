import { MarketplaceLayout } from "@/components/marketplace/layout";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useInputValidation } from "@/hooks/useInputValidation";
import { useRealEstateTokenContract } from "@/hooks/useRealEstateTokenContract";
import { useEffect, useState } from "react";
import { Contract, JsonRpcSigner } from "ethers";
import { useAbiQuery } from "@/hooks/useRealEstateTokenContract/query";
import { createToken, getLocalProvider } from "@/utils/ethereum";
import { BaseContract } from "ethers";
import { useMetamaskWalletStore } from "@/stores";
import axios from "axios";
import { serverURLs } from "@/utils";
import { RealEstate } from "@/utils/db/RealEstateCollection/types";

const CreateListing = () => {
  const abi = useAbiQuery("RealEstateToken");
  const wallet = useMetamaskWalletStore((state) => state);

  const listingNameValidation = useInputValidation([
    {
      rule: /^.+$/,
      errorMessage: "Listing name cannot be empty",
    },
  ]);

  const descriptionValidation = useInputValidation([
    { rule: /^.+$/, errorMessage: "Description cannot be empty" },
  ]);

  const listingPriceValidation = useInputValidation([
    { rule: /^\d+(\.\d+)?$/g, errorMessage: "Please enter a valid number" },
  ]);

  let tokenAmountValidation = useInputValidation([
    {
      rule: /^[1-9]\d*$/,
      errorMessage: "Please enter a valid number",
    },
  ]);

  const createListingHandler = async () => {
    if (!wallet.signer) {
      // TODO: popup metamask modal
    }

    try {
      const txRes = await createToken(
        {
          provider: wallet.provider!,
          signer: wallet.signer!,
          abi: abi.data,
        },
        parseInt(tokenAmountValidation.value),
        parseFloat(listingPriceValidation.value)
      );

      console.log(
        "logs: ",

        txRes.logs.find((log: any) => log.fragment.name === "TokenCreated")
          .args[0]
      );

      const data: RealEstate = {
        creator: wallet.address,
        name: listingNameValidation.value,
        description: descriptionValidation.value,
        tokenId: txRes.logs
          .find((log: any) => log.fragment.name === "TokenCreated")
          .args[0].toString(),
        totalTokenSUpply: parseInt(tokenAmountValidation.value),
        tokenPrice: parseFloat(listingPriceValidation.value),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createTokenMongodbInstance = await axios.post(
        serverURLs.realEstate,
        data
      );
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <MarketplaceLayout>
      <div className="subpage-container">
        <h1 className="page-title">Create New Real Estate Listing</h1>
        <div className="listing-form-container">
          <div className="input-container">
            <Input
              value={listingNameValidation.value}
              onChange={listingNameValidation.onChange}
              errorMessage={
                !listingNameValidation.isValid &&
                listingNameValidation.errorMessage
              }
              isInvalid={!listingNameValidation.isValid}
              label={"Listing Name"}
            />
          </div>
          <div className="input-container">
            <Textarea
              value={descriptionValidation.value}
              onChange={descriptionValidation.onChange}
              errorMessage={
                !descriptionValidation.isValid &&
                descriptionValidation.errorMessage
              }
              isInvalid={!descriptionValidation.isValid}
              rows={10}
              variant="bordered"
              disableAutosize
              label={"Description"}
            />
          </div>
          <div className="input-container">
            <Input
              type="number"
              label={"Amount of Tokens"}
              value={tokenAmountValidation.value}
              onChange={tokenAmountValidation.onChange}
              errorMessage={
                !tokenAmountValidation.isValid &&
                tokenAmountValidation.errorMessage
              }
              isInvalid={!tokenAmountValidation.isValid}
            />
          </div>
          <div className="input-container">
            <Input
              type="number"
              label={"Token Listing Price"}
              value={listingPriceValidation.value}
              onChange={listingPriceValidation.onChange}
              errorMessage={
                !listingPriceValidation.isValid &&
                listingPriceValidation.errorMessage
              }
              isInvalid={!listingPriceValidation.isValid}
              endContent={<p className="token-list-price-end-content">ETH</p>}
            />
          </div>
          <div className="input-container">
            <Button onClick={createListingHandler} color="primary">
              Submit Listing
            </Button>
          </div>
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default CreateListing;
