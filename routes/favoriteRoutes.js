const express = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = express.Router();



module.exports = (supabase) => {
   
  
    router.post("/send-favorite", favoriteController.sendFavorite(supabase));

    router.delete("/delete-favorite/:game_id/:user_id", favoriteController.deleteFavorite(supabase));

    router.get("/check-favorite/:user_id/:game_id", favoriteController.checkFavorite(supabase));

    router.get("/:user_id", favoriteController.getUserFavorites(supabase));

    return router;
  };