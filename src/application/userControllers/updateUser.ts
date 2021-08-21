import { Request, Response } from "express";
import { updateUser } from "../../domain/services";
import User from "../../domain/entities/userEntity";

export default async (req: Request, res: Response) => {
  const user = res.locals.user as User;
  const { userName, bio, age } = req.body;

  try {
    const userResponse = await updateUser(user, userName, bio, age);
    return res.json({ user: userResponse });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
};
