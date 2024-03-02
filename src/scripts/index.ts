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

export const addBackground = (): void => {
  const line = document.querySelector("#background_line") as HTMLDivElement;
  const rectangle = document.querySelector("#background_rectangle") as HTMLDivElement;

  const wrap = document.querySelector("div.row") as HTMLDivElement;
  const statementBox = document.querySelector("section.box#statement") as HTMLElement;
  const informationBox = document.querySelector("section.box#information") as HTMLElement;
  const snsBox = document.querySelector("section.box#sns") as HTMLElement;

  if (
    !line ||
    !rectangle ||
    !statementBox ||
    !informationBox ||
    !snsBox
  ) return;
  
  const wrapRectangle = wrap.getBoundingClientRect();
  const statementBoxRectangle = statementBox.getBoundingClientRect();
  const informationBoxRectangle = informationBox.getBoundingClientRect();
  const snsBoxRectangle = snsBox.getBoundingClientRect();
  
  line.style.top = `${statementBoxRectangle.height}px`;
  line.style.left = `${statementBoxRectangle.width / 2}px`;

  const lineRectangle = line.getBoundingClientRect();
  const marginBetweenWithWrapAndStatementBox = (wrapRectangle.top) - (statementBoxRectangle.top + statementBoxRectangle.height);

  rectangle.style.width = `${(snsBoxRectangle.x + snsBoxRectangle.width / 2) - (informationBoxRectangle.x + informationBoxRectangle.width / 2)}px`;
  rectangle.style.left = `${(informationBoxRectangle.x + informationBoxRectangle.width / 2) - wrapRectangle.left}px`;
  rectangle.style.height = `${informationBoxRectangle.height}px`;
  rectangle.style.top = `${lineRectangle.top - lineRectangle.top + lineRectangle.height - marginBetweenWithWrapAndStatementBox}px`;

  line.style.backgroundColor = "#5F6368"
  rectangle.style.borderColor = "#5F6368"
  
};

window.addEventListener("resize", () => {
  window.innerWidth > 768 && addBackground();
});
