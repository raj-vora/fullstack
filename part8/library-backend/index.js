const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'simran'
const url = "http://localhost:4000"
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', true)

const MONGODB_URI= 'mongodb+srv://rajvora:raj25@persons-vbxzq.mongodb.net/library?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('connected to MongoDB') )
    .catch((error) => console.log('error connection to MongoDB:', error.message) )

const typeDefs = gql`
    type Author {
        name: String!
        id: ID
        born: Int
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(
            author: String
            genre: String
        ): [Book!]!
        allAuthors: [Author!]!
    }
`

const resolvers = {
    Author: {
        bookCount: (root) => books.filter(book => book.author === root.name ).length
    },
    Mutation: {
        addBook: async (root, args) => {
            const author = await Author.findOne({ name: args.author })
            if(author === null){
                console.log('adding new author')
                const author = new Author({ name: args.author })
                await author.save()
                console.log(author._id)
            }
            
            const book = new Book({ ...args, author : author._id })
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return book
        },
        editAuthor: (root, args) => {
            const author = authors.find(author => author.name === args.name)
            if(!author){
                return null
            }
            const updatedAuthor = { ...author, born: args.setBornTo }
            authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
            return updatedAuthor
        }
    },
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            /*if(!(args.author || args.genre)) {
                return books
            }
            if(args.author){
                let booksFilter = books.filter(book => book.author === args.author)
                if(args.genre){
                    return booksFilter.filter(book => book.genres.includes(args.genre))
                }
                return booksFilter
            }
            return books.filter(book => book.genres.includes(args.genre))*/
            return Book.find({}).populate('author')
        },
        allAuthors: () => Author.find({})
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})