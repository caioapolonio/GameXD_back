const express = require("express");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANONKEY
);

const app = express();
app.use(express.json());
app.use(cors());

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

app.get("/recent-games", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Games")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.get("/search-game/:query", async (req, res) => {
  const { query } = req.params;

  try {
    const { data, error } = await supabase
      .from("Games")
      .select("*")
      .ilike("name", "%" + query + "%");
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.get("/games/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const { data, error } = await supabase
      .from("Games")
      .select("*")
      .eq("id", gameId)
      .single();

    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

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

app.get("/reviews/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
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

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.get("/user-reviews/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
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
      .eq("user_id", user_id);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.post("/send-review", async (req, res) => {
  const { id, user_id, review_body, star_rating } = req.body;

  try {
    const { data, error } = await supabase.from("Reviews").insert({
      game_id: id,
      user_id: user_id,
      review_body: review_body,
      star_rating: star_rating,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao atualizar o jogo:", err);
    return res.status(500).json({ error: "Erro ao atualizar o jogo" });
  }
});

app.get("/check-user-review/:user_id/:game_id", async (req, res) => {
  const user_id = req.params.user_id;
  const game_id = req.params.game_id;

  try {
    const { data, error } = await supabase
      .from("Reviews")
      .select("*")
      .match({ user_id: user_id, game_id: game_id });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao atualizar o jogo:", err);
    return res.status(500).json({ error: "Erro ao atualizar o jogo" });
  }
});

app.put("/update-review", async (req, res) => {
  const { id, user_id, review_body, star_rating } = req.body;

  try {
    const { data, error } = await supabase
      .from("Reviews")
      .update({
        review_body: review_body,
        star_rating: star_rating,
      })
      .match({ user_id: user_id, game_id: id });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao atualizar o jogo:", err);
    return res.status(500).json({ error: "Erro ao atualizar o jogo" });
  }
});

app.post("/send-favorite", async (req, res) => {
  const { id, user_id } = req.body;

  try {
    const { data, error } = await supabase.from("user_favorite_game").insert({
      game_id: id,
      user_id: user_id,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao favoritar o jogo:", err);
    return res.status(500).json({ error: "Erro ao favoritar o jogo" });
  }
});

app.delete("/delete-favorite/:game_id/:user_id", async (req, res) => {
  const { game_id, user_id } = req.params;
  try {
    const { data, error } = await supabase
      .from("user_favorite_game")
      .delete()
      .match({ game_id: game_id, user_id: user_id });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ message: "Jogo deletado com sucesso", data });
  } catch (err) {
    console.error("Erro ao deletar o jogo:", err);
    return res.status(500).json({ error: "Erro ao deletar o jogo" });
  }
});

app.get("/check-favorite/:user_id/:game_id", async (req, res) => {
  const user_id = req.params.user_id;
  const game_id = req.params.game_id;

  try {
    const { data, error } = await supabase
      .from("user_favorite_game")
      .select("*")
      .match({ user_id: user_id, game_id: game_id });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao checar :", err);
    return res.status(500).json({ error: "Erro ao atualizar o jogo" });
  }
});

app.get("/favorites/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
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
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao obter dados de favoritos :", err);
    return res.status(500).json({ error: "Erro ao atualizar o jogo" });
  }
});

app.get("/foruns", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Foruns").select(
      `*,
    profiles (*)
    `
    );
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao carregar foruns", err);
    return res.status(500).json({ error: "Erro ao carregar foruns" });
  }
});

app.get("/forum-comments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("forum_has_comments")
      .select(
        `*,
    profiles (*)
  `
      )
      .eq("forum_id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao carregar forum", err);
    return res.status(500).json({ error: "Erro ao carregar forum" });
  }
});

app.get("/forum/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("Foruns")
      .select(
        `*,
    profiles (*)
    `
      )
      .eq("id", id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erro ao carregar forum", err);
    return res.status(500).json({ error: "Erro ao carregar forum" });
  }
});
app.post("/new-forum", async (req, res) => {
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
    console.error("Erro ao criar forum o jogo:", err);
    return res.status(500).json({ error: "Erro ao criar forum" });
  }
});

app.post("/new-comment", async (req, res) => {
  const { user_id, forum_id, comment } = req.body;

  try {
    const { data, error } = await supabase.from("forum_has_comments").insert({
      user_id: user_id,
      forum_id: forum_id,
      comment: comment,
    });

    if (error) {
      throw error;
    }
    return res.json(data);
  } catch (err) {
    console.error("Erro ao criar forum o jogo:", err);
    return res.status(500).json({ error: "Erro ao criar forum" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
