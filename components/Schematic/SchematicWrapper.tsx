import { getTemporaryAccessToken } from "@/actions/getTempAccessToken"

async function SchematicWrapper({componentId}: {componentId: string}) {
  
    const token = await getTemporaryAccessToken

    if(!token){
        throw new Error("No access token found for the user")
    }
  
    return (
    <SchematicEmbedComponent
        accessToken = {accessToken}
        componentId = {componentId}
    />
  )
}

export default SchematicWrapper