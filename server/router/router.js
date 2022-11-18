const express = require("express");
const conn = require("../config")


const router = express.Router();

router.get('/routerMain',()=>{
  console.log('main router enter')
})

router.post("/lifeConcierge/api/signup", (req,res)=>{
  const sql = "insert into userinfo values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), 0, null);";
  const params = [req.body.email, req.body.pw, req.body.name, req.body.gender, req.body.birthday, req.body.job, req.body.hAddr, req.body.cAddr, req.body.disease, 
    req.body.transpo, req.body.hobby, req.body.food, req.body.drink, req.body.mbti, req.body.fashion, req.body.music
  ]
  console.log(params);
  // const query1 = conn.format(sqlQuery1, params1);

  conn.query(sql, params, (err, rows)=>{
    if(err) {
      console.log("에러");
      res.json(err);
    }else if (rows.length == 0){
      console.log ("값이 없음")
      res.json(err);
    }else {
      console.log(rows);
      res.json(rows)
    }
  })
})

router.post("/lifeConcierge/api/login",(req,res)=>{
  const email = req.body.email;
  const pw = req.body.pw;
  console.log(`전달받은 email : ${email}, pw : ${pw}`);
  const sql = 'select * from userinfo where email=? and pw=?';
  
  conn.query(sql, [email, pw], (err, rows) => {
    if (err){
      console.log("에러 발생");
    } else if (rows.length == 0) {
      console.log('id가 없습니다.');
      res.json("NoneId");
    } else {
      req.session.user = rows[0];
      console.log(req.session.user);
      res.send({rows});
    }
  });
})

router.get("/lifeConcierge/api/logout", (req,res)=>{
  delete req.session.user;
  res.send(req.session.user);
})

router.get('/lifeConcierge/api/userInfo', (req,res)=>{
  conn.query('select * from userinfo where isDeleted = 0', (err,rows)=>{
    if(!err) {
      res.json(rows);
    }else{
      console.log(err);
    }
  })
})

router.post('/lifeConcierge/api/userDelete', (req,res)=>{
  const email = req.body.email;
  conn.query('update userinfo set isDeleted = 1 where email = ?', [email], (err, rows)=>{
    if(err){
      console.log("에러");
    }else if(rows.length == 0) {
      console.log("아이디 없음");
    }else {
      res.send("emralr");
    }
  })
})

router.post('/lifeConcierge/api/addEvent', (req,res)=> {
  const title = req.body.title;
  const sDate = req.body.sDate;
  const sTime = req.body.sTime;
  const eDate = req.body.eDate;
  const eTime = req.body.eTime;
  const content = req.body.content;
  const location = req.body.location;
  const isDaily = req.body.isDaily;
  const params = [title, sDate, sTime, eDate, eTime, content, location, isDaily, params]
})

router.get('/lifeConcierge/api/session', (req,res)=>{
  console.log(req.session.user);
  res.send(req.session.user);
})



module.exports = router;