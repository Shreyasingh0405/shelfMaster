const { gql } = require("apollo-server")
module.exports = gql`

type books{
  bookName:String,
  description:String,
  summary :String,
  coverPage:String,
  writerName:String
}
type Query{
  getBooksList:[books]
  getBooks(id: ID!):books
  getBooksByUserId(userId: ID!):[books]

}

`
