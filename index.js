const express = require("express");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const forumRoutes = require("./routes/forumRoutes");
const gameRoutes = require("./routes/gameRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const profileRoutes = require("./routes/profileRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANONKEY
);

const app = express();


app.use(express.json());
app.use(cors());


app.use("/forums", forumRoutes(supabase));
app.use("/games", gameRoutes(supabase));
app.use("/reviews", reviewRoutes(supabase));
app.use("/profiles", profileRoutes(supabase));
app.use("/favorites", favoriteRoutes(supabase));

const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;