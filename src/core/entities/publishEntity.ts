export default interface publishI {
  publishId: string;
  userId: string;
  userName: string;
  publish: string;
  likes: number;
  comments: Array<comment>;
}

interface comment {
  userId: string;
  username: string;
  comment: string;
}
