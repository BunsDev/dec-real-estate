import { serverURLs } from "@/utils";
import { Abi } from "@/utils/mongodb/AbiCollection/types";
import { useQuery } from "@tanstack/react-query";

const fetchAbi = async (abiName: string): Promise<Abi> => {
  const response = await fetch(serverURLs.abi_resolveAbi(abiName));
  return response.json();
};

export const useAbiQuery = (abiName: string) =>
  useQuery({ queryKey: ["abi", abiName], queryFn: () => fetchAbi(abiName) });
