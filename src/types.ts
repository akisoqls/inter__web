export type artistProfile = {
  artistName: string,
  links?: {
    name: string,
    link: string,
    label: string
  }[]
  bio: string
}

export const isValidArtistProfile = (profileData: unknown): profileData is artistProfile => {
  
  if (
    !(typeof profileData === "object") ||
    profileData === null  
  ) return false;

  const hasArtistName = ("artistName" in profileData)
    && (typeof profileData.artistName === "string");
  
  const hasLink = ("links" in profileData)
    ? (
      Array.isArray(profileData.links)
      && profileData.links.every(link => isValidLink(link))
    )
    : true;
  
  const hasBio = ("bio" in profileData)
    && (typeof profileData.bio === "string");

  return hasArtistName && hasLink && hasBio;

}

const isValidLink = (linkObj: unknown): linkObj is artistProfile["links"] => {
  
  if (
    !(typeof linkObj === "object") ||
    !(linkObj !== null)
  ) return false;
  
  const hasName = "name" in linkObj && typeof linkObj.name === "string";
  const hasLink = "link" in linkObj && typeof linkObj.link === "string";
  const hasLabel = "label" in linkObj && typeof linkObj.label === "string";
  
  return hasName && hasLink && hasLabel;
  
}
