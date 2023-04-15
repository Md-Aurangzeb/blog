const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const mongoose=require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
const app=express();
// var url = "mongodb://localhost:27017/postsDB";

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
//   });

// const url="mongodb://localhost:3000/postsDB";
// mongoose.connect(url,{
//     useNewUrlParser:true,useUnifiedTopology:true
// },(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("successfullly connected.");
//     }
// })
app.set("view engine","ejs")
const posts=[];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
})

app.post("/",function(req,res){
    var content=req.body.content;
    var title=req.body.title;
    let url="https://www.purgomalum.com/service/containsprofanity?text="+content;
    https.get(url,function(response){
        
        response.on('data', (d) => {
            var containsprofanity=JSON.parse(d);
            
            
            if(containsprofanity!=true){
                posts.push([title,content]);
            }
            res.render("post",{posts:posts,isProfain:containsprofanity});
        });
    })

})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is hosted on port : 3000.");
})