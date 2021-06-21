const express = require("express");
const pool = require("../config/poolConfig");
const validator = require("express-joi-validation").createValidator({});
const { loginSchema, userSchema } = require("../validations/userValidater");

const router = express.Router();
const query = require("../query/query");

router.post("/join", validator.body(userSchema), async (req, res) => {
  const { userId, userPassword, userNickname } = req.body;

  try {
    const [result] = await pool.query(query.USER.INSERT, [
      userId,
      userPassword,
      userNickname,
    ]);
    console.log("routing is working");
    console.log(result);
    res.status(200).json({ result: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "fail" });
  }
});
// validator.body(loginSchema)
router.post("/login", validator.body(loginSchema), async (req, res) => {
  const { id, password } = req.body;
  try {
    const [result] = await pool.query(query.USER.SELECT_BY_ID, [id, password]);
    console.log("routing is working");
    console.log(result);
    console.log(id);
    console.log(password);
    req.session.nickname = result[0].user_nickname;
    res.status(200).json({ result: "success", nickname: req.session.nickname });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "fail" });
  }
});

module.exports = router;
