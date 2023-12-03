const prisma = require("../prisma/prismaClient")
const { uploadToAws, deleteFile } = require("../common/aws");
const CONFIG = require("../config/config");
exports.createBooks = async (req, res) => {
    try {
        const { bookName, description, summary, status, userId } = req.body
        let coverPage = req.files
        console.log(coverPage)
        coverPage = await uploadToAws("prisma", "bookprisma", coverPage)
        const dataBook = await prisma.books.create({
            data: {
                bookName,
                description,
                summary,
                coverPage,
                status,
                authorName: {
                    connect: { id: userId }
                }

            }
        })
        return res.send({ status: 1, msg: "books data created", data: dataBook })
    } catch (error) {
        return res.send(error.message)
    }
}

exports.getBooksDataByUser = async (req, res) => {
    try {
        const bookData = await prisma.books.findMany()
        if (bookData) {
            return res.send({ status: 1, msg: "get book data successfully", data: bookData })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}
exports.getbookDataById = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.send({ status: 0, msg: "UserId is required" })
        }
        const getData = await prisma.books.findUnique({
            where: {
                id: id
            }
        })
        if (getData) {
            {
                getData.coverPage = await Promise.all(
                    getData.coverPage.map(async (file) => {
                        return {
                            ...file,
                            actualPath: file.href,
                            href: await getSignedUrl(file.href),
                        };
                    })
                );
            }
            return res.send({ status: 1, msg: "data get succesfully", data: getData })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}
exports.updateBookData = async (req, res) => {
    try {
        const { id, bookName, description, summary } = req.body
        let coverPage = req.files
        const fileData = await prisma.books.findUnique({
            where: {
                id
            },
            select: {
                coverPage: true
            }
        })
        fileData.coverPage.map(async (ele) => {
            await deleteFile(ele.href)
        })

        coverPage = await uploadToAws("prisma", "bookprisma", coverPage)
        const updateData = await prisma.books.updateMany({
            where: {
                id: id
            },
            data: {
                bookName: bookName,
                description: description,
                coverPage: coverPage,
                summary: summary
            }
        })
        if (updateData) {
            return res.send({ status: 1, msg: "data updated successfully", data: updateData })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.send({ status: 0, msg: "bookId is required" })
        }
        const deleteData = await prisma.books.delete({
            where: { id: id }
        })
        if (deleteData)
            return res.send({ msg: "data deleted successfully" })
    } catch (error) {
        return res.send(error.message)
    }
}

exports.getbooksByuserId = async (req, res) => {
    try {
        const { userId } = req.body
        if (!id) {
            return res.send({ status: 0, msg: "UserId is required" })
        }
        const getData = await prisma.books.findMany({
            where: {
                userId: userId
            }
        })
        if (getData) {
            return res.send({ status: 1, msg: "book data get successfully", data: getData })
        } else {
            return res.send({ status: 0, msg: "data not found" })
        }
    } catch (error) {
        return res.send({ status: 0, msg: error.message })
    }
}