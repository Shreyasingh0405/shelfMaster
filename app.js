const express = require("express")
const bodyParser = require("body-parser")
const routes=require("./routes/routes")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", routes)
    app.listen(process.env.PORT||5000,function(){
        console.log("express is running on port " + (process.env.PORT ||5000) )
    })

