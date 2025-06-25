const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const sql = require('../sql/connection')

router.get('/:id',check('id').notEmpty().withMessage('id cont be empty'),(req,res)=>{
sql.query(`select * from orders where userid = ${req.params.id} ;`,(err,result)=>{
  if(err){
    return res.status('500').json({msg:err})
  }
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status('400').json({msg:errors})
  }
  return res.json(result)
})
});
router.post('/',
[check('items').notEmpty().withMessage('items cont be empty').isLength({min:3,max:300}).withMessage('items must be 3 to 300'),
check('totalAmont').notEmpty().withMessage('items cont be empty'),
check('userid').notEmpty().withMessage('userid cont be empty'),]
,(req,res)=>{
sql.query(`insert into orders(id,items,totalAmont,date,userid) values(null,'${req.body.items}',${req.body.totalAmont},current_timestamp(),${req.body.userid})`,(err,result)=>{
  if(err){
    return res.status('500').json({msg:err})
  }
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status('400').json({msg:errors})
  }
  return res.json({msg:'added susfully'})
})
});

module.exports = router;
