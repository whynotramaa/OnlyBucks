import Badge from './Badge/Badge'
import { membershipMap, TierAccess } from '@/types/types'

interface TierBAdgeProps {
    tierAccess: TierAccess;
}

function TierBadge({ tierAccess }: TierBAdgeProps) {


    return (
        <Badge variant='interactive' tierAccess={tierAccess} />
    )
}

export default TierBadge