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
        getBooksByUserId: async (_, { userId }) => {
            return await prisma.books.findMany({
                where: {
                    userId: userId
                }
            })
        },
        getUsersList: async (_,) => {
            return await prisma.user.findMany()
        },
        getUsers: async (_, { id }) => {
            return await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
        },
    },
    Mutation: {
        deleteBooks: async (_, { id }) => {
           const wasDeleted= (await prisma.books.delete({
                where: {
                    id: id
                }
            })).deletedcounts
            return wasDeleted
        },
        editBooks:async(_,{id,editBooks:{ bookName,description,summary,coverPage}})=>{
            const wasedited = (await prisma.books.update({
                   where:{
                    id:id
                   },
                   data: {
                    bookName: bookName,
                    description: description,
                    coverPage: coverPage,
                    summary: summary
                }
            })).modifiedCount
            return wasedited
         } ,
         addBooks:async(_,{ bookName,description,summary,coverPage,userId,status})=>{
            const createData = await prisma.books.create({
                data:{
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
         }
         } 
       }





