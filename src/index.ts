import express from "express";
import register from "./controllers/userControllers/register";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/", register);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
