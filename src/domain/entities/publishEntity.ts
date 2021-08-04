import comment from "./commentEntity";

export default interface publishI {
  id?: string;
  userId: string;
  userName: string;
  publish: string;
  likes?: number;
  commentCount?: number;
  likedUsers?: Array<string>;
  comments?: Array<comment>;
}
