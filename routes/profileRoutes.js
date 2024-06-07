const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();



module.exports = (supabase) => {
   
    router.get("/", profileController.getAllProfiles(supabase));


    return router;
  };