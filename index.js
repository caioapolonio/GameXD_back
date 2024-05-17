const express = require("express");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANONKEY
);

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/games", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Games").select("*");
    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

// Função para obter dados da tabela 'games' com base em um ID específico
app.get("/games/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const { data, error } = await supabase
      .from("Games")
      .select("*")
      .eq("id", gameId);

    if (error) {
      throw error;
    }

    // Devolver os dados como JSON
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

//Rota para realizar a atualização do game
app.put("/update-game", async (req, res) => {
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
    const { data, error } = await supabase
      .from("Games")
      .update({
        short_description: short_description,
        header_image: header_image,
        publishers: publishers,
        genres: genres,
        release_date: release_date,
        name: name,
      })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao atualizar o jogo:", err);
    return res.status(500).json({ error: "Erro ao atualizar o jogo" });
  }
});

// Rota para deletar um jogo da tabela 'Games' no Supabase pelo id
app.delete("/delete-game/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from("Games").delete().eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: "Jogo deletado com sucesso", data });
  } catch (err) {
    console.error("Erro ao deletar o jogo:", err);
    return res.status(500).json({ error: "Erro ao deletar o jogo" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
