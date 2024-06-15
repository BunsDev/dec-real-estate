import { realEstateCollection } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { address } = req.query;

  const realEstates = await realEstateCollection.fetchAllAssetsByCreator(
    address as string
  );

  return res.status(200).json(realEstates);
}
