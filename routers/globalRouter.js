const express = require("express");
//const pool = require("../config/poolConfig");
//const validator = require("express-joi-validation").createValidator({});

const router = express.Router();

router.get("/", (req, res) => {
  console.log("good");
  const { nickname } = req.session;
  res.render("home", { nickname });
});

router.get("/join", (_, res) => {
  res.render("join");
});

router.get("/login", (_, res) => {
  res.render("login");
});
module.exports = router;
