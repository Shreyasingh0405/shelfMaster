const express=require("express")
const routes=express.Router()

const controller = require("../controllers/userController")
const booksController = require("../controllers/bookController")

routes.post("/register",controller.userRegistration)
routes.get("/getData",controller.getBooks)
routes.get("/getDataById",controller.getuserDataById)

routes.post("/createBooks",booksController.createBooks)
routes.get("/getBooks",booksController.getBooksDataByUser)
routes.post("/getbooksDataById",booksController.getbookDataById)
routes.post("/updateData",booksController.updateBookData)
routes.post("/deleteBook",booksController.deletePost)
routes.post("/getBookData",booksController.getbooksByuserId)

module.exports=routes