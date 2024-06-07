const profileModel = require("../models/profileModel");

const getAllProfiles = (supabase) => async (req, res) => {
  try {
    const data = await profileModel.getAllProfiles(supabase);
    return res.json(data);
  } catch (error) {
    console.error("Erro ao buscar perfis:", error);
    return res.status(500).json({ error: "Erro ao buscar perfis" });
  }
};

module.exports = {
  getAllProfiles,
};