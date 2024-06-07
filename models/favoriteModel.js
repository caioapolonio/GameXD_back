const sendFavorite = async (supabase, id, user_id) => {
    try {
      const { data, error } = await supabase.from("user_favorite_game").insert({
        game_id: id,
        user_id,
      });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao favoritar o jogo:", error);
      throw error;
    }
  };

  const deleteFavorite = async (supabase, game_id, user_id) => {
    try {
      const { data, error } = await supabase
        .from("user_favorite_game")
        .delete()
        .match({ game_id, user_id });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao deletar o jogo dos favoritos:", error);
      throw error;
    }
  };

  const checkFavorite = async (supabase, user_id, game_id) => {
    try {
      const { data, error } = await supabase
        .from("user_favorite_game")
        .select("*")
        .match({ user_id, game_id });
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao verificar o favorito do usuário:", error);
      throw error;
    }
  };

  const getUserFavorites = async (supabase, user_id) => {
    try {
      const { data, error } = await supabase
        .from("user_favorite_game")
        .select(
          `
          *,
          Games(*)
          `
        )
        .eq("user_id", user_id);
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error("Erro ao obter favoritos do usuário:", error);
      throw error;
    }
  };
  
  module.exports = {
    sendFavorite,
    deleteFavorite,
    checkFavorite,
    getUserFavorites
  };