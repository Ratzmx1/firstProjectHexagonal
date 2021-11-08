import { Request, Response } from "express";
import { getAllPublish } from "../..";

export default async (req: Request, res: Response) => {
  try {
    const data = await getAllPublish();
    return res.json({ data });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
