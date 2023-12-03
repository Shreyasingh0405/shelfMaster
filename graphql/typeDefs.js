const { gql } = require("apollo-server")
module.exports = gql`

type books{
  bookName:String,
  description:String,
  summary :String,
  coverPage: [CoverPage]
}
type CoverPage {
  href: String,
  name:String,
}
type Query{
  getBooksList:[books]
  getBooks(id: ID!):books
  getBooksByUserId(userId: ID!):[books]

}
input editBooks{
  bookName:String,
  description:String,
  summary :String,
  coverPage:String,
}
type Mutation{
  editBooks(id:ID!,editBooks:editBooks):Boolean!
  addBooks(bookName: String,
    description: String,
    summary: String,
    status:Int,
    coverPage: String,
  userId:ID!):books!
  deleteBooks(id: ID!):Boolean!
}

type user{
  username: String
  mobileNo :String
  email:String  
  image:String
}
  type Query{
  getUsersList:[user],
  getUsers(id: ID!):user
}
`
