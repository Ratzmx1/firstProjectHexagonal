import express from "express";
import register from "./application/userControllers/register";
import login from "./application/userControllers/login";
import publish from "./application/publishControllers/publish";
import middleware from "./application/middleware";
import like from "./application/publishControllers/like";
import comment from "./application/publishControllers/comment";
import getAll from "./application/publishControllers/getAll";
import getUser from "./application/userControllers/getUser";
import updateUser from "./application/userControllers/updateUser";
import updatePassword from "./application/userControllers/updatePassword";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/user/login", login);
app.post("/user/register", register);
app.get("/user/:id", middleware, getUser);
app.put("/user", middleware, updateUser);
app.put("/user/password", middleware, updatePassword);

app.get("/post", middleware, getAll);
app.post("/post", middleware, publish);
app.post("/post/:id/like", middleware, like);
app.post("/post/:id/comment", middleware, comment);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
