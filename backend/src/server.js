const express = require("express");
const syncRoutes = require("./routes/sync.routes");
const app = express();
app.use(express.json());
app.use("/sync", syncRoutes);
app.get("/", (req, res) => {
  res.send("Puzzle backend running");
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});