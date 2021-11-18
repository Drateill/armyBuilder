const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require("mysql")
// test de changement pour git
const db = mysql.createPool({
    host: "drateil.ovh",
    user: "wh40k",
    password: '40kpass59',
    database: "model"
})

app.use(cors());
app.use(express.json())


app.get("/get/weapons", (req,res)=>{
    const sqlSelect="SELECT * FROM weapons"
    db.query(sqlSelect, (err, result)=>{
        console.log(result)
        res.send(result)
    })
})

app.get("/get/weapons/:id", (req,res)=>{
    const sqlSelect='SELECT * FROM weapons WHERE Weapon ="'+req.params.id+'"'
    db.query(sqlSelect, (err, result)=>{
        console.log(result)
        res.send(result)
    })
})
app.get("/get/models", (req,res)=>{
    const sqlSelect="SELECT * FROM model"
    db.query(sqlSelect, (err, result)=>{
        console.log(result)
        res.send(result)
    })
})
app.get("/get/models/type/:type", (req,res)=>{
    const sqlSelect='SELECT * FROM model WHERE Type="'+req.params.type+'"'
    db.query(sqlSelect, (err, result)=>{
        console.log(result)
        res.send(result)
    })
})
app.get("/get/models/model/:id", (req,res)=>{
    const sqlSelect='SELECT * FROM model WHERE Model="'+req.params.id+'"'
    db.query(sqlSelect, (err, result)=>{
        console.log(result)
        res.send(result)
    })
})
app.listen(3001, () => {
    console.log("running on port 3001");
}

)