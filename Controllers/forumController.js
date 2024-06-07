const forumModel = require("../models/forumModel");


const createComment = (supabase) => async (req, res) => {
  const { user_id, forum_id, comment } = req.body;

  try {
    const data = await forumModel.createComment(
      supabase,
      user_id,
      forum_id,
      comment
    );

    return res.json(data);
  } catch (err) {
    console.error("Erro ao criar comentário:", err);
    return res.status(500).json({ error: "Erro ao criar comentário" });
  }
};

const createForum = (supabase) => async (req, res) => {
  const { user_id, title, description } = req.body;

  try {
    const data = await forumModel.createForum(
      supabase,
      user_id,
      title,
      description
    );

    return res.json(data);
  } catch (err) {
    console.error("Erro ao criar fórum:", err);
    return res.status(500).json({ error: "Erro ao criar fórum" });
  }
};

const getAllForums = (supabase) => async (req, res) => {
  try {
    const data = await forumModel.getAllForums(supabase);
    return res.json(data);
  } catch (err) {
    console.log("Erro ao carregar fóruns:", err);
    return res.status(500).json({ error: "Erro ao carregar fóruns" });
  }
};

const getForumById = (supabase) => async (req, res) => {
  const { id } = req.params;

  try {
    const data = await forumModel.getForumById(supabase, id);
    return res.json(data);
  } catch (err) {
    console.error("Erro ao carregar fórum:", err);
    return res.status(500).json({ error: "Erro ao carregar fórum" });
  }
};

const getForumComments = (supabase) => async (req, res) => {
  const { forum_id } = req.params;

  try {
    const data = await forumModel.getForumComments(supabase, forum_id);
    return res.json(data);
  } catch (err) {
    console.error("Erro ao carregar fórum:", err);
    return res.status(500).json({ error: "Erro ao carregar fórum" });
  }
}; 

module.exports = {
  createComment,
  createForum,
  getAllForums,
  getForumById,
  getForumComments
};

