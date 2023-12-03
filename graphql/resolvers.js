const prisma = require("../prisma/prismaClient")
module.exports = {
    Query: {
        getBooksList: async (_, __, { req }) => {
            try {
                const books = await prisma.books.findMany();
                return books;
            } catch (error) {
                throw new Error('Error fetching books. Please try again later.');
            }
        },

        getBooks: async (_, { id }) => {
            try {
                return await prisma.books.findUnique({
                    where: {
                        id: id
                    }
                })
            }
            catch (error) {
                throw new Error('Error fetching books. Please try again later.');
            }
        },

        getBooksByUserId: async (_, { userId }) => {
            try {
                return await prisma.books.findMany({
                    where: {
                        userId: userId
                    }
                })
            } catch (error) {
                throw new Error('Error fetching books. Please try again later.');
            }
        },
        getUsersList: async (_,) => {
            try {
                return await prisma.user.findMany()
            } catch (error) {
                throw new Error('Error fetching books. Please try again later.');
            }
            },
        getUsers: async (_, { id }) => {
            try {
                return await prisma.user.findUnique({
                    where: {
                        id: id
                    }
                })
            } catch (error) {
                throw new Error('Error fetching books. Please try again later.');
            }
         
        },
    },
    Mutation: {
        deleteBooks: async (_, { id }) => {
            try {
                const wasDeleted = (await prisma.books.delete({
                    where: {
                        id: id
                    }
                })).deletedcounts
                return wasDeleted
            } catch (error) {
                throw new Error('Error fetching books. Please try again later.')
            }
           },
        editBooks: async (_, { id, editBooks: { bookName, description, summary, coverPage } }) => {
            try {
                const wasedited = (await prisma.books.update({
                    where: {
                        id: id
                    },
                    data: {
                        bookName: bookName,
                        description: description,
                        coverPage: coverPage,
                        summary: summary
                    }
                })).modifiedCount
                return wasedited
     
            } catch (error) {
                throw new Error('Error fetching books. Please try again later.')
            }
                    },
        addBooks: async (_, { bookName, description, summary, coverPage, userId, status }) => {
            try {
                const createData = await prisma.books.create({
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
                return createData
            
            } catch (error) {
                throw new Error('Error fetching books. Please try again later.')
            }
           }
        }
}



