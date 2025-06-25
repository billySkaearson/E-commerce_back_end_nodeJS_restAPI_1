const express = require('express');
const router = express.Router();
const {validationResult, check} = require('express-validator');
const sql = require('../sql/connection');


router.get('/',(req,res)=>{
sql.query('select * from prodacts',(err,result)=>{
  if(err){

    return res.status('500').json({msg:'error ocord '})
  }
  return res.json(result)
});

});

router.get('/:id',(req,res)=>{
  sql.query(`select * from prodacts where id = ${req.params.id}`,(err,result)=>{
    if(err){

      return res.status('500').json({msg:'error ocord '})
    }
    return res.json(result)
  });

});

router.post('/',
[check('title').notEmpty().withMessage("title can't be empty").isLength({min:5,max:20}).withMessage('title must be 5 to 20'),
check('price').notEmpty().withMessage("price can't be empty").isLength({min:1,max:7}).withMessage('price must be 1 to 7'),
check('imageUrl').notEmpty().withMessage("imageUrl can't be empty"),
check('description').notEmpty().withMessage("description can't be empty").isLength({min:50,max:500}).withMessage('description must be 50 to 500'),
]
,(req,res)=>{
  sql.query(`insert into prodacts(id,ownerid,title,price,imageUrl,description,size,color)
   values(null,${req.body.ownerId},"${req.body.title}",${req.body.price},"${req.body.imageUrl}","${req.body.description}","${req.body.size}","${req.body.color}")`,(err,result)=>{
     if(err){
         return res.status('500').json({msg:'error ocored '})
     }
     const errors = validationResult(req);
     if(!errors.isEmpty()){
       return res.status(400).json({msg:errors})
   }
    return res.json({msg:'added sucssfuly'})
   })
});

router.put('/:id',
[check('title').notEmpty().withMessage("title can't be empty").isLength({min:5,max:20}).withMessage('title must be 5 to 20'),
check('price').notEmpty().withMessage("price can't be empty").isLength({min:1,max:7}).withMessage('price must be 1 to 7'),
check('imageUrl').notEmpty().withMessage("imageUrl can't be empty"),
check('description').notEmpty().withMessage("description can't be empty").isLength({min:50,max:500}).withMessage('description must be 50 to 500'),
]
,(req,res)=>{
  sql.query(`UPDATE prodacts SET title="${req.body.title}",price=${req.body.price},imageUrl="${req.body.imageUrl}",description="${req.body.description}" WHERE id = '${req.params.id}';`,(err,result)=>{
    if(err){
      return res.status('500').json({msg:'error ocored'})
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({msg:errors})
   }
    return res.json({msg:'updated sucssfuly'})
  })
});

router.delete('/:id',(req,res)=>{
  sql.query(`delete from prodacts where id = ${req.params.id};`,(err,result)=>{
    if(err){
      return res.status(500).json({msg:'error ocored'})
    }
    if(!req.params.id){
      return res.status(400).json({msg:'user error'})
    }
    return res.json({msg:'deleted sucssfuly'})
  })
});

module.exports = router;
