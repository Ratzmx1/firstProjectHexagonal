import { MongoClient } from "mongodb";

import User from "../../core/entities/userEntity";
import userRepository from "../../core/repositories/userRepository";

export default class userAdapter implements userRepository {
  async addUser(user: User) {
    const collection = await this.getConnection();
    const result = await collection.insertOne(user);
    return { _id: result.insertedId, ...user };
  }
  async getUser(email: string): Promise<User> {
    const collection = await this.getConnection();
    const user = (await collection.findOne({ email })) as User;

    return user;
  }

  private getConnection = async () => {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url);
    const c = await client.connect();
    const db = c.db("twitter");
    return db.collection("users");
  };
}

const getConnection = () => {};
