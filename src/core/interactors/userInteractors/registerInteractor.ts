import UserRepository from "../../repositories/userRepository";
import EncrtptRepository from "../../repositories/encryptRepository";
import TokenRepository from "../../repositories/tokenRepository";

import User from "../../entities/userEntity";

export default (
    userRepository: UserRepository,
    encryptRepository: EncrtptRepository,
    tokenRepository: TokenRepository
  ) =>
  async (user: User): Promise<{ user: User; token: string } | null> => {
    const userByEmail = await userRepository.getUserByEmail(user.email);

    if (userByEmail) {
      return null;
    }
    const pass = await encryptRepository.encrtpyPassword(user.password);
    user.password = pass;
    const registeredUser = await userRepository.addUser(user);
    if (!registeredUser) {
      return null;
    }
    const token = await tokenRepository.generateToken(
      registeredUser.id as unknown as string
    );
    return { user: registeredUser, token: token || "" };
  };
