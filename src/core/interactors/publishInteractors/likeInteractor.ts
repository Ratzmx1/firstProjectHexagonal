import PublishRepository from "../../repositories/publishRepository";

import Publish from "../../entities/publishEntity";
import User from "../../entities/userEntity";
import { ObjectId } from "mongodb";

export default (publishRepository: PublishRepository) =>
  async (id: string, user: User): Promise<Publish | null> => {
    const likesArray = await publishRepository.getArrayLike(id);

    if (!likesArray) {
      return null;
    }
    if (likesArray.findIndex((elem) => elem.equals(user.id || "")) >= 0) {
      return null;
    }

    const publish = await publishRepository.likePublish(id, user.id || "");

    return publish;
  };
