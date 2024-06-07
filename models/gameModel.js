const getAllGames = async (supabase) => {
    try {
      const { data, error } = await supabase.from("Games").select("*");
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
      throw error;
    }
  };

  const getRecentGames = async (supabase) => {
    try {
      const { data, error } = await supabase
        .from("Games")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar jogos recentes:", error);
      throw error;
    }
  };

  const searchGame = async (supabase, query) => {
    try {
      const { data, error } = await supabase
        .from("Games")
        .select("*")
        .ilike("name", `%${query}%`);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
      throw error;
    }
  };

  const getGameById = async (supabase, gameId) => {
    try {
      const { data, error } = await supabase
        .from("Games")
        .select("*")
        .eq("id", gameId)
        .single();
  
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar jogo:", error);
      throw error;
    }
  };
  
  const updateGame = async (supabase, gameData) => {
    try {
      const { data, error } = await supabase
        .from("Games")
        .update(gameData)
        .eq("id", gameData.id);
  
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao atualizar o jogo:", error);
      throw error;
    }
  };

  const deleteGame = async (supabase, id) => {
    try {
      const { data, error } = await supabase.from("Games").delete().eq("id", id);
  
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao deletar o jogo:", error);
      throw error;
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
