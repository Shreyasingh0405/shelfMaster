const prismaClient = require("../prisma/prismaClient")
const { uploadToAws, getSignedUrl } = require("../common/aws");
const CONFIG = require("../config/config");

exports.userRegistration = async (req, res) => {
    try {
        const { username, email, password, role, mobileNo, status } = req.body
        let image = req.files
        // console.log(image)


        image = await uploadToAws("prisma", "userprisma", image)

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
        return;
    }
}

exports.getBooks = async (req, res) => {
    try {
        const getData = await prismaClient.user.findMany()
        if (getData) {
            {
                getData[0].image = await Promise.all(
                    getData[0].image.map(async (file) => {
                        return {
                            ...file,
                            actualPath: file.href,
                            href: await getSignedUrl(file.href),
                        };
                    })
                );
            }
            return res.send({ status: 1, msg: "data successfully found", data: getData })
        }
    } catch (error) {
        console.log(error)
        return res.send({ status: 0, msg: error.message })
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

