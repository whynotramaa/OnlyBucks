'use server'

// import { comment } from '@/sanity/schemaTypes/comment';
import { adminClient } from "@/sanity/lib/adminClient"
import { currentUser } from "@clerk/nextjs/server"

async function addComment(postId: string, comment:string) {

    const user = await currentUser()
    if(!user){
        throw new Error("User not found")
    }

    try {
        // ADD COMMENT TO SANITY

        await adminClient.create({
            _type: "comment",
            post:{_type: "reference", _ref:postId},
            name: user.firstName,
            userImagerl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
            comment,
        })

        console.log("--------------------------------------------------------")
        return {success: true}
        


    } catch (error) {
        if(error instanceof Error){
            return {success: false, error:error.message}
        }
        return {success: false, error: "An unknown error occured"}
    }

  return 
}

export default addComment