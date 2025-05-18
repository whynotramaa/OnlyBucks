'use server';


import { currentUser } from '@clerk/nextjs/server';
import { client } from '@/lib/schematic';
import { adminClient } from '@/sanity/lib/adminClient';

export async function sendMessage(message:string) {
    const user = await currentUser();
    if(!user){
        throw new Error("User not found");
    }   

    try {

        const entitlements = await client.entitlements.getFeatureUsageByCompany({
            keys: {
                id: user.id,
            },
        })

        const feature = entitlements.data.features.find(
            (entitlement) => entitlement.feature?.eventSubtype === "send-direct-message"
        )

        const dmUsage = feature?.usage || 0
        const dmAllocation = feature?.allocation || 0

        if(dmUsage >= dmAllocation){
            throw new Error(
                "You have reached the limit for this month"
            )
        }

        if(!feature){
            throw new Error("Not a Homie 💔")
        }

        const newMessage = await adminClient.create({
            _type: "message",
            senderName: user.fullName || user.emailAddresses[0].emailAddress ,
            senderEmail: user.emailAddresses[0].emailAddress,
            messageBody: message,
        })

console.log("Preview message type:", typeof message);
console.log("Preview message value:", message);


        await client.track({
            event:"send-direct-message",
            company: {
                id: user.id,
            },
            user:{
                id:user.id,
            }
        })

        const updateDmUsage = dmUsage+1
        console.log(`updated DM usage: ${updateDmUsage}/${dmAllocation}`)

        return{
            success: true,
            message: newMessage,
            usage: updateDmUsage,
            allocation: dmAllocation
        }

        
    } catch (error) {
            console.log("Error sending a message: ",error)
            return{
                success: false,
                error:
                error instanceof Error ? error.message : "An unknown error occured"
            }
    }
}