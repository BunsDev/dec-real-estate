import { Contract } from "ethers";
import { useLocalWeb3Provider } from "../useLocalWeb3Provider";
import { useEffect, useState } from "react";
import { useAbiQuery } from "./query";

export function useRealEstateTokenContract() {
  const provider = useLocalWeb3Provider();
  const [contract, setContract] = useState<Contract | null>(null);

  const abi = useAbiQuery("RealEstateToken");

  useEffect(() => {
    if (provider && abi.isSuccess) {
      setContract(
        new Contract(
          `${process.env.NEXT_PUBLIC_REAL_ESTATE_TOKEN_CONTRACT_ADDRESS!}`,
          abi.data.abi,
          provider
        )
      );
    }
  }, [provider, abi]);

  return contract;
}
