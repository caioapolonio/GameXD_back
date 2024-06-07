const gameModel = require("../models/gameModel");

const getAllGames = (supabase) => async (req, res) => {
  try {
    const data = await gameModel.getAllGames(supabase);
    return res.json(data);
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return res.status(500).json({ error: "Erro ao buscar jogos" });
  }
};

const getRecentGames = (supabase) => async (req, res) => {
    try {
      const data = await gameModel.getRecentGames(supabase);
      return res.json(data);
    } catch (error) {
      console.error("Erro ao buscar jogos recentes:", error);
      return res.status(500).json({ error: "Erro ao buscar jogos recentes" });
    }
  };


const searchGame = (supabase) => async (req, res) => {
  const { query } = req.params;

  try {
    const data = await gameModel.searchGame(supabase, query);
    return res.json(data);
  } catch (error) {
    console.error("Erro ao buscar jogo:", error);
    return res.status(500).json({ error: "Erro ao buscar jogo" });
  }
};

const getGameById = (supabase) => async (req, res) => {
    try {
      const gameId = req.params.id;
      const data = await gameModel.getGameById(supabase, gameId);
      return res.json(data);
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
      return res.status(500).json({ error: "Erro ao buscar jogo" });
    }
  };


  const updateGame = (supabase) => async (req, res) => {
    const {
      id,
      short_description,
      header_image,
      publishers,
      genres,
      release_date,
      name,
    } = req.body;
  
    try {
      const data = await gameModel.updateGame(supabase, {
        id,
        short_description,
        header_image,
        publishers,
        genres,
        release_date,
        name,
      });
      return res.json(data);
    } catch (error) {
      console.error("Erro ao atualizar o jogo:", error);
      return res.status(500).json({ error: "Erro ao atualizar o jogo" });
    }
  };

  const deleteGame = (supabase) => async (req, res) => {
    const { id } = req.params;
    try {
      const data = await gameModel.deleteGame(supabase, id);
      return res.json({ message: "Jogo deletado com sucesso", data });
    } catch (error) {
      console.error("Erro ao deletar o jogo:", error);
      return res.status(500).json({ error: "Erro ao deletar o jogo" });
    }
  };
  
module.exports = {
  getAllGames,
  getRecentGames,
  searchGame,
  getGameById,
  updateGame,
  deleteGame
};