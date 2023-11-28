const prisma = require("../prisma/prismaClient")
module.exports = {
    Query: {
        getBooksList: async (_,) => {
            return await prisma.books.findMany()
        },
        getBooks: async (_, { id }) => {
            return await prisma.books.findUnique({
                where: {
                    id: id
                }
            })
        },
        getBooksByUserId: async (_, {userId}) => {
            return await prisma.books.findMany({
                where: {
                    userId:userId
                }
            })
        }
    },

}
