const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.get("/",(req,res)=>{
   res.json("Hello Express App")
})

app.listen(3000,()=>{
    console.log("server started")
})