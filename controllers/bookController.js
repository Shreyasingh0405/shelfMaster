const prisma = require("../prisma/prismaClient")
exports.createBooks = async (req, res) => {
    try {
        const { bookName, description, summary, coverPage, status, userId,writerName } = req.body
        const dataBook = await prisma.books.create({
            data: {
                bookName,
                description,
                summary,
                coverPage,
                writerName,
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
        console.log(error)
    }
}
exports.getbookDataById = async (req, res) => {
    try {
        const { id } = req.body
        const getData = await prisma.books.findUnique({
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
exports.updateBookData = async (req, res) => {
    try {
        const { id, bookName, description, coverPage, summary } = req.body
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
        console.log(error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.body
        const deleteData = await prisma.books.delete({
            where: { id: id }
        })
        return res.send({ data: deleteData, msg: "data deleted successfully" })
    } catch (error) {
        return res.send(error.message)
    }
}

exports.getbooksByuserId = async (req, res) => {
    try {
        const { userId } = req.body
        const getData = await prisma.books.findMany({
            where: {
                userId: userId
            }
        })
        if (getData) {
            return res.send({ status: 1, msg: "book data get successfully", data: getData })
        }
    } catch (error) {
        console.log(error)
    }
}