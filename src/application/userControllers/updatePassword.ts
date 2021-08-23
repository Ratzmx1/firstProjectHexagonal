import { Request, Response } from "express";
import User from "../../domain/entities/userEntity";

import { updatePassword } from "../../domain/services";

export default async (req: Request, res: Response) => {
  const user = res.locals.user as User;
  const { password } = req.body;
  try {
    const userUpadated = await updatePassword(user, password);

    return res.json({});
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
