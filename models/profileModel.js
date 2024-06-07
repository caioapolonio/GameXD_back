const getAllProfiles = async (supabase) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
      throw error;
    }
  };
  
  module.exports = {
    getAllProfiles,
  };