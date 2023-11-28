const express = require("express")
const bodyParser = require("body-parser")
const{ApolloServer}=require("apollo-server")
const routes = require("./routes/routes")
const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
const app = express()
const server= new ApolloServer({
    typeDefs,
    resolvers
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", routes)
server.listen(process.env.PORT || 5000, function () {
    console.log("express is running on port " + (process.env.PORT || 5000))
})

