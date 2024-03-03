import "../styles/reset.scss";
import "../styles/index.scss";
import "./threeDvisual.ts"
import "./index.ts"
import { addBackground, layoutEventsList } from "./index.ts";

document.fonts.ready.then(() => {

  const htmlDoc = document.querySelector("html");
  
  if (htmlDoc) {
  
    htmlDoc.classList.add("font-loaded");

    layoutEventsList();
    addBackground();

  }
  
});

export default null;
