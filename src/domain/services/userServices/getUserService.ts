import UserRepository from "../../repositories/userRepository";
import User from "../../entities/userEntity";

export default (userRepository: UserRepository) =>
  async (id: string): Promise<User | null> => {
    const user = await userRepository.getUserById(id);
    return user;
  };
