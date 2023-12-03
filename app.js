const express = require("express")
const bodyParser = require("body-parser")
const{ApolloServer}=require("apollo-server")
const multer = require("multer")
const cookieParser = require("cookie-parser")
const path = require("path")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(multer().any()); 

const routes = require("./routes/routes")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
const server= new ApolloServer({
    typeDefs,
    resolvers
})
app.use(cookieParser())
app.use("/fileuploads", express.static(path.join(__dirname, "/fileuploads"), { etag: false }))
app.use("/", routes)
 server.listen(process.env.PORT || 5001, function () {  
    console.log("Apollo server connected " + (process.env.PORT || 5001)) 
  }) 
    app.listen(process.env.PORT || 5000, function () {    
    console.log("express is running on port " + (process.env.PORT || 5000))
})

