import { Request, Response, NextFunction } from "express";
import { middleware } from "../core/services";
// import { Request } from "../core/entities/requestAuthorized";

export default async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.header("authorization");
  if (!bearer) {
    return res.status(400).json({ message: "No token" });
  }
  const user = await middleware(bearer);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.locals.user = user;
  return next();
};
