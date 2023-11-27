const prismaClient = require("../prisma/prismaClient")
exports.userRegistration = async (req, res) => {
    const {username, email, password, role, image, mobileNo,status} = req.body
    const registerData = await prismaClient.user.create({
        data: {
            username,
            email,
            password,
            role,
            image,
            mobileNo,
            status
        }
    })
    if (registerData) {
        return res.send({ status: 1, msg: "you succesfully registered", data: registerData })
    } else {
        return res.send(error)
    }
}