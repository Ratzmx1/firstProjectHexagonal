import UserRepository from "../../repositories/userRepository";
import EncryptRepository from "../../repositories/encryptRepository";

import User from "../../entities/userEntity";

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
