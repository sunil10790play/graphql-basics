import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// Scalar types - ID, String, Boolean, Int, Float

const typeDefs = `
    type Query {
        me: User!
        post: Post!
        add(a: Float!, b:Float!): Float!
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
        add(parent, args, ctx, info) {
            return args.a + args.b
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