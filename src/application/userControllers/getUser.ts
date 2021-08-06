import { Request, Response } from "express";
import { getUser } from "../../domain/services";

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ user });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
};
