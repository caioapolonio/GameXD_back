const createComment = async (supabase, user_id, forum_id, comment) => {
    try {
      const { data, error } = await supabase.from("forum_has_comments").insert({
        user_id: user_id,
        forum_id: forum_id,
        comment: comment,
      });
  
      if (error) {
        throw error;
      }
      return data;
    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      throw err;
    }
  };
  
  const createForum = async (supabase, user_id, title, description) => {
    try {
      const { data, error } = await supabase.from("Foruns").insert({
        user_id: user_id,
        title: title,
        description: description,
      });
  
      if (error) {
        throw error;
      }
      return data;
    } catch (err) {
      console.error("Erro ao criar fórum:", err);
      throw err;
    }
  };
  
  const getAllForums = async (supabase) => {
    try {
      const { data, error } = await supabase.from("Foruns").select(
        `*,
        profiles (*)`
      );
      if (error) {
        throw error;
      }
      return data;
    } catch (err) {
      console.error("Erro ao carregar fóruns:", err);
      throw err;
    }
  };
  
  const getForumById = async (supabase, id) => {
    try {
      const { data, error } = await supabase
        .from("Foruns")
        .select(`*, profiles (*)`)
        .eq("id", id)
        .single();
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (err) {
      console.error("Erro ao carregar fórum:", err);
      throw err;
    }
  };

  const getForumComments = async (supabase, forum_id) => {
    try {
      const { data, error } = await supabase
        .from("forum_has_comments")
        .select(`*, profiles (*)`)
        .eq("forum_id", forum_id);
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (err) {
      console.error("Erro ao carregar comentários do fórum:", err);
      throw err;
    }
  };

module.exports = {
  createComment,
  createForum,
  getAllForums,
  getForumById,
  getForumComments

};
