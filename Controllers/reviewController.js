const reviewModel = require("../models/reviewModel");

const getReviewsByGameId = (supabase) => async (req, res) => {
  try {
    const gameId = req.params.id;
    const data = await reviewModel.getReviewsByGameId(supabase, gameId);
    return res.json(data);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return res.status(500).json({ error: "Erro ao buscar avaliações" });
  }
};

const getAllReviews = (supabase) => async (req, res) => {
    try {
      const data = await reviewModel.getAllReviews(supabase);
      return res.json(data);
    } catch (error) {
      console.error("Erro ao buscar todas as avaliações:", error);
      return res.status(500).json({ error: "Erro ao buscar todas as avaliações" });
    }
  };

  const getUserReviews = (supabase) => async (req, res) => {
    try {
      const userId = req.params.id;
      const data = await reviewModel.getUserReviews(supabase, userId);
      return res.json(data);
    } catch (error) {
      console.error("Erro ao buscar avaliações do usuário:", error);
      return res.status(500).json({ error: "Erro ao buscar avaliações do usuário" });
    }
  };

  const sendReview = (supabase) => async (req, res) => {
    const { id, user_id, review_body, star_rating } = req.body;
  
    try {
      const data = await reviewModel.sendReview(supabase, {
        id,
        user_id,
        review_body,
        star_rating,
      });
  
      return res.json(data);
    } catch (error) {
      console.error("Erro ao enviar a avaliação:", error);
      return res.status(500).json({ error: "Erro ao enviar a avaliação" });
    }
  };

  const updateReview = (supabase) => async (req, res) => {
    const { id, user_id, review_body, star_rating } = req.body;
  
    try {
      const data = await reviewModel.updateReview(supabase, {
        id,
        user_id,
        review_body,
        star_rating,
      });
  
      return res.json(data);
    } catch (error) {
      console.error("Erro ao atualizar a avaliação:", error);
      return res.status(500).json({ error: "Erro ao atualizar a avaliação" });
    }
  };

  const checkUserReview = (supabase) => async (req, res) => {
    const user_id = req.params.user_id;
    const game_id = req.params.game_id;
  
    try {
      const data = await reviewModel.checkUserReview(supabase, user_id, game_id);
      return res.json(data);
    } catch (error) {
      console.error("Erro ao verificar a avaliação do usuário:", error);
      return res.status(500).json({ error: "Erro ao verificar a avaliação do usuário" });
    }
  };

module.exports = {
  getReviewsByGameId,
  getAllReviews,
  getUserReviews,
  sendReview,
  updateReview,
  checkUserReview
};