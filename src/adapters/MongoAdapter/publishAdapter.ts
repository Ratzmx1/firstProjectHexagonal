import { MongoClient, ObjectId } from "mongodb";
import Publish from "../../core/entities/publishEntity";
import PublishRepository from "../../core/repositories/publishRepository";

export default class publishAdapter implements PublishRepository {
  async getArrayLike(publishId: string): Promise<ObjectId[] | null> {
    try {
      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);
      const doc = await coll.findOne({ _id: new ObjectId(publishId) });

      // console.log(doc);
      if (!doc) {
        conn.close();
        return null;
      }
      const data = doc.likedUsers as Array<ObjectId>;
      conn.close();
      return data;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async insertPublish(publish: Publish): Promise<Publish> {
    try {
      publish.comments = [];
      publish.likedUsers = [];
      publish.likes = 0;

      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);

      const insertedPublish = await coll.insertOne(publish);

      publish.id = insertedPublish.insertedId as unknown as string;
      conn.close();
      return publish;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async commentPublish(
    publishId: string,
    userId: string,
    username: string,
    comment: string
  ): Promise<Publish> {
    throw new Error("Method not implemented.");
  }

  async likePublish(publishId: string, userId: string): Promise<Publish> {
    try {
      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);
      const doc = await coll.updateOne(
        { _id: new ObjectId(publishId) },
        { $inc: { likes: 1 }, $push: { likedUsers: userId } }
      );
      console.log(doc);
      conn.close();
      return doc as unknown as Publish;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  private getConnection = async () => {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url);
    const c = await client.connect();
    return c;
  };

  private getCollection = async (c: MongoClient) => {
    return c.db("twitter").collection("publishs");
  };
}
