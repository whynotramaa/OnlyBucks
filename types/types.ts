export type TierAccess = "Normies" | "Insiders" | "Homies";
export type MembershipLevel = 1 | 2 | 3;

export interface Membership extends Record<TierAccess, MembershipLevel>{
    Normies: 1;
    Insiders: 2;
    Homies: 3;
}

export const tierMap: Record<TierAccess, MembershipLevel> = {
     Normies: 1,
    Insiders: 2,
    Homies: 3,
}

export const membershipMap: Record<MembershipLevel, string> = {
    1: "Lvl 1: Normies ",
    2: "Lvl 2: Insiders ",
    3: "Lvl 3: Homies ",
}

export const getTierFromLevel = (level: MembershipLevel): TierAccess => {
    return Object.entries(tierMap).find(
        ([,value]) => value === level
    )?.[0] as TierAccess
}