import UserRepository from "../../domain/repositories/userRepository";
import User from "../../domain/entities/userEntity";

export default (userRepository: UserRepository) =>
  async (user: User, userName: string, bio: string, age: number) => {
    return await userRepository.updateUser(user.id || "", age, bio, userName);
  };
