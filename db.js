const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/form_data")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("Failed to connect");
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const collection = new mongoose.model("collection",LogInSchema)

module.export=collection