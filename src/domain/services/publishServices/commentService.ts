import PublishRepository from "../../repositories/publishRepository";

import Publish from "../../entities/publishEntity";
import User from "../../entities/userEntity";

export default (publishRepository: PublishRepository) =>
  async (id: string, comment: string, user: User): Promise<void | null> => {
    const publish = await publishRepository.commentPublish(
      id,
      user.id || "",
      user.userName,
      comment
    );

    return publish;
  };
