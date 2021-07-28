import { MongoClient, ObjectId } from "mongodb";

import User from "../../core/entities/userEntity";
import userRepository from "../../core/repositories/userRepository";

export default class userAdapter implements userRepository {
  async getUserById(id: string): Promise<User | null> {
    try {
      const collection = await this.getConnection();
      const result = await collection.findOne({ _id: new ObjectId(id) });
      if (!result) {
        return null;
      }

      result.id = result._id as string;
      return result as User;
    } catch (error) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async addUser(user: User): Promise<User | null> {
    try {
      const collection = await this.getConnection();
      const result = await collection.insertOne(user);
      user.id = result.insertedId as unknown as string;
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const collection = await this.getConnection();
      const data = await collection.findOne({ email });
      if (!data) {
        return null;
      }
      const user = data as User;
      user.id = data._id;
      return user;
    } catch (error) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  private getConnection = async () => {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url);
    const c = await client.connect();
    const db = c.db("twitter");
    return db.collection("users");
  };
}
