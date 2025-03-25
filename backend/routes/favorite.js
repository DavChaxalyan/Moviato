const express = require("express");
const Favorite = require("../models/Favorite");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

router.post("/favorite", authenticateToken, async (req, res) => {
  try {
    const { userId, movieData } = req.body;

    if (!userId || !movieData || !movieData.id) {
      return res.status(400).json({ message: "Отсутствуют необходимые данные" });
    }

    // Проверяем, есть ли уже этот фильм в избранном
    const existingFavorite = await Favorite.findOne({ userId, "movieData.id": movieData.id });

    if (existingFavorite) {
      // Если фильм уже в избранном — удаляем
      await Favorite.deleteOne({ _id: existingFavorite._id });
      return res.status(200).json({ message: "Фильм удалён из избранного" });
    }

    // Если фильма нет — добавляем
    const newFavorite = new Favorite({ userId, movieData });
    await newFavorite.save();

    res.status(201).json({ message: "Фильм добавлен в избранное", favorite: newFavorite });
  } catch (error) {
    console.error("Ошибка при обработке избранного:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Получить все избранные фильмы пользователя
router.get("/favorites/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Отсутствует userId" });
    }

    // Получаем все фильмы из избранного пользователя
    const favorites = await Favorite.find({ userId });

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Ошибка при получении избранных фильмов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
