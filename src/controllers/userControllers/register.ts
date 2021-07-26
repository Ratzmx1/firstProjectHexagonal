import { Request, Response } from "express";
import User from "../../core/entities/userEntity";
import { registerUser } from "../../core/interactors";

export default async (req: Request, res: Response) => {
  const { userName, email, password, age, bio } = req.body;
  const user: User = {
    userName,
    email,
    password,
    age,
    bio: bio || undefined,
  };

  const registeredUser = await registerUser(user);

  return res.json({ user: registeredUser });
};
