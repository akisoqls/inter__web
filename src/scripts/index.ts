import { isValidArtistProfile } from "../types.ts";

(
  async () => {
    const jsonRes = await window.fetch("../assets/jsons/artists.json");
    const maybeArtistsObj: unknown[] = await jsonRes.json();
    
    const innerHtml = maybeArtistsObj.map(artist => {
      if (!isValidArtistProfile(artist)) return "";
      return `<li>
        <h4>${artist.artistName}</h4>
        ${artist.links ? `<ul>
          ${artist.links.map(link =>
        `<li>
          <p>
            ${link.name}: <a href="${link.link}" target="_blank" rel="noopener noreferrer">${link.label}</a>
          </p>
        </li>`
      ).join("")}
        </ul>`: ""}
      </li>`;
    }).join("");

    const artistList = document.querySelector("section#artists > ul") as HTMLUListElement
    if (artistList) artistList.innerHTML = innerHtml

  }
)();