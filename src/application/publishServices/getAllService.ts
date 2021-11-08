import PublishRepository from "../../domain/repositories/publishRepository";
import UserRepository from "../../domain/repositories/userRepository";

import Publish from "../../domain/entities/publishEntity";
import User from "../../domain/entities/userEntity";

export default (publishRepository: PublishRepository) =>
  async (): Promise<Array<Publish>> => {
    const publishs = await publishRepository.getAll();

    return publishs;
  };
