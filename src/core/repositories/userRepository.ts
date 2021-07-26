import User from "../entities/userEntity";

export default interface userRepository {
  addUser(user: User): Promise<User>;
  getUser(email: string): Promise<User>;
}
