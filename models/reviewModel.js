const getReviewsByGameId = async (supabase, gameId) => {
    try {
      const { data, error } = await supabase
        .from("Reviews")
        .select(
          `
          id,
          game_id,
          user_id,
          star_rating,
          review_body,
          profiles (
            id,
            username,
            avatar_url
          )
          `
        )
        .eq("game_id", gameId);
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      throw error;
    }
  };

  const getAllReviews = async (supabase) => {
    try {
      const { data, error } = await supabase.from("Reviews").select("*");
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar todas as avaliações:", error);
      throw error;
    }
  };

  const getUserReviews = async (supabase, userId) => {
    try {
      const { data, error } = await supabase
        .from("Reviews")
        .select(
          `
          id,
          game_id,
          user_id,
          star_rating,
          review_body,
          profiles (
            id,
            username,
            avatar_url
          ),
          Games (
            game_id,
            name,
            header_image
          )`
        )
        .eq("user_id", userId);
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao buscar avaliações do usuário:", error);
      throw error;
    }
  };

  const sendReview = async (supabase, reviewData) => {
    try {
      const { data, error } = await supabase.from("Reviews").insert({
        game_id: reviewData.id,
        user_id: reviewData.user_id,
        review_body: reviewData.review_body,
        star_rating: reviewData.star_rating,
      });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao enviar a avaliação:", error);
      throw error;
    }
  };
  
  const updateReview = async (supabase, reviewData) => {
    try {
      const { data, error } = await supabase
        .from("Reviews")
        .update({
          review_body: reviewData.review_body,
          star_rating: reviewData.star_rating,
        })
        .match({ user_id: reviewData.user_id, game_id: reviewData.id });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao atualizar a avaliação:", error);
      throw error;
    }
  };

  const checkUserReview = async (supabase, user_id, game_id) => {
    try {
      const { data, error } = await supabase
        .from("Reviews")
        .select("*")
        .match({ user_id, game_id });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao verificar a avaliação do usuário:", error);
      throw error;
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