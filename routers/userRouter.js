const express = require("express");
const PoolConnection = require("mysql2/typings/mysql/lib/PoolConnection");
const pool = require("../config/poolConfig");

const router = express.Router();
const query = require("../query/query");

router.post("/join", async (req, res) => {
  const { userId, userPassword, userNickname } = req.body;

  try {
    const result = await pool.query(query.USER.INSERT, [
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

router.post("/login");

module.exports = router;
