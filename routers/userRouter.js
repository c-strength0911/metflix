const express = require("express");
const pool = require("../config/poolConfig");
const validator = require("express-joi-validation").createValidator({});
const { loginSchema, joinSchema } = require("../validations/userValidater");

const router = express.Router();
const query = require("../query/query");

router.post("/join", validator.body(joinSchema), async (req, res) => {
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
  console.log("routing is working");
  const { id, password } = req.body;
  try {
    const [result] = await pool.query(query.USER.SELECT_BY_ID, [id, password]);
    // console.log(result);
    // console.log(id);
    // console.log(password);
    const user = result[0];
    // req.session.userNo = result[0].user_no;
    // req.session = req.session.nickname
    // console.log(req.session.user);

    // ✔✔✔✔✔ 이부분이 잘 안되는 것 같습니다. 
    // 로그인을 한 후에 리다이렉트 후 home 화면에서 user의 nickname을 표시하지 않습니다
    // 클라이언트 쪽에서 session 정보가 없는 것을 보아 제대로 session이 저장되지 않은 것 같은데
    // 어디가 문제인지 모르겠어요ㅠㅠ 
    req.session.user = user;
    // ✔✔✔✔✔
    
    
    
    // console.log(result[0])
    console.log(req.session)
    console.log("redirect")
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: "fail" });
  }
});

router.get("/logout", (req, res)=>{
  try{
    req.session.destroy();
    res.redirect("/");
  }catch(error){
    res.status(400).send;
  }
  })
module.exports = router;
