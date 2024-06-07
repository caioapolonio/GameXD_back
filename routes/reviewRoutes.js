const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();


module.exports = (supabase) => {
   
    router.get("/:id", reviewController.getReviewsByGameId(supabase));

    router.get("/", reviewController.getAllReviews(supabase));

    router.get("/user-reviews/:id", reviewController.getUserReviews(supabase));

    router.post("/send-review", reviewController.sendReview(supabase));

    router.put("/update-review", reviewController.updateReview(supabase));

    router.get("/check-user-review/:user_id/:game_id", reviewController.checkUserReview(supabase));

    return router;
  };