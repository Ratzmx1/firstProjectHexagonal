import { model, Schema, connect } from "mongoose";

import UserI from "../../domain/entities/userEntity";
import userRepository from "../../domain/repositories/userRepository";

const UserSchema = new Schema<UserI>({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: false },
  age: { type: Number, required: false },
  id: { type: String, required: false },
});

const UserM = model<UserI>("User", UserSchema);

export default class userAdapter implements userRepository {
  async addUser(user: UserI): Promise<UserI | null> {
    try {
      const conn = await this.getConnection();

      const newUser = new UserM(user);
      await newUser.save();
      if (!!newUser) {
        newUser.id = newUser._id;
      }
      await conn.disconnect();
      return newUser;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async getUserByEmail(email: string): Promise<UserI | null> {
    try {
      const conn = await this.getConnection();

      const user = await UserM.findOne({ email });
      if (!!user) {
        user.id = user._id;
      }
      await conn.disconnect();
      return user;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async getUserById(id: string): Promise<UserI | null> {
    try {
      const conn = await this.getConnection();

      const user = await UserM.findById(id);
      if (!!user) {
        user.id = user._id;
      }
      await conn.disconnect();
      return user;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async updateUser(
    id: string,
    age: number,
    bio: string,
    username: string
  ): Promise<UserI> {
    try {
      const conn = await this.getConnection();

      const user = await UserM.findOneAndUpdate({ id }, { age, bio, username });
      if (!!user) {
        user.id = user._id;
      }
      await conn.disconnect();

      return user as unknown as UserI;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  private getConnection = async () => {
    const conn = await connect("mongodb://localhost:27017/twitter2");
    return conn;
  };
}
