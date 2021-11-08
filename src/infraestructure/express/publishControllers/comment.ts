import { Request, Response } from "express";
import User from "../../../domain/entities/userEntity";
import { commentPublish } from "../..";

export default async (req: Request, res: Response) => {
  const { comment } = req.body;
  const { id } = req.params;
  const user = res.locals.user as User;
  try {
    await commentPublish(id, comment, user);
    return res.json({ message: "Comment published successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
