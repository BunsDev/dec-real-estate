import {
  Db,
  DeleteResult,
  InsertManyResult,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
} from "mongodb";
import { MongoCollection, MongoDefaultActions } from "../types";
import { RealEstate } from "./types";

export class RealEstateCollection
  extends MongoCollection<RealEstate>
  implements MongoDefaultActions<RealEstate>
{
  collectionName = "RealEstate";

  async fetchAll(): Promise<WithId<RealEstate>[]> {
    return this.collection.find().toArray();
  }

  async fetchOneById(id: string): Promise<WithId<RealEstate> | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async createOne(data: RealEstate): Promise<InsertOneResult<RealEstate>> {
    return await this.collection.insertOne(data);
  }

  async createMany(data: RealEstate[]): Promise<InsertManyResult<RealEstate>> {
    return await this.collection.insertMany(data);
  }

  async updateOneById(
    id: string,
    data: RealEstate
  ): Promise<UpdateResult<RealEstate>> {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
  }

  async deleteOneById(id: string): Promise<DeleteResult> {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteManyByIds(ids: string[]): Promise<DeleteResult> {
    return await this.collection.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
  }
}

export const realEstateCollection = new RealEstateCollection("RealEstate");
