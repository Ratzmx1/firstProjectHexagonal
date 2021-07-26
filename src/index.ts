import express from "express";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
