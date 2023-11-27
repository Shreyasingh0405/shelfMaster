const express=require("express")
const routes=express.Router()
const controller = require("../controllers/userController")
routes.post("/register",controller.userRegistration)
module.exports=routes