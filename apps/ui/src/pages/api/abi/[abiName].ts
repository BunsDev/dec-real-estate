import type { NextApiRequest, NextApiResponse } from "next";
import { abiCollection } from "db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const abiName = req.query.abiName;

  if (!abiName) {
  }

  console.log("Mongo uri: ", process.env.MONGO_URI);

  if (req.method != "GET") {
    res.status(405).end();
    return;
  }

  const abi = await abiCollection.getAbiByName(abiName as string);

  console.log("abiName: ", abiName);

  if (!abi) {
    res.status(404).end();
    return;
  }

  res.status(200).json(abi);
}
