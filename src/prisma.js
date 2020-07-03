import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466/'
})

// Experience I got on function(( )) or function({ })
// looks like only using the defined function, you can use function(( return_variable ) =>{ console.log (return_variable )}).
// when you create the function, you use function({ arg1{ arg11, arg12 }, arg2 }) to hold arguments 

// prisma.query prisma.mutation prisma.subscription prisma.exists

//Example of exists function

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
    }, ' { id author { id name email posts {id title published}} }') // this is selection set
    return post.author
}

// createPostForUser('ckbvll81s000k0966qn4rm9wh', {
//     title: "Great books to read",
//     body: "The War of Art",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify( user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })


const updatePostForUser = async( postId, data ) => {
    const postExists = await prisma.exists.Post({id:postId})

    if (!postExists) {
        throw new Error('Post not found')
    }

    const post = await prisma.mutation.updatePost({
        where:{
            id: postId
        },
        data
    }, ' { author { id name email posts { id title published} }}')
    return post.author
}


// updatePostForUser('ckbvm0ts7001109667hy3sgnd', {
//     title: "Test prisma.exists",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify( user, undefined, 2 ))
// }).catch((error) => {
//     console.log(error.message)
// })


