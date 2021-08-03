import express from "express";
import register from "./controllers/userControllers/register";
import login from "./controllers/userControllers/login";
import publish from "./controllers/publishControllers/publish";
import middleware from "./controllers/middleware";
import like from "./controllers/publishControllers/like";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/user/register", register);
app.post("/user/login", login);
app.post("/post", middleware, publish);
app.post("/post/:id/like", middleware, like);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
