import { Link } from "lucide-react";
import {
  // SiTwitter,
  SiInstagram,
  SiFacebook,
  // SiLinkedin,
  SiYoutube,
  SiGithub,
  SiTwitch,
  SiDribbble,
  SiPinterest,
  SiReddit,
  SiTiktok,
  
} from "@icons-pack/react-simple-icons";

// Optional type for better safety/autocomplete
// export type SocialPlatform =
//   | "twitter"
//   | "instagram"
//   | "facebook"
//   | "linkedin"
//   | "youtube"
//   | "github"
//   | "twitch"
//   | "dribbble"
//   | "pinterest"
//   | "reddit"
//   | "tiktok"
//   | "website";

// Mapping string keys to icon components
const socialToIcon = {
  // twitter: SiTwitter,
  instagram: SiInstagram,
  facebook: SiFacebook,
  // linkedin: SiLinkedin,
  youtube: SiYoutube,
  github: SiGithub,
  twitch: SiTwitch,
  dribbble: SiDribbble,
  pinterest: SiPinterest,
  reddit: SiReddit,
  tiktok: SiTiktok,
  
} as const;

/**
 * Returns a social media icon from react-icons.
 * Defaults to Lucide's `Link` icon if not found.
 */
export type SocialPlatform = keyof typeof socialToIcon;

export function getSocialIcon(platform: SocialPlatform){
    return socialToIcon[platform] || Link;
}

export default socialToIcon;