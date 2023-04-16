const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const db=require("./dbatlas");
const app=express();

app.set("view engine","ejs")
const posts=[];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
})
// db.connectDB();
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