const express = require("express");
const uploadFile = require("../middlewares/fileUpload");

const pool = require("../config/poolConfig.js");
const router = express.Router();

router.post("/:fileType", uploadFile, async (req, res) => {
  const { file } = req;
  const fileUrl = file.path;
  const fileType = req.params.fileType;
  const fileExtension = file.mimetype.split("/")[1];
  let status = "002"; // 임시
  try {
    const [result] = await pool.query(QUERY.FILE.INSERT, [
      fileExtension,
      fileUrl,
      fileType,
      status,
    ]);
    console.log("routing is working");
    console.log(result);
    res.status(200).json({ result: "success", fileNo: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "false", errorMsg: error });
  }
});

module.exports = router;
