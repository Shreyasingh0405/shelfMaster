const prisma = require("../prisma/prismaClient")
const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET || 'default_secret_key';


const isAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.send({ msg: "you are not login" })
        }
        const decoded = jwt.verify(token, secretKey)
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })
        next()
    } catch (error) {
        return res.send(error.message)
    }
}
module.exports=isAuthenticate