import { Request as req } from "express";

export interface Request extends req {
  userId: string;
}
