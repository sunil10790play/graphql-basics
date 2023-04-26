import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// Scalar types - ID, String, Boolean, Int, Float

const users = [{
    id: '1',
    name: 'Sunil',
    email: 'sunil@example.com',
    age: 33
}, {
    id: '2',
    name: 'Asha',
    email: 'asha@example.com'
}, {
    id: '3',
    name: 'Ramu',
    email: 'ramu@example.com'
}]

const posts = [{
    id: '1',
    title: 'Who am I?',
    body: 'I am Mogambo and I am Awesome!',
    published: true
}, {
    id: '2',
    title: 'How to be healthy?',
    body: 'Workout, Meditate, Learn',
    published: true
}, {
    id: '3',
    title: 'How to be evil?',
    body: 'Be like Mogambo',
    published: true
}]

const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }
            return posts.filter((post) => {
                return (post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
            })
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