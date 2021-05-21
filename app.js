const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const multer = require("multer");
const path = require("path");

const uploadImage = multer({ dest: "uploads/images" });
const uploadVideo = multer({ dest: "uploads/videos" });
app.use(
  session({
    secret: "sdfg56456dfsgasfgd",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json());
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "metflix",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log("✔✔Connected to Mysql✔✔");
  }
});
const PORT = 8000;
app.get("/", (req, res) => {
  console.log("good");
  res.send("express start");
});

app.post("/file/image", uploadImage.single("imageFile"), (req, res) => {
  let ext = path.extname(req.file.originalname);
  let url = req.file.destination;
  let type = "IMAGE";
  let status = "002"; // 임시

  const imageUploadQuery =
    "INSERT INTO file(file_ext, file_url, file_type, file_status) VALUE(?,?,?,?)";
  console.log(path.extname(req.file.originalname));
  connection.query(imageUploadQuery, [ext, url, type, status], (err) => {
    if (err) {
      console.log(err);
      res.status(400).json({ result: "false", errorMsg: err });
    } else {
    }
  });
  connection.query(
    "select file_no from file order by file_no desc limit 1;",
    (err, result, field) => {
      console.log(result);
      res.status(200).json({ result: "success", fileNo: result });
    }
  );
});

app.post("/file/video", uploadVideo.single("videoFile"), (req, res, next) => {
  console.log(path.extname(req.file.originalname));
  res.send("success");
});

app.post("/user", (req, res) => {
  const signUpQuery =
    "INSERT INTO user(user_id, user_password, user_nickname, user_type) VALUE(?,?,?,?)";
  const { id, password, nickname } = req.body;
  connection.query(signUpQuery, [id, password, nickname, "nomal"], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: "fail" });
    } else {
      return res.status(200).json({ result: "success" });
    }
  });
});

app.post("/user/login", (req, res) => {
  const signInQuery = "select * from user where user_id=? and user_password=?";
  const { id, password } = req.body;

  connection.query(signInQuery, [id, password], (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ result: "fail" });
    } else {
      req.session.nickname = rows[0].user_nickname;
      return res
        .status(200)
        .json({ result: "success", nickname: req.session.nickname });
    }
  });
});

app.listen(PORT, () => {
  console.log(`OPENED PORT : ${PORT}`);
});
