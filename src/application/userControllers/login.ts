import { Request, Response } from "express";
import { loginUser } from "../../infraestructure";

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const response = await loginUser(email, password);

    if (!response) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    return res.json({ user: response?.user, token: response?.token });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
};
