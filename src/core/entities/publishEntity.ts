export default interface publishI {
  id?: string;
  userId: string;
  userName: string;
  publish: string;
  likes?: number;
  likedUsers?: Array<string>;
  comments?: Array<comment>;
}

interface comment {
  userId: string;
  username: string;
  comment: string;
}
