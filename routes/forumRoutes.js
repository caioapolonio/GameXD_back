const express = require("express");
const forumController = require("../controllers/forumController");

const router = express.Router();



module.exports = (supabase) => {
   
    router.post("/new-comment", forumController.createComment(supabase));
  
    
    router.post("/new-forum", forumController.createForum(supabase));
  
   
    router.get("/", forumController.getAllForums(supabase));
  
   
    router.get("/forum/:id", forumController.getForumById(supabase));
    

    router.get("/forum/:forum_id/comments", forumController.getForumComments(supabase));

    return router;
  };