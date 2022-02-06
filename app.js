//jshint esversion

const express=require("express");

const bodyParser=require("body-parser");

 const request=require("request");
 const https=require("https");


 const app=express();

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({extended:true}));


 app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html");
 });

app.post("/",function(req,res){
   const  UserName =req.body.fName;
   const Password=req.body.lName;
   const email= req.body.email;


const data={
  members: [
    {
    email_address:email,
    status:"subscribed",
    merge_Fields:{
      FNAME:UserName,
      LNAME:Password
    }
   }
  ]
};

const jsonData= JSON.stringify(data);
const url="https://us14.api.mailchimp.com/3.0/lists/96f5123225";
const options={
  method:"POST",
  auth:"bhanu777:6f7f4da4a785f46b65a7b44079a1547f-us14"
}

const request = https.request(url,options,function(response){
  if(response.statusCode === 200 ){
  res.sendFile(__dirname + "/success.html");
}else {
  res.sendFile(__dirname + "/failure.html");
}
response.on("data",function(data){
  console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();

});
app.post("/failure", function(req, res){
  res.redirect("/")
})

 app.listen(3000,function(){
   console.log("server is running on port 3000.");
 });


//2985534d2d7ad0bf945c103c662e04c9-us14
//96f5123225
