import {
  WithId,
  InsertOneResult,
  InsertManyResult,
  UpdateResult,
  DeleteResult,
  Collection,
  ObjectId,
} from "mongodb";
import { MongoCollection, MongoDefaultActions } from "../types";
import { AccountBalanceOfToken } from "./types";

export class AccountBalanceOfTokenCollection
  extends MongoCollection<AccountBalanceOfToken>
  implements MongoDefaultActions<AccountBalanceOfToken>
{
  fetchAll(): Promise<WithId<AccountBalanceOfToken>[]> {
    return this.collection.find().toArray();
  }

  fetchOneById(id: string): Promise<WithId<AccountBalanceOfToken> | null> {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  createOne: (
    data: AccountBalanceOfToken
  ) => Promise<InsertOneResult<AccountBalanceOfToken>> = async (data) => {
    return this.collection.insertOne(data);
  };

  createMany: (
    data: AccountBalanceOfToken[]
  ) => Promise<InsertManyResult<AccountBalanceOfToken>> = async (data) => {
    return this.collection.insertMany(data);
  };

  updateOneById: (
    id: string,
    data: AccountBalanceOfToken
  ) => Promise<UpdateResult<AccountBalanceOfToken>> = async (id, data) => {
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  };

  deleteOneById: (id: string) => Promise<DeleteResult> = async (id) => {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  };

  deleteManyByIds: (ids: string[]) => Promise<DeleteResult> = async (ids) => {
    return this.collection.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
  };
}

export const accountBalanceOfTokenCollection =
  new AccountBalanceOfTokenCollection("AccountBalanceOfToken");
