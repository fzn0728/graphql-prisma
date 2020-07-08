const Query = {
    users(parent, args, { prisma }, info){
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query}
                ,{
                    email_contains: args.query
                }]
                
            }
             

        }
        
        return prisma.query.users(opArgs, info)
    //     // if (!args.query) {
    //     //     return db.users_data
    //     // }

    //     // return users_data.filter((user)=> {
    //     //     return user.name.toLowerCase().includes(args.query.toLowerCase())
    //     // })
    },

    posts(parent, args, { prisma }, info) {
        const opArgs ={}

        if (args.query){
            opArgs.where = {
            OR:[{
                title_contains: args.query
            },{
                body_contains: args.query
            }]
        }
        
        }

        console.log(opArgs)

        return prisma.query.posts(opArgs, info)
        // if (!args.query){
        //     console.log(db)
        //     return db.posts_data
        // }

        // return db.posts_data.filter((xyz)=> {
        //     const isTitleMatch =  xyz.title.toLowerCase().includes(args.query.toLowerCase())
        //     const isBodyMatch =  xyz.body.toLowerCase().includes(args.query.toLowerCase())
        //     return isTitleMatch || isBodyMatch
        // })
    },

    comments(parent, args, {db}, info){
        return db.comments_data
    },

    me() {
        return {
            id: '123456',
            name: 'Chandler',
            email: 'xxxemail',
        }
    },

    post() {
        return {
            id: '213456',
            title: 'Story1',
            body: 'Here is the main body',
            published: true
        }
    }
    
}

export {Query as default}