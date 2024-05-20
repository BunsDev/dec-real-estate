import { BSON } from "mongodb";

export interface RealEstate extends BSON.Document {
  name: string;
  description: string;
  tokenId: number;
  totalTokenSUpply: number;
  tokenPrice: number;
  indexImage?: string;
  images?: string[];

  createdAt: Date;
  updatedAt: Date;
}
