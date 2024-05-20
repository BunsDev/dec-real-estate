import { Contract } from "ethers";
import { useLocalWeb3Provider } from "../useLocalWeb3Provider";
import { useEffect, useState } from "react";
import { useAbiQuery } from "./query";
import { JsonRpcSigner } from "ethers";
import { getLocalProvider } from "@/utils/ethereum";

export function useRealEstateTokenContract() {
  const provider = useLocalWeb3Provider();
  const [contract, setContract] = useState<Contract | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

  const abi = useAbiQuery("RealEstateToken");

  useEffect(() => {
    console.log("abi: ", abi.isSuccess);
    if (abi.isSuccess) {
      const provider = getLocalProvider();

      const contract = new Contract(
        `${process.env.NEXT_PUBLIC_REAL_ESTATE_TOKEN_CONTRACT_ADDRESS!}`,
        abi.data.abi,
        provider
      );

      setContract(contract);

      console.log("Contract: ", contract);

      provider.getSigner().then((signer) => {
        setSigner(signer);
      });

      console.log("returning toke contract");
    }
  }, [abi.data, abi.isSuccess]);

  return { contract, signer };
}
