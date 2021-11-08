import UserRepository from "../../domain/repositories/userRepository";
import EncryptRepository from "../../domain/repositories/encryptRepository";

import User from "../../domain/entities/userEntity";

export default (
    userRepository: UserRepository,
    encryptRepository: EncryptRepository
  ) =>
  async (user: User, password: string) => {
    const passwordEncoded = await encryptRepository.encrtpyPassword(password);

    const userUpdated = await userRepository.updatePassword(
      user.id || "",
      passwordEncoded
    );

    userUpdated.password = "";

    return userUpdated;
  };
