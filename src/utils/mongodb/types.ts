import {
  BSON,
  Collection,
  Db,
  DeleteResult,
  InsertManyResult,
  InsertOneResult,
  MongoClient,
  UpdateResult,
  WithId,
} from "mongodb";

export class MongoDbConnector {
  private mongoClient: MongoClient;
  private database: Db;

  constructor() {
    this.mongoClient = new MongoClient(process.env.MONGO_URI!);
    this.database = this.mongoClient.db();
  }

  getClient(): MongoClient {
    return this.mongoClient;
  }

  getDatabase(): Db {
    return this.database;
  }
}

export abstract class MongoCollection<DataT extends BSON.Document> {
  private mongoDb: MongoDbConnector;
  protected collection: Collection<DataT>;
  protected collectionName: string = ""; // Each child must set this!

  constructor() {
    this.mongoDb = new MongoDbConnector();
    this.collection = this.mongoDb
      .getDatabase()
      .collection<DataT>(this.collectionName);
  }
}

/**
 * Generic interface for mongodb collection actions
 * @param DataT - Shema of the collection without the _id field
 */
export interface MongoDefaultActions<DataT extends BSON.Document> {
  fetchAll: () => Promise<WithId<DataT>[]>;
  fetchOneById: (id: string) => Promise<WithId<DataT> | null>;
  createOne: (data: DataT) => Promise<InsertOneResult<DataT>>;
  createMany: (data: DataT[]) => Promise<InsertManyResult<DataT>>;
  updateOneById: (id: string, data: DataT) => Promise<UpdateResult<DataT>>;
  deleteOneById: (id: string) => Promise<DeleteResult>;
  deleteManyByIds: (ids: string[]) => Promise<DeleteResult>;
}
