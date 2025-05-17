import { MembershipLevel } from "@/types/types";
import { Crown, CrownIcon, Star, StarIcon, User, User2Icon } from "lucide-react";

export const getBadgeColor = (tier: MembershipLevel) => {
  console.log(typeof tier, tier); // You’ll probably see "string" and "2" or "3"
  if (tier === undefined || tier === null) {
  console.warn("Tier is undefined or null!");
}
tier = tier ?? 1
  switch (Number(tier)) {
    case 3:
      return "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-amber-200";
    case 2:
      return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-200";
    default:
      return "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-200";
  }
};

export const getBadgeIcon = (tier: MembershipLevel) => {
  switch (tier) {
    case 3:
      return <CrownIcon className="w-4 h-4" />;
    case 2:
      return <StarIcon className="w-4 h-4" />;
    default:
      return <User2Icon className="w-4 h-4" />;
  }
};