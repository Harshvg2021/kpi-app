const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const kpiRoutes = require("./routes/kpiRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://4smdwkmm-3000.inc1.devtunnels.ms"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    family: 4,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));

app.use("/api/auth", authRoutes);
app.use("/api/kpi", kpiRoutes);

const PORT = process.env.PORT || 5454;
