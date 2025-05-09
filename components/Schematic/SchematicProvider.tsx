"use client"

import { SchematicProvider, useSchematicEvents } from "@schematichq/schematic-react";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const publishableKey = process.env.NEXT_PUBLIC_PUBLISHABLE_SCHEMATIC_KEY;

if (!publishableKey) {
    throw new Error("Schematic Publishable Key is not set")
}

const SchematicWrapped = ({ children }: { children: React.ReactNode }) => {
    const { identify } = useSchematicEvents();

    const {user} = useUser();

    useEffect(()=>{
        console.log("working.....................................")
        const userName= 
        user?.username ??
        user?.fullName ??
        user?.emailAddresses[0]?.emailAddress ??
        user?.id;

        if(user?.id){
            identify({
                // Company level
                company:{
                    keys:{
                        id: user.id,
                    },
                    name:userName,
                },
                // User level
                keys:{
                    id: user.id,
                },
                name:userName,
            })
        }

    },[identify,user])

    return children
}

function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SchematicProvider publishableKey={publishableKey!}>
            <SchematicWrapped>{children}</SchematicWrapped>
        </SchematicProvider>
    )
}

export default Provider
