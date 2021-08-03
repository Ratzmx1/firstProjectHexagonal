import User from "../entities/userEntity";
import TokenRepository from "../repositories/tokenRepository";
import UserRepository from "../repositories/userRepository";

export default (
    tokenRepository: TokenRepository,
    userRepository: UserRepository
  ) =>
  async (bearer: string): Promise<User | null> => {
    if (!bearer.toUpperCase().startsWith("BEARER ")) {
      return null;
    }
    const token = bearer.split(" ")[1];
    try {
      const userId = tokenRepository.validateToken(token);
      if (!userId) {
        return null;
      }
      const user = await userRepository.getUserById(userId);

      return user;
    } catch (error) {
      throw new Error(`Middleware error: ${error.message}`);
    }
  };
