import { getTemporaryAccessToken } from "@/actions/getTempAccessToken"
import SchematicEmbedComponent from "./SchematicEmbedComponent"

async function SchematicWrapper({componentId}: {componentId: string}) {
  
    const accesstoken = await getTemporaryAccessToken()

    if(!accesstoken){
        throw new Error("No access token found for the user")
    }
  
    return (
    <SchematicEmbedComponent
        accessToken = {accesstoken}
        componentId = {componentId}
    />
  )
}

export default SchematicWrapper