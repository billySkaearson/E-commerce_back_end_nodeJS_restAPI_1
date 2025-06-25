const mySql = require('mysql');
const sqlData = require('./sqlData');

const connection = mySql.createConnection({
  host: sqlData.HOST,
  password:sqlData.PASSWORD,
  database:sqlData.DB,
  user:sqlData.USER
})

connection.connect(error =>{
  if(!error){
    console.log('connected successfully');
  }else{
      console.log('connected feild');
  }
});

module.exports = connection;
