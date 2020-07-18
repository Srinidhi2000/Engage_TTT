const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
const dbname="leaderBoard_mongodb";
const url=process.env.MONGODB_URI||"mongodb://localhost:27017/test";
const mongoOptions={useNewUrlParser:true};
const state={
    db:null
};

const connect=(cb)=>{
    if(state.db){
        cb();
    }else{
      MongoClient.connect(url,mongoOptions,(err,client)=>{
          if(err){
              cb(err);
          }else{
            state.db=client.db("ClusterTTT");
            cb();          
          }
      });
       }
}

const getPrimaryKey=(id)=>{
return ObjectID(id);
}

const getDB=()=>{
    return state.db;
}
module.exports={getDB,connect,getPrimaryKey};