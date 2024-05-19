import {
  Collection,
  DeleteResult,
  InsertManyResult,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
} from "mongodb";
import { mongoDb } from "..";
import { MongoDefaultActions } from "../types";
import { RealEstate } from "./types";

export class RealEstateCollection implements MongoDefaultActions<RealEstate> {
  private collection: Collection<RealEstate>;

  constructor() {
    this.collection = mongoDb.collection<RealEstate>("RealEstate");
  }

  async fetchAll(): Promise<WithId<RealEstate>[]> {
    return this.collection.find().toArray();
  }

  async fetchOne(id: string): Promise<WithId<RealEstate> | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async createOne(data: RealEstate): Promise<InsertOneResult<RealEstate>> {
    return await this.collection.insertOne(data);
  }

  async createMany(data: RealEstate[]): Promise<InsertManyResult<RealEstate>> {
    return await this.collection.insertMany(data);
  }

  async updateOne(
    id: string,
    data: RealEstate
  ): Promise<UpdateResult<RealEstate>> {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteMany(ids: string[]): Promise<DeleteResult> {
    return await this.collection.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
  }
}
