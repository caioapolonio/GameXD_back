const favoriteModel = require("../models/favoriteModel");

const sendFavorite = (supabase) => async (req, res) => {
  const { id, user_id } = req.body;

  try {
    const data = await favoriteModel.sendFavorite(supabase, id, user_id);
    return res.json(data);
  } catch (error) {
    console.error("Erro ao favoritar o jogo:", error);
    return res.status(500).json({ error: "Erro ao favoritar o jogo" });
  }
};

const deleteFavorite = (supabase) => async (req, res) => {
    const { game_id, user_id } = req.params;
    try {
      const data = await favoriteModel.deleteFavorite(supabase, game_id, user_id);
      return res.json({ message: "Jogo deletado dos favoritos com sucesso", data });
    } catch (error) {
      console.error("Erro ao deletar o jogo dos favoritos:", error);
      return res.status(500).json({ error: "Erro ao deletar o jogo dos favoritos" });
    }
  };

  const checkFavorite = (supabase) => async (req, res) => {
    const user_id = req.params.user_id;
    const game_id = req.params.game_id;
  
    try {
      const data = await favoriteModel.checkFavorite(supabase, user_id, game_id);
      return res.json(data);
    } catch (error) {
      console.error("Erro ao verificar o favorito do usuário:", error);
      return res.status(500).json({ error: "Erro ao verificar o favorito do usuário" });
    }
  };

  const getUserFavorites = (supabase) => async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const data = await favoriteModel.getUserFavorites(supabase, user_id);
      return res.json(data);
    } catch (error) {
      console.error("Erro ao obter favoritos do usuário:", error);
      return res.status(500).json({ error: "Erro ao obter favoritos do usuário" });
    }
  };
  

module.exports = {
  sendFavorite,
  deleteFavorite,
  checkFavorite,
  getUserFavorites
};