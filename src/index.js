import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

const resolvers = {
    Query: {
        hello() {
            return 'My first Graphql query'
        },
        name() {
            return 'Mogambo'
        },
        location() {
            return 'Hell'
        },
        bio() {
            return 'I am a villan with a evil laugh. Buhuhahahaha!'
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