import { serverURLs } from "@/utils";
import { realEstateCollection } from "@/utils/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const queryAssetsFunction = async (address: string) => {
  const res = await axios.get(serverURLs.realEstate_assets(address));

  return res.data;
};

export const useMyAssetsQuery = (address: string) =>
  useQuery({
    queryKey: ["assets", address],
    queryFn: () => queryAssetsFunction(address),
  });
