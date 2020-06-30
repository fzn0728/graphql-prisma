import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466/'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

const createPostForUser = async ( authorId, data) => {
    const post = await prisma.mutation.createPost ( {
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, ' { id }')
    const user = await prisma.query.user({
        where:{
            id: authorId
        }
    }, '{ id name email posts { id title published } }')
    return user
}

createPostForUser('ckbvll81s000k0966qn4rm9wh', {
    title: "Great books to read",
    body: "The War of Art",
    published: true
}).then((user) => {
    console.log(JSON.stringify( user, undefined, 2))
})


// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL 101",
//         body:"",
//         published: false,
//         author:{
//             connect:{
//                 id: "ckbvm82x0001h0966gbuzgajb"
//             }
//         }
//     }
// }, '{ id title body published}').then((data) => {
//     console.log(data)
//     return prisma.query.users( null, '{ id name posts {id title } }')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.updatePost({
//     data: {
//         body: "new body",
//         published: true
//     },
//     where: {
//         id: "ckc1avjvi000q0866nwil2l3j"
//     }
// }, '{ id title body published } ').then((data) => {
//     console.log(data)
//     return prisma.query.posts( null, '{ id title body published }' )
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })