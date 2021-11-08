import User from "../../domain/entities/userEntity";
import userRepository from "../../domain/repositories/userRepository";

import { UserEntity } from "./entity/UserEntity";
import { getEntityManager } from "./getEntityManager";

export default class UserAdapter implements userRepository {
  async addUser(user: User): Promise<User | null> {
    const userToSave = new UserEntity();
    userToSave.userName = user.userName;
    userToSave.password = user.password;
    userToSave.email = user.email;
    userToSave.age = user.age;
    userToSave.bio = user.bio || "";

    try {
      const _em = await getEntityManager();
      const userSaved = (await _em.save(userToSave)) || null;
      return userSaved || null;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const _em = await getEntityManager();
      const data = await _em.findOne(UserEntity, { email });

      return data || null;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const _em = await getEntityManager();
      const data = await _em.findOne(UserEntity, id);
      return data || null;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async updateUser(
    id: string,
    age: number,
    bio: string,
    username: string
  ): Promise<User> {
    try {
      const _em = await getEntityManager();

      const data = await _em.update(
        UserEntity,
        { id },
        { age, bio, userName: username }
      );
      console.log(data.raw);
      throw new Error(`Database Error: ${data.raw}`);
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async updatePassword(id: string, password: string): Promise<User> {
    try {
      const _em = await getEntityManager();

      await _em.update(UserEntity, id, { password });

      const user = await _em.findOne(UserEntity, id);

      return user as User;
    } catch (error: any) {
      throw new Error(`Database Error: ${error.message}`);
    }
  }
}
