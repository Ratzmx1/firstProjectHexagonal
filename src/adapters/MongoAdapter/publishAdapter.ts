import { MongoClient } from "mongodb";
import Publish from "../../core/entities/publishEntity";
import PublishRepository from "../../core/repositories/publishRepository";

export default class publishAdapter implements PublishRepository {
  async insertPublish(publish: Publish): Promise<Publish> {
    try {
      publish.comments = [];
      publish.likedUsers = [];
      publish.likes = 0;

      const conn = await this.getConnection();

      const insertedPublish = await conn.insertOne(publish);

      publish.id = insertedPublish.insertedId as unknown as string;

      return publish;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  commentPublish(
    publishId: string,
    username: string,
    comment: string
  ): Promise<Publish> {
    throw new Error("Method not implemented.");
  }
  likePublish(publishId: string, userid: string): Promise<Publish> {
    throw new Error("Method not implemented.");
  }

  private getConnection = async () => {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url);
    const c = await client.connect();
    const db = c.db("twitter");
    return db.collection("publishs");
  };
}
