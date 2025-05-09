import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    ...,
    headerLogo{
      ...,
      asset->
    },
    mainHeroImage{
      ...,
      asset-> {
      _id, url
      }
    },
    logo{
      ...,
      asset->
    }
  }
`);

export async function getSiteSettings() {
  const { data } = await sanityFetch({
    query: siteSettingsQuery,
  });

  return data;
}