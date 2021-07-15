const express = require("express");
//const pool = require("../config/poolConfig");
//const validator = require("express-joi-validation").createValidator({});

const router = express.Router();

router.get("/", (req, res) => {
  console.log("good");

  // 세션 로깅
  console.log(req.session.user);
  
  const { user } = req.session;
  res.render("home", { user });

});

router.get("/join", (_, res) => {
  res.render("join");
});

router.get("/login", (_, res) => {
  res.render("login");
});
module.exports = router;
