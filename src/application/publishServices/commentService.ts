import PublishRepository from "../../domain/repositories/publishRepository";

import User from "../../domain/entities/userEntity";

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
