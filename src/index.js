import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// Scalar types - ID, String, Boolean, Int, Float

const typeDefs = `
    type Query {
        me: User!
        post: Post!
        grades: [Int!]!
        add(numbers: [Float!]!): Float!
        greeting(name: String, position: String): String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post { 
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

const resolvers = {
    Query: {
        me() {
            return {
                id: 'abc123',
                name: 'Sunil',
                email: 'sunil10790play@gmail.com'
            }
        },
        post() {
            return {
                id: 'abc1',
                title: 'Self Mastery',
                body: 'Mogambo has mastered the universe',
                published: true
            }
        },
        grades(parent, args, ctx, info) {
            return [99, 50, 76]
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length) {
                return args.numbers.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                })
            } else {
                return 0;
            }
        },
        greeting(parent, args, cxt, info) {
            if(args.name && args.position) {
                return `${args.name} is a amazing ${args.position}`
            } else {
                return `Hello!`
            }
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