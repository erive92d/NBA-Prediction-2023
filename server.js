const express = require("express")
const path = require("path")
const fs = require("fs")
const dataBase = require("./db/db.json")
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'/public/index.html'))
})

app.get('/getreasons',(req,res)=> {
    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        if(err) {
            console.log(err)
        } else {
            const jsonData = JSON.parse(data)
            res.json(jsonData)
        }
    })
})

app.post('/reasons',(req,res)=> {
    console.log(req.body)
    if(req.body) {
        const {teamname,reason,username} = req.body

        const newResult = {
            name: username,
            teamname: teamname,
            reason: reason,
            id: Math.floor(Math.random()* 100)
        }

        fs.readFile('./db/db.json','utf-8',(err,data)=> {
            if(err) {
                console.log(err)
            } else {
                
                const jsonData = JSON.parse(data)
                jsonData.push(newResult)

                fs.writeFile('./db/db.json',JSON.stringify(jsonData), err=> {
                    err?console.log(err):console.log('New data has been added to Database')
                })
                res.status(201).json("Successfully added " + jsonData)
            }
        })
    } else {
        res.status(500).json("Error has occured")
    }
})



app.listen(PORT,()=> {
    console.log('lISTENING NOW!')
})