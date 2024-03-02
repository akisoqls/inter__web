import { isValidArtistProfile } from "../types.ts";

(
  async () => {
    const jsonRes = await window.fetch("../assets/jsons/artists.json");
    const maybeArtistsObj: unknown[] = await jsonRes.json();
    
    const innerHtml = maybeArtistsObj.map<string>(artist => {
      if (!isValidArtistProfile(artist)) return "";
      return `<li>
        <div class="profile_img">${
          artist.profileImg
            ?`<img src="./assets/images/artists_portrait/${artist.profileImg}" >`
            :""
        }</div>
        <div>
          <h4>${artist.artistName}</h4>
          <p>${
            artist.bio.replace(/\n/g, "<br />")
          }</p>
          ${artist.links ? `<ul>
            ${artist.links.map(link =>
          `<li>
            <p>
              <span>[ ${link.name} ] <a href="${link.link}" target="_blank" rel="noopener noreferrer">${link.label}</a></span>
            </p>
          </li>`
        ).join("")}
          </ul>`: ""}
        </div>
      </li>`;
    }).join("");

    const artistList = document.querySelector("section#artists > ul") as HTMLUListElement
    if (artistList) artistList.innerHTML = innerHtml

  }
)();