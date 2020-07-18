const express=require('express');
const bodyParser=require('body-parser');
const script=express();
script.use(bodyParser.json());
const path=require('path');
const db=require('./db');
const collection='leaderBoard';
var PORT=process.env.PORT||3000;
script.use(express.static(path.join(__dirname, 'public')));
db.connect((err)=>{
    if(err){
        console.log('unable to connect to database'+err);
    }else{
script.listen(PORT,()=>{
    console.log('connected to database');
});
}
});
script.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'tic_tac_toe.html'));
});

script.get('/:username',(req,res)=>{
   const username=req.params.username;
db.getDB().collection(collection).find({Name:username}).toArray((err,documents)=>{
    if(err){
        console.log(err);
    }else{
        res.json(documents);
        console.log(documents);
    }
});
});
// script.get('/getleaderBoard',(req,res)=>{
    
//  db.getDB().collection(collection).find({}).toArray((err,documents)=>{
//      if(err){
//          console.log(err);
//      }else{
//          res.json(documents);
//          console.log("entire"+documents);
//      }
//  });
//  });
    
script.put('/:id',(req,res)=>{
const userID=req.params.id;
const userInput=req.body;
db.getDB().collection(collection).findOneAndUpdate({_id:db.getPrimaryKey(userID)},{$set:{Time:userInput.Time,score:userInput.score,points:userInput.points}},{returnOriginal:false},(err,result)=>{
    if(err)
    console.log(err);
    else
    res.json(result);
});
});



script.post('/',(req,res)=>{
    const userInput=req.body;
    db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
        if(err)
        console.log(err);
        else{
            res.json({result:result,document:result.ops[0]});
        }
    });
});

script.delete('/:id',(req,res)=>{
const userID=req.params.id;
db.getDB().collection(collection).findOneAndDelete({_id:db.getPrimaryKey(userID)},(err,result)=>{
if(err)
console.log(err);
else{
    res.json(result);
}
});
});
