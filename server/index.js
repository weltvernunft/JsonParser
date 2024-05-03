const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.post("/data", (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json({ message: "Data received successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
