import { ObjectId } from "mongodb";
import Publish from "../entities/publishEntity";

export default interface publishRepository {
  insertPublish(publish: Publish): Promise<Publish>;
  commentPublish(
    publishId: string,
    userId: string,
    username: string,
    comment: string
  ): Promise<void>;
  getArrayLike(publishId: string): Promise<Array<ObjectId> | null>;
  likePublish(publishId: string, userId: string): Promise<Publish>;
}
