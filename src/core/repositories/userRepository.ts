import User from "../entities/userEntity";

export default interface userRepository {
  addUser(user: User): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
}
