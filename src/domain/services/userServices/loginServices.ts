import UserRepository from "../../repositories/userRepository";
import EncrtptRepository from "../../repositories/encryptRepository";
import TokenRepository from "../../repositories/tokenRepository";
import User from "../../entities/userEntity";

export default (
    userRepository: UserRepository,
    encrtptRepository: EncrtptRepository,
    tokenRepository: TokenRepository
  ) =>
  async (
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null> => {
    const user = await userRepository.getUserByEmail(email);

    if (
      !user ||
      !(await encrtptRepository.comparePassword(password, user.password))
    ) {
      return null;
    }

    const token = tokenRepository.generateToken(user.id || "");
    if (!token) {
      return null;
    }
    return { user, token: token as string };
  };
