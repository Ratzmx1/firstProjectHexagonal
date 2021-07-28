import Publish from "../entities/publishEntity";

export default interface publishRepository {
  insertPublish(publish: Publish): Promise<Publish>;
  commentPublish(
    publishId: string,
    username: string,
    comment: string
  ): Promise<Publish>;
  likePublish(publishId: string, userid: string): Promise<Publish>;
}
