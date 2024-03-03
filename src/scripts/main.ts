import "../styles/reset.scss";
import "../styles/index.scss";
import "./threeDvisual.ts"
import "./index.ts"
import { addBackground, layoutEventsList } from "./index.ts";

window.addEventListener("load", () => {

  layoutEventsList();
  addBackground();
  
  const htmlDoc = document.querySelector("html");
  if (htmlDoc) htmlDoc.classList.add("graphic-loaded");

})

window.addEventListener("resize", () => {

  layoutEventsList();
  window.innerWidth > 768 && addBackground();

});

document.fonts.ready.then(() => {

  const htmlDoc = document.querySelector("html");
  
  if (htmlDoc) {
  
    htmlDoc.classList.add("font-loaded");

  }
  
});

export default null;
