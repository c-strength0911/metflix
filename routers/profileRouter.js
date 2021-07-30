const express = require("express");
const pool = require("../config/poolConfig");
const QUERY = require("../query/query.js");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { profileSchema } = require("../validations/userValidater");
router.get("/profile", validator.body(profileSchema), async (req, res) => {
	const userId = req.body;
  try {
    if (!req.session.userNo) {
      res.render("/login");
    }
// 	  쿼리 재확인 필요 (SELECT * FROM 수정) 
	  const result = await pool.query("SELECT * FROM user WHERE user_id=? LEFT JOIN file ON user.user_profile_file_no = file.file_no UNION SELECT * FROM user WHERE user_id=? RIGHT JOIN file ON user.user_profile_file_no = file.file_no", userId )
  } catch (error){
	console.error(error);
  }
});
