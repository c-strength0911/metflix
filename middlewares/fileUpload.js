const multer = require("multer");

const IMAGE_TYPE = "image";
const VIDEO_TYPE = "video";

const fileFilter = (req, file, cb) => {
  const fileType = req.params.fileType;
  const fileExt = file.mimetype.split("/")[1];
  console.log("file type : " + fileType);
  console.log("file extantion : " + fileExt);

  if (fileType == IMAGE_TYPE && !(fileExt === "img" || fileExt === "png")) {
    console.log("이미지 아님");
    cb(new Error("NotSupportMideaType"));
  } else if (
    fileType == VIDEO_TYPE &&
    !(
      fileExt === "mp4" ||
      fileExt === "mkv" ||
      fileExt === "avi" ||
      fileExt === "ogg" ||
      fileExt === "flv"
    )
  ) {
    console.log("동영상 아님!!!");
    cb(new Error("NotSupportMideaType"));
  }

  cb(null, true);
};

const imageUpload = multer({
  dest: "uploads/images",
  fileFilter,
}).single("uploadFile");

const videoUpload = multer({
  dest: "uploads/videos",
  fileFilter,
}).single("uploadFile");

const uploadFile = (req, res, next) => {
  const fileType = req.params.fileType;
  console.dir(req.body);
  console.dir(req.params);

  // 파일 업로드 후처리 함수
  const handleAfterUpload = (err) => {
    console.dir(req.file);
    console.dir(req.body);

    /**
     * 파일 업로드 에러 처리
     */
    if (err) {
      console.lpg(err);
      /* 예상치 못한 파일이 들어온 경우 */
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json({ result: "fail", errorMsg: "Unexpected Param Name" });
      }
      return res.status(415).json({ result: "fail", errorMsg: err.message });
    }
    // 파일이 업로드 되지 못한 경우
    if (!req.file) {
      return res
        .status(400)
        .json({ result: "fail", errorMsg: "Not Selected File" });
    }
    next();
  };

  /**
   * file Type 유효성 검증 및 파일 업로드 처리
   */
  if (fileType === IMAGE_TYPE) {
    imageUpload(req, res, handleAfterUpload);
  } else if (fileType === VIDEO_TYPE) {
    videoUpload(req, res, handleAfterUpload);
  } else {
    res.status(400).json({ result: "fail", errorMsg: "Wrong File Type" });
  }
};

module.exports = uploadFile;
