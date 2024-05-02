const express = require("express");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANONKEY
);

const app = express();
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

// Iniciar o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
