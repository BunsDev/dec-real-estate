import { BSON } from "mongodb";
import { DocumentTimestap } from "../types";
import { AddressLike } from "ethers";

export interface RealEstate extends BSON.Document, DocumentTimestap {
  creator: AddressLike;
  name: string;
  description: string;
  tokenId: string; // must keep it string since cannot serialize bigints to JSON
  totalTokenSUpply: number;
  tokenPrice: number;
  indexImage?: string;
  images?: string[];
}
