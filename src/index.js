import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// Scalar types - ID, String, Boolean, Int, Float

const typeDefs = `
    type Query {
        id: ID!
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean
    }
`

const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        title() {
            return 'Trisula'
        },
        price() {
            return 7.99
        },
        releaseYear() {
            return 1990
        },
        rating() {
            return null
        },
        inStock() {
            return false
        }
    }
}

const schema = createSchema({
    typeDefs,
    resolvers
})
const yoga = createYoga({
    schema
})
const server = createServer(yoga)
server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql')
})