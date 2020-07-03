import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466/'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

//Example

// prisma.exists.Comment({ // by default, prisma.exists include attr like object name
//     id:"ckbvmdgh2001m0966f6o5wstg"
// }).then((exists)=>{
//     console.log(exists)
// })

const createPostForUser = async ( authorId, data ) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = await prisma.mutation.createPost ( {
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, ' { id }') // this is selection set
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
}).catch((error) => {
    console.log(error.message)
})


const updatePostForUser = async( postId, data )=>{
    const post = await prisma.mutation.updatePost({
        where:{
            id: postId
        },
        data
    }, ' { author { id }}')
    const user = await prisma.query.user({
        where:{
            id: post.author.id
        }
    }, '{ id name email posts { id title published }}')
    return user
}


// updatePostForUser('ckbvm0ts7001109667hy3sgnd', {
//     published: false
// }).then((user) => {
//     console.log(JSON.stringify( user, undefined, 2 ))
// })





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