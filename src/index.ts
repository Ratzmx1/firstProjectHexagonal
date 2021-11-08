import express from "express";

import register from "./infraestructure/express/userControllers/register";
import login from "./infraestructure/express/userControllers/login";
import publish from "./infraestructure/express/publishControllers/publish";
import middleware from "./infraestructure/express/middleware";
import like from "./infraestructure/express/publishControllers/like";
import comment from "./infraestructure/express/publishControllers/comment";
import getAll from "./infraestructure/express/publishControllers/getAll";
import getUser from "./infraestructure/express/userControllers/getUser";
import updateUser from "./infraestructure/express/userControllers/updateUser";
import updatePassword from "./infraestructure/express/userControllers/updatePassword";

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
