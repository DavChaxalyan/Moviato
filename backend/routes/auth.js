const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email уже используется" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Пользователь зарегистрирован", token });

  } catch (error) {
    console.log("Ошибка сервера", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Вход
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Неверные учетные данные" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Неверные учетные данные" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Вход выполнен", token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.log("Ошибка сервера", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/profile", async (req, res) => {
  
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    
    if (!token) return res.status(401).json({ message: "Токен не предоставлен" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    res.json(user); 
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


module.exports = router;
