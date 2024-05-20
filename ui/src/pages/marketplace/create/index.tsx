import { MarketplaceLayout } from "@/components/marketplace/layout";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useInputValidation } from "@/hooks/useInputValidation";
import { useRealEstateTokenContract } from "@/hooks/useRealEstateTokenContract";
import { create } from "domain";
import { useEffect, useState } from "react";
import { Contract, JsonRpcSigner, Wallet } from "ethers";
import { useAbiQuery } from "@/hooks/useRealEstateTokenContract/query";
import { getLocalProvider } from "@/utils/ethereum";
import { InterfaceAbi } from "ethers";
import { sign } from "crypto";
import { BaseContract } from "ethers";
import { useMetamaskWalletStore } from "@/stores";
import { RealEstateToken__factory } from "../../../../web3/typechain-types";
import { get } from "http";
import { AddressLike } from "ethers";

const CreateListing = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<BaseContract | null>(null);
  const abi = useAbiQuery("RealEstateToken");

  const metamask = useMetamaskWalletStore((state) => state.address);
  //const tokenContract = useRealEstateTokenContract();
  //let listingNameValidation = useInputValidation([{}]);
  let listingValidation = useInputValidation([
    { rule: /^\d+(\.\d+)?$/g, errorMessage: "Please enter a valid number" },
  ]);

  console.log(
    "contract address: ",
    `${process.env.NEXT_PUBLIC_REAL_ESTATE_TOKEN_CONTRACT_ADDRESS}`
  );

  console.log("abi: ", abi.data?.abi);

  const testContract = async () => {
    const provider = getLocalProvider();
    const signer = await provider.getSigner();
    const contract = new Contract(
      `${process.env.NEXT_PUBLIC_REAL_ESTATE_TOKEN_CONTRACT_ADDRESS}`,
      abi.data!.abi,
      provider
    );

    const contractWithSigner = contract.connect(signer);
    // @ts-ignore
    const tx = await contractWithSigner.createToken(10000);
  };

  useEffect(() => {
    if (abi.isSuccess) {
      testContract();
    }
  }, [abi.isSuccess]);

  // useEffect(() => {
  //   console.log("tokenContract: ", tokenContract.contract);
  //   tokenContract.contract;
  // }, [tokenContract]);

  const createListingHandler = async () => {
    // if (tokenContract) {
    //   tokenContract.contract!.createListing([10000]);
    // }
  };

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
