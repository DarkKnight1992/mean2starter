const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = process.env.DB_HOST;

let dbInstance;

const initDBConnection = function(cb){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbInstance = db;
    if(cb && typeof(cb) == 'function')
        cb(dbInstance);
  });
}


const getInstance = function(cb){
  if(!dbInstance){
    initDBConnection(db => {
      return db;
    })
  }
  else{
      return dbInstance;
  }
}

module.exports = {
  initDBConnection: initDBConnection,
  getInstance: getInstance
}