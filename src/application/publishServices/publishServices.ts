import PublishRepository from "../../domain/repositories/publishRepository";

import Publish from "../../domain/entities/publishEntity";

export default (publishRepository: PublishRepository) =>
  async (publish: Publish): Promise<Publish | null> => {
    const pub = await publishRepository.insertPublish(publish);

    return pub;
  };
