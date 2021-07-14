const express = require("express");
const pool = require("../config/poolConfig");
const QUERY = require("../query/query.js");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { profileSchema } = require("../validations/userValidater");
router.get("/profile", validator.body(profileSchema), (req, res) => {
  try {
    if (!req.session.userNo) {
      res.render("/login");
    }
    
  } catch {

  }
});
