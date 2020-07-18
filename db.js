const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
const dbname="leaderBoard_mongodb";
//const url=process.env.MONGODB_URI||"mongodb://localhost:27017/";
const url = "mongodb+srv://srinidhi:123321@clusterttt.lkw7g.mongodb.net/test?retryWrites=true&w=majority";
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
         //   state.db=client.db("tttboard");
            cb();          
          }
      });
       }
}

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://srinidhi:<password>@clusterttt.lkw7g.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const getPrimaryKey=(id)=>{
return ObjectID(id);
}

const getDB=()=>{
    return state.db;
}
module.exports={getDB,connect,getPrimaryKey};