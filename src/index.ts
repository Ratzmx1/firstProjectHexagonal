import express from "express";
import register from "./controllers/userControllers/register";
import login from "./controllers/userControllers/login";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/user/register", register);
app.post("/user/login", login);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
