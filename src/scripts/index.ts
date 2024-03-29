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

    const artistList = document.querySelector("section#artists > ul") as HTMLUListElement;
    if (artistList) artistList.innerHTML = innerHtml;

  }
)();

export const addBackground = (): void => {

  const { matches: isDark } = matchMedia("(prefers-color-scheme: dark)")

  const line = document.querySelector("#background_line") as HTMLDivElement;
  const rectangle = document.querySelector("#background_rectangle") as HTMLDivElement;

  const wrap = document.querySelector("div.row") as HTMLDivElement;
  const statementBox = document.querySelector("section.box#statement") as HTMLElement;
  const informationBox = document.querySelector("section.box#information") as HTMLElement;
  const snsBox = document.querySelector("section.box#sns") as HTMLElement;
  const events = document.querySelector("section#events") as HTMLUListElement;

  if (
    !line ||
    !rectangle ||
    !statementBox ||
    !informationBox ||
    !snsBox ||
    !events
  ) return;
  
  const wrapRectangle = wrap.getBoundingClientRect();
  const statementBoxRectangle = statementBox.getBoundingClientRect();
  const informationBoxRectangle = informationBox.getBoundingClientRect();
  const snsBoxRectangle = snsBox.getBoundingClientRect();
  const eventsRectangle = events.getBoundingClientRect();
  
  line.style.top = `${statementBoxRectangle.height}px`;
  line.style.left = `${statementBoxRectangle.width / 2}px`;

  const lineRectangle = line.getBoundingClientRect();
  const marginBetweenWithStatementBoxAndWrap = wrapRectangle.top - statementBoxRectangle.bottom;

  const rectangleTopPos = lineRectangle.height - marginBetweenWithStatementBoxAndWrap;
  const informationBoxCenterPosFromLeft = informationBoxRectangle.x + informationBoxRectangle.width / 2;
  const snsBoxCenterPosFromLeft = snsBoxRectangle.x + snsBoxRectangle.width / 2;
  const wrapRectanglePosFromLeft = wrapRectangle.left;

  rectangle.style.top = `${rectangleTopPos}px`;
  rectangle.style.left = `${informationBoxCenterPosFromLeft - wrapRectanglePosFromLeft}px`;
  rectangle.style.width = `${snsBoxCenterPosFromLeft - informationBoxCenterPosFromLeft}px`;
  
  const rectangleRectangle = rectangle.getBoundingClientRect();
  rectangle.style.height = `${eventsRectangle.bottom - rectangleRectangle.top - eventsRectangle.height / 2 +9}px`;

  line.style.backgroundColor = isDark ? "#BDE729" : "#5F6368";
  rectangle.style.borderColor = isDark ? "#BDE729" : "#5F6368";
  
};

let eventLiElementsWidth: null | number = null
let eventLiElementsPaddingLeft: null | number = null

const getEventListInnerElementsTotalWidth = (eventsList: HTMLUListElement): number => {

  const firstLi = eventsList.querySelector("li:first-child")
  const lastLi = eventsList.querySelector("li:last-child")

  if (!firstLi || !lastLi) return 0
  
  return lastLi.getBoundingClientRect().right - firstLi.getBoundingClientRect().left

}

const getLiPaddingLeft = (eventsList: HTMLUListElement): number => {

  const firstLi = eventsList.querySelector("li:first-child")

  if (!firstLi) return 0
  
  return firstLi.getBoundingClientRect().left - eventsList.getBoundingClientRect().left

}

export const layoutEventsList = (): void => {

  const eventsList = document.querySelector("#events_list") as HTMLUListElement;
  const eventsSeciont = document.querySelector("section#events") as HTMLElement;
  
  if (
    !eventsList ||
    !eventsSeciont
  ) return;

  eventsSeciont.style.left = `0px`;
  eventsList.style.left = `0px`;

  eventLiElementsWidth = eventLiElementsWidth || getEventListInnerElementsTotalWidth(eventsList);
  
  eventLiElementsPaddingLeft = eventLiElementsPaddingLeft || getLiPaddingLeft(eventsList)

  if (window.innerWidth > eventLiElementsWidth + eventLiElementsPaddingLeft) {
    
    eventsSeciont.classList.remove("is_overflow");
    eventsSeciont.classList.add("is_full_viewed");
    eventsSeciont.style.left = `${(eventsSeciont.getBoundingClientRect().left * -1) + (window.innerWidth - eventsList.getBoundingClientRect().width) / 2}px`;
    
  } else {

    eventsSeciont.classList.remove("is_full_viewed");
    eventsSeciont.classList.add("is_overflow");
    eventsSeciont.style.left = `${eventsSeciont.getBoundingClientRect().left * -1}px`;
    eventsList.style.left = `${eventsList.getBoundingClientRect().left * -1}px`;

  }

};
