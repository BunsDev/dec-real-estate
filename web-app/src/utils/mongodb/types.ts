import {
  BSON,
  DeleteResult,
  InsertManyResult,
  InsertOneResult,
  UpdateResult,
  WithId,
} from "mongodb";

/**
 * Generic interface for mongodb collection actions
 * @param DataT - Shema of the collection without the _id field
 */
export interface MongoDefaultActions<DataT extends BSON.Document> {
  fetchAll: () => Promise<WithId<DataT>[]>;
  fetchOne: (id: string) => Promise<WithId<DataT> | null>;
  createOne: (data: DataT) => Promise<InsertOneResult<DataT>>;
  createMany: (data: DataT[]) => Promise<InsertManyResult<DataT>>;
  updateOne: (id: string, data: DataT) => Promise<UpdateResult<DataT>>;
  deleteOne: (id: string) => Promise<DeleteResult>;
  deleteMany: (ids: string[]) => Promise<DeleteResult>;
}
