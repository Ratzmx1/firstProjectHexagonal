import { Response, NextFunction } from "express";
import { middleware } from "../core/interactors";
import { Request } from "../core/entities/requestAuthorized";

export default async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.header("authorization");
  if (!bearer) {
    return res.status(400).json({ message: "No token" });
  }
  const token = await middleware(bearer);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.userId = token;
  return next();
};
