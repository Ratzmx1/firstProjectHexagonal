import PublishRepository from "../../repositories/publishRepository";
import UserRepository from "../../repositories/userRepository";

import Publish from "../../entities/publishEntity";
import User from "../../entities/userEntity";

export default (publishRepository: PublishRepository) =>
  async (): Promise<Array<Publish>> => {
    const publishs = await publishRepository.getAll();

    return publishs;
  };
