import express from "express";
import register from "./application/userControllers/register";
import login from "./application/userControllers/login";
import publish from "./application/publishControllers/publish";
import middleware from "./application/middleware";
import like from "./application/publishControllers/like";
import comment from "./application/publishControllers/comment";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/user/register", register);
app.post("/user/login", login);
app.post("/post", middleware, publish);
app.post("/post/:id/like", middleware, like);
app.post("/post/:id/comment", middleware, comment);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

// TODO: GET ALL PUBLISH WITH LIKECOUNT AND COMMENTCOUNT
// TODO: GET COMMENTS
// TODO: GET LIKES
// TODO: GET USER PROFILE
