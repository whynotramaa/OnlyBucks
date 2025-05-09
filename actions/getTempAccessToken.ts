"use server"

import { currentUser } from "@clerk/nextjs/server";
// Initialized Schematic SDK
import { SchematicClient } from "@schematichq/schematic-typescript-node"
const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey })

// Get trmporary access token
export async function getTemporaryAccessToken() {
    const user = await currentUser()

    if (!user) {
        console.log("No user found. Throwing Null")
        return null
    }

    const response = await client.accesstokens.issueTemporaryAccessToken({
        resourceType: "company",
        lookup:{id: user.id} // this lookup will vary on how you hae defined the keys out there 
    })

    console.log(
        "Token Response recieved : ",
        response.data?"Token Recieved":"No token in response"
    )

    return response.data.token
}