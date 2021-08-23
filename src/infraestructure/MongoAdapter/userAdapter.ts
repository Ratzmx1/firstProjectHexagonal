import { MongoClient, ObjectId } from "mongodb";

import User from "../../domain/entities/userEntity";
import userRepository from "../../domain/repositories/userRepository";

export default class userAdapter implements userRepository {
  async updatePassword(id: string, password: string): Promise<User> {
    try {
      const connection = await this.getConnection();
      const collection = await this.getCollection(connection);

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { password } }
      );

      const user = await collection.findOne({ _id: new ObjectId(id) });

      connection.close();

      return user as User;
    } catch (error) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async updateUser(
    id: string,
    age: number,
    bio: string,
    userName: string
  ): Promise<User> {
    try {
      const connection = await this.getConnection();
      const collection = await this.getCollection(connection);

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { age, bio, userName } }
      );
      const user = await collection.findOne({ _id: new ObjectId(id) });

      connection.close();

      return user as User;
    } catch (error) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const connection = await this.getConnection();
      const collection = await this.getCollection(connection);
      const result = await collection.findOne({ _id: new ObjectId(id) });
      connection.close();

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
      const connection = await this.getConnection();
      const collection = await this.getCollection(connection);
      const result = await collection.insertOne(user);
      user.id = result.insertedId as unknown as string;
      connection.close();
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const connection = await this.getConnection();
      const collection = await this.getCollection(connection);

      const data = await collection.findOne({ email });
      if (!data) {
        return null;
      }
      const user = data as User;
      user.id = data._id;
      connection.close();

      return user;
    } catch (error) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  private getConnection = async () => {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url);
    const c = await client.connect();
    return c;
  };

  private getCollection = async (connection: MongoClient) => {
    return connection.db("twitter").collection("users");
  };
}
