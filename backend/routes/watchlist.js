const express = require("express");
const Watchlist = require("../models/Watchlists");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

router.post("/watchlist", authenticateToken, async (req, res) => {
  try {
    const { userId, movieData } = req.body;

    if (!userId || !movieData || !movieData.id) {
      return res.status(400).json({ message: "Отсутствуют необходимые данные" });
    }

    // Проверяем, есть ли уже этот фильм в watchlist
    const existingWatchlist = await Watchlist.findOne({ userId, "movieData.id": movieData.id });

    if (existingWatchlist) {
      // Если фильм уже есть — удаляем его
      await Watchlist.deleteOne({ _id: existingWatchlist._id });
      return res.status(200).json({ message: "Фильм удалён из списка просмотра" });
    }

    // Если фильма нет — добавляем
    const newWatchlist = new Watchlist({ userId, movieData });
    await newWatchlist.save();

    res.status(201).json({ message: "Фильм добавлен в список просмотра", watchlist: newWatchlist });
  } catch (error) {
    console.error("Ошибка при обработке списка просмотра:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/watchlists/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Отсутствует userId" });
    }

    // Получаем все фильмы из избранного пользователя
    const watchlists = await Watchlist.find({ userId });

    res.status(200).json(watchlists);
  } catch (error) {
    console.error("Ошибка при получении избранных фильмов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
