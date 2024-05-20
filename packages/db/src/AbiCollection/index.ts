import { WithId } from "mongodb";
import { MongoCollection } from "../types";
import { Abi } from "./types";

export class AbiCollection extends MongoCollection<Abi> {
  getAllAbis(): Promise<WithId<Abi>[]> {
    return this.collection.find().toArray();
  }

  getAbiByName(name: string): Promise<WithId<Abi> | null> {
    return this.collection.findOne({ name });
  }
}

export const abiCollection = new AbiCollection("Abi");
