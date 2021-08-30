import { Request, Response } from "express";
import Publish from "../../domain/entities/publishEntity";
import User from "../../domain/entities/userEntity";
import { createPublish } from "../../infraestructure";

export default async (req: Request, res: Response) => {
  const { publish } = req.body;

  const user: User = res.locals.user;

  const publishData: Publish = {
    publish,
    userId: user.id || "",
    userName: user.userName,
  };

  try {
    const resp = await createPublish(publishData);
    if (!resp) {
      return res
        .status(400)
        .json({ message: "An error has occurred while publishing the twit" });
    }

    return res.status(201).json({ publish: resp });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
