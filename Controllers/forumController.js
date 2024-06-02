const { createClient } = require("@supabase/supabase-js");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANONKEY
);

const app = express();
app.use(cors());

exports.createForum = async (req, res) => {
  const { user_id, title, description } = req.body;

  try {
    const { data, error } = await supabase.from("Foruns").insert({
      user_id: user_id,
      title: title,
      description: description,
    });

    if (error) {
      throw error;
    }
    return res.json(data);
  } catch (err) {
    console.error("Erro ao criar fórum:", err);
    return res.status(500).json({ error: "Erro ao criar fórum" });
  }
};
