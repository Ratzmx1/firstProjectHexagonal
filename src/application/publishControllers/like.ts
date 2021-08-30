import { Request, Response } from "express";
import User from "../../domain/entities/userEntity";
import { likePublish } from "../../infraestructure";

export default async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = res.locals.user as User;
  try {
    const data = await likePublish(id, user);
    if (!data) {
      return res.status(400).json({ message: "Publish already liked" });
    }
    return res.json({ data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
