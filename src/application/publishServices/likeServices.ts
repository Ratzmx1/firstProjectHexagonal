import PublishRepository from "../../domain/repositories/publishRepository";

import Publish from "../../domain/entities/publishEntity";
import User from "../../domain/entities/userEntity";

export default (publishRepository: PublishRepository) =>
  async (id: string, user: User): Promise<Publish | null> => {
    const likesArray = await publishRepository.getArrayLike(id);

    if (!likesArray) {
      return null;
    }
    if (likesArray.findIndex((elem) => elem === user.id) >= 0) {
      return null;
    }

    const publish = await publishRepository.likePublish(id, user.id || "");

    return publish;
  };
