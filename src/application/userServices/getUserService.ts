import UserRepository from "../../domain/repositories/userRepository";
import User from "../../domain/entities/userEntity";

export default (userRepository: UserRepository) =>
  async (id: string): Promise<User | null> => {
    const user = await userRepository.getUserById(id);
    return user;
  };
