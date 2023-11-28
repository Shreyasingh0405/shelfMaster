const prismaClient = require("../prisma/prismaClient")
exports.userRegistration = async (req, res) => {
    try {
        const { username, email, password, role, image, mobileNo, status } = req.body
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
    } catch (error) {
        console.log(error)
    }
}

exports.getBooks = async (req, res) => {
    try {
        const getData = await prismaClient.user.findMany()
        if (getData) {
            return res.send({ status: 1, msg: "data successfully found", data: getData })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getuserDataById = async (req, res) => {
    try {
        const { id } = req.body
        const getData = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })
        if (getData) {
            return res.send({ status: 1, msg: "data get succesfully", data: getData })
        }
    } catch (error) {
        console.log(error)
    }
}

