// routes/forums.js
const express = require("express");
const router = express.Router();
const forumController = require("../Controllers/forumController");

// Definindo a rota para criar um novo fórum
router.post("/new-forum", forumController.createForum);

module.exports = router;
