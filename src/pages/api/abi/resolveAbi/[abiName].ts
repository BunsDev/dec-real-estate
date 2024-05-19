import { abiCollection, AbiCollection } from "@/utils/mongodb/AbiCollection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name: abiName } = req.query;

  console.log("Mongo uri: ", process.env.MONGO_URI);

  if (req.method != "GET") {
    res.status(405).end();
    return;
  }

  const abi = await abiCollection.getAbiByName(abiName as string);

  if (!abi) {
    res.status(404).end();
    return;
  }

  res.status(200).json(abi);
}
