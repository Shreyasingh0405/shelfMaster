const express=require("express")
const routes=express.Router()

const controller = require("../controllers/userController")
const booksController = require("../controllers/bookController")
 
const middleware = require("../middleware/auth")

const validation = require("../validations/userValidation")
const bookValidation=require("../validations/booksValidation")

routes.post("/register",validation.userValidation,controller.userRegistration)
routes.post('/login', controller.login)
routes.get('/logOut', controller.logOut)

routes.get("/getData",controller.getBooks)
routes.get("/getDataById",middleware,controller.getuserDataById)

routes.post("/createBooks",middleware,bookValidation.bookValidation,booksController.createBooks)
routes.get("/getBooks",booksController.getBooksDataByUser)
routes.post("/getbooksDataById",middleware,booksController.getbookDataById)
routes.post("/updateData",middleware,booksController.updateBookData)
routes.post("/deleteBook",middleware,booksController.deletePost)
routes.post("/getBookDataByuserId",middleware,booksController.getbooksByuserId)

module.exports=routes