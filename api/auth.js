const express = require('express');
const router = express.Router();
const sql = require('../sql/connection');
const {check, validationResult} = require('express-validator');

router.post('/login',[
  check('email').notEmpty().withMessage('email cant be empty').isLength({min:3,max:11}).withMessage('email must be 3 to 11'),
  check('password').notEmpty().withMessage('password cant be empty').isLength({min:8,max:8}).withMessage('password must be 8')
],(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
  return res.status('400').json({msg:errors})
}
sql.query(`select * from users where user = "${req.body.email}" and password = "${req.body.password}" ;`,(err,result)=>{
  if(err){
    return res.status('400').json({msg:err})
  }
  if(result.length == 0){
    return res.json({msg:'user are not in'})
  }
  return res.json(result)
})
})

router.post('/singin',[  check('email').notEmpty().withMessage('email cant be empty').isLength({min:3,max:11}).withMessage('email must be 3 to 11'),
  check('password').notEmpty().withMessage('password cant be empty').isLength({min:8,max:8}).withMessage('password must be 8')],
  (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status('400').json({msg:errors})
    }
sql.query(`insert into users(id,user,password) values(null,'${req.body.email}','${req.body.password}') ;`,(err,result)=>{
if(err){
  return res.status('400').json({msg:err})
}
return res.json(result);
})
})

module.exports = router;
