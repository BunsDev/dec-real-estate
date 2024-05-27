import { NextApiRequest, NextApiResponse } from "next";
import { GET, POST } from "./_methods";
import { realEstateCollection } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      req.body.createdAt = new Date();
      req.body.updatedAt = new Date();

      const dbRes = await realEstateCollection.createOne(req.body);

      return res.status(200).json({ data: dbRes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const dbRes = await realEstateCollection.fetchAll();
      return res.status(200).json({ data: dbRes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
