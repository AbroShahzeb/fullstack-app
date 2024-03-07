import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hello from the server",
  });
});

export default app;
