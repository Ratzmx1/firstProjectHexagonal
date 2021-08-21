import { MongoClient, ObjectId } from "mongodb";
import commentEntity from "../../domain/entities/commentEntity";
import Publish from "../../domain/entities/publishEntity";
import userEntity from "../../domain/entities/userEntity";
import PublishRepository from "../../domain/repositories/publishRepository";

export default class publishAdapter implements PublishRepository {
  async getLikes(publishId: string): Promise<userEntity[] | null> {
    try {
      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);
      const data: Array<any> = [];
      const docs = await coll.findOne({ _id: new ObjectId(publishId) });
      if (!data) {
        return null;
      }
      conn.close();

      return docs as Array<userEntity>;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async getAll(): Promise<Publish[]> {
    try {
      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);
      const data: Array<Publish> = [];
      const docs = coll.find();
      await docs.forEach((d) => {
        data.push(d as Publish);
      });
      conn.close();
      return data;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async getPublish(publishId: string): Promise<Publish | null> {
    try {
      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);

      const data = coll.findOne({ _id: new ObjectId(publishId) });
      conn.close();
      if (!data) {
        return null;
      }

      return data as unknown as Publish;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async getArrayLike(publishId: string): Promise<ObjectId[] | null> {
    try {
      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);
      const doc = await coll.findOne({ _id: new ObjectId(publishId) });

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
  ): Promise<void> {
    try {
      const conn = await this.getConnection();
      const coll = await this.getCollection(conn);
      const comm = { userId, username, comment, createdAt: new Date() };
      const data = await coll.updateOne(
        { _id: new ObjectId(publishId) },
        { $push: { comments: comm }, $inc: { commentCount: 1 } }
      );
      conn.close();
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
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
