var express = require("express");
var app=express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restfulUsers_db');


var MongoSchema = new mongoose.Schema({
    title:{type: String, required:true, minlength:3},
    description:{type:String,default:""},
    complete:{type:Boolean,default:false}   
    },
    {timestamps:true}
)

mongoose.model("Mongo",MongoSchema);

var Mongo = mongoose.model('Mongo');


var path= require("path");
var bodyParser= require("body-parser");


app.use(bodyParser.json());

Mongo.remove({},function(done){});

app.get('/tasks',function(req,res){

    console.log("entering db")
    Mongo.find({},function(err,data){
        res.json(data)
    })

})



app.post('/task',function(req,res){
    console.log("creating a title "+req.body.title);
    Mongo.create({title:req.body.title,description:req.body.description,complete:req.body.complete},function(err){
        if(err){
            res.json({m:"err"})
        }
        else{
            console.log("task added");
    
        Mongo.find({},function(err,tasks){
            if(err){
                res.json({message:"Error",error:err})
            }
            else{
                console.log("responding");
    
                res.json({message:"success",tasks})
          
            }
        })
        }
        
        
    })
    
    
    

})



app.listen(8000,function(){
    console.log("Listining on port 8000")
})
app.use(bodyParser.json());