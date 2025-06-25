const moment = require('moment');

const logger = (req,res,next) =>{
  console.log(`protocol : ${req.protocol} host : ${req.get('host')} url: ${req.originalUrl} date:${moment().format()} ip:${req.ip} `);
  next();
}

module.exports = logger;
