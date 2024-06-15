import { serverURLs } from "@/utils";
import { Abi } from "@/utils/db/AbiCollection/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAbi = async (abiName: string): Promise<Abi> => {
  const response = await axios.get(serverURLs.abi_resolveAbi(abiName));
  console.log(response.data);
  return response.data;
};

export const useAbiQuery = (abiName: string) =>
  useQuery({ queryKey: ["abi", abiName], queryFn: () => fetchAbi(abiName) });
