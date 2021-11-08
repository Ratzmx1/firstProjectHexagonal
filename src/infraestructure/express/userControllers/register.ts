import { Request, Response } from "express";
import User from "../../../domain/entities/userEntity";
import { registerUser } from "../..";

export default async (req: Request, res: Response) => {
  const { userName, email, password, age, bio } = req.body;
  const user: User = {
    userName,
    email,
    password,
    age,
    bio: bio || undefined,
  };
  try {
    const registeredUser = await registerUser(user);

    if (!registeredUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    return res.json({ user: registeredUser });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
