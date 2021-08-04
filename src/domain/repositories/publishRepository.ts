import { ObjectId } from "mongodb";
import Publish from "../entities/publishEntity";
import Comment from "../entities/commentEntity";
import User from "../entities/userEntity";

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
  getAll(): Promise<Array<Publish>>;
  getPublish(publishId: string): Promise<Publish | null>;
  getLikes(publishId: string): Promise<Array<User> | null>;
}
