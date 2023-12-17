const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection=require("./db")


const temp = path.join('/temp');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views",temp);

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/",(req,res)=>{
    res.render("signup")
})

app.post("/signup",(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    const express = require("express");
    const app = express();
    const path = require("path");
    const hbs = require("hbs");
    const collection=require("./db")
    
    
    const temp = path.join(_dirname,'../temp');
    
    app.use(express.json());
    app.set("view engine", "hbs");
    app.set("views",temp);
    
    app.get("/",(req,res)=>{
        res.render("login")
    })
    
    app.get("/",(req,res)=>{
        res.render("signup")
    })
    
    app.post("/signup", async (req,res)=>{
        const data={
            name:req.body.name,
            password:req.body.password
        };
    
        await collection.insertMany([data]);
    
        res.render("home");
    
    })
    
    app.listen(3000,()=>{
        console.log("Connected");
    })
    

    res.render("home")

})

app.listen(3000,()=>{
    console.log("Connected");
})
