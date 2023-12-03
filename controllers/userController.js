const prismaClient = require("../prisma/prismaClient")
const { uploadToAws, getSignedUrl } = require("../common/aws");
const bcrypt = require("bcrypt");
const cookieToken = require("../utils/cookiesToken");
const CONFIG = require("../config/config");

exports.userRegistration = async (req, res) => {
    try {
        const { username, email, role, password, mobileNo, status } = req.body
        let image = req.files
        image = await uploadToAws("prisma", "userprisma", image)
        const emailCheck = await prismaClient.user.findUnique({
            where: {
                email,
            }
        })
        if (emailCheck) {
            return res.send({ status: 0, msg: "email already exist" })
        }
        const mobileNoCheck = await prismaClient.user.findUnique({
            where: {
                mobileNo,
            }
        })
        if (mobileNoCheck) {
            return res.send({ status: 0, msg: "mobileNo already exist" })
        }
        const passwordBcrypt = bcrypt.hashSync(password, 10);
        const registerData = await prismaClient.user.create({
            data: {
                username,
                email,
                password: passwordBcrypt,
                role,
                image,
                mobileNo,
                status
            }
        })
        if (registerData) {
            return res.send({ status: 1, msg: "you succesfully registered" })
        } else {
            return res.send(error)
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error("please provide email and password")
        }
        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error("USER NOT FOUND")
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.send({ msg: "Password does not match" });
        }
        cookieToken(user,res)

    } catch (error) {
        return res.send(error.message)
    }
}


exports.getBooks = async (req, res) => {
    try {
        const getData = await prismaClient.user.findMany({
            select:{
                username: true,
                email: true,
                role: true,
                status: true,
                image: true,
            }
        })
        if (getData) {
            return res.send({ status: 1, msg: "data successfully found", data: getData })
        }else{
            return res.send({status:0,msg:"data not found"})
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

exports.getuserDataById = async (req, res) => {
    try {
        const { id } = req.body
        if(!id){
            return res.send({status:0,msg:"UserId is required"})
        }
        const getData = await prismaClient.user.findUnique({
            where: {
                id: id
            },
            select: {
               
                username: true,
                email: true,
                role: true,
                status: true,
                image: true,
            }
        })
        if (getData) {
            {
               getData.image = await Promise.all(
                getData.image.map(async (file) => {
                        return {
                            ...file,
                            actualPath: file.href,
                            href: await getSignedUrl(file.href),
                        };
                    })
                );

            return res.send({ status: 1, msg: "data get succesfully", data: getData })
        }
    }else{
        return res.send({status:0,msg:"data not found"})
    }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

//logout User

exports.logOut = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.send({ status: 1, msg: "success" })
    } catch (error) {
        return res.send(error.message)
    }

}

