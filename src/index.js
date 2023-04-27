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
    name: 'Pranav',
    email: 'pranav@example.com'
}]

const posts = [{
    id: '1',
    title: 'Who am I?',
    body: 'I am Pranav and I am Awesome!',
    published: true,
    author: '3'
}, {
    id: '2',
    title: 'How to be healthy?',
    body: 'Workout, Meditate, Learn',
    published: true,
    author: '2'
}, {
    id: '3',
    title: 'Popoye and Best Friends',
    body: 'Once upon a time, there were two best friends. And they love to be together',
    published: true,
    author: '3'
}]

const comments = [{
    id: '1',
    text: 'This is an awesome post!',
    author: '3',
    post: '2'
}, {
    id: '2',
    text: 'Thank you!',
    author: '2',
    post: '2'
}, {
    id: '3',
    text: 'Pranav rocks!',
    author: '2',
    post: '1'
}, {
    id: '4',
    text: 'Popoyes rule!',
    author: '1',
    post: '3'
}, {
    id: '5',
    text: 'YahhhHuuuu!',
    author: '3',
    post: '3'
}]

const typeDefs = `
    type Query {
        me: User!
        post: Post!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post { 
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        },
        comments(parent, args, ctx, info) {
            return comments
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id 
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
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