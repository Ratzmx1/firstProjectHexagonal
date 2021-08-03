import PublishRepository from "../../repositories/publishRepository";

import Publish from "../../entities/publishEntity";

export default (publishRepository: PublishRepository) =>
  async (publish: Publish): Promise<Publish | null> => {
    const pub = await publishRepository.insertPublish(publish);

    return pub;
  };
