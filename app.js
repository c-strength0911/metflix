const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require("./config/databaseConfig");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const multer = require("multer");
const pool = require("./config/poolConfig");
const path = require("path");

const uploadImage = multer({
  dest: "uploads/images",
  fileFilter: (res, file, cb) => {
    let fileExt = file.mimetype.split("/")[1];
    console.log(file.mimetype.split("/"));
    console.log(file);
    if (fileExt == "img" || fileExt == "png") {
      cb(null, true);
    } else {
      cb(new Error("Not supported extension"));
    }
  },
});

const uploadVideo = multer({
  dest: "uploads/videos",
  fileFilter: (res, file, cb) => {
    let fileExt = file.mimetype.split("/")[1];
    if (
      fileExt == "mp4" ||
      fileExt == "avi" ||
      fileExt == "mov" ||
      fileExt == "ogg" ||
      fileExt == "fiv" ||
      fileExt == "mkv"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Not supported extension"));
    }
  },
});

// const fileFilter = function (res, file, cb) {
//   let fileType = file.mimetype.split("/");
//   let filePath = file.path;
// };
app.set("view engine", "ejs");
app.use(
  session({
    secret: "sdfg56456dfsgasfgd",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json());

const PORT = 8000;
app.get("/", (req, res) => {
  console.log("good");
  const { nickname } = req.session;
  res.render("home", { nickname });
});

// app.post("/file/image", uploadImage.single("imageFile"), (req, res) => {
//   let ext = path.extname(req.file.originalname);
//   let url = req.file.destination;
//   let type = "IMAGE";
//   let status = "002"; // 임시

//   const imageUploadQuery =
//     "INSERT INTO file(file_ext, file_url, file_type, file_status) VALUE(?,?,?,?)";
//   console.log(path.extname(req.file.originalname));
//   connection.query(imageUploadQuery, [ext, url, type, status], (err) => {
//     if (err) {
//       console.log(err);
//       res.status(400).json({ result: "false", errorMsg: err });
//     } else {
//     }
//   });
//   connection.query(
//     "select file_no from file order by file_no desc limit 1;",
//     (err, result, field) => {
//       console.log(result);
//       res.status(200).json({ result: "success", fileNo: result });
//     }
//   );
// });

app.post("/file/image", uploadImage.single("imageFile"), async (req, res) => {
  let ext = path.extname(req.file.originalname);
  let url = req.file.destination;
  let type = "IMAGE";
  let status = "002"; // 임시

  const imageUploadQuery =
    "INSERT INTO file(file_ext, file_url, file_type, file_status) VALUE(?,?,?,?)";
  // console.log(path.extname(req.file.originalname));

  try {
    const [result] = await pool.query(imageUploadQuery, [
      ext,
      url,
      type,
      status,
    ]);
    console.log(result);
    res.status(200).json({ result: "success", fileNo: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "false", errorMsg: error });
  }
  // try {
  //   pool.query(
  //     "select file_no from file order by file_no desc limit 1;",
  //     (err, result, field) => {
  //       console.log(req.file.destination);
  //       res.status(200).json({ result: "success", fileNo: result });
  //     }
  //   );
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).json({ result: "false", errorMsg: error });
  // }
});

app.post("/file/video", uploadVideo.single("videoFile"), (req, res, next) => {
  console.log(path.extname(req.file.originalname));
  res.send("success");
});
app.get("/join", (req, res) => {
  res.render("join");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/user/join", (req, res) => {
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
      return res.status(500).json({ result: "fail" }).render("login");
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
