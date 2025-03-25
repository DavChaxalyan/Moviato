require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const favoriteRoutes = require("./routes/favorite");
const watchlistRoutes = require("./routes/watchlist");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", watchlistRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Подключение к базе данных успешно!");
  })
  .catch((error) => {
    console.error("Ошибка подключения к базе данных:", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
