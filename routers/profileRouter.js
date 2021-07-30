const express = require("express");
const pool = require("../config/poolConfig");
const QUERY = require("../query/query.js");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { profileSchema } = require("../validations/userValidater");
router.get("/profile", validator.body(profileSchema), async (req, res) => {
  try {
    if (!req.session.userNo) {
      res.render("/login");
    }
	  const result = await pool.query("SELECT * FROM user LEFT JOIN file ON user.user_profile_file_no = file.file_no UNION SELECT * FROM user RIGHT JOIN file ON user.user_profile_file_no = file.file_no")
  } catch (error){
	console.error(error);
  }
	
});
