import { BSON } from "mongodb";

export interface Abi extends BSON.Document {
  name: string;
  abi: any[];
}
