const express = require("express");
const gameController = require("../controllers/gameController");

const router = express.Router();


module.exports = (supabase) => {
   
    router.get("/", gameController.getAllGames(supabase));

    router.get("/recent-games", gameController.getRecentGames(supabase));

    router.get("/search-game/:query", gameController.searchGame(supabase));

    router.get("/:id", gameController.getGameById(supabase));

    router.put("/update-game", gameController.updateGame(supabase));

    router.delete("/delete-game/:id", gameController.deleteGame(supabase));

    return router;
  };