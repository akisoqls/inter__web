import "../styles/reset.scss";
import "../styles/index.scss";
import "./threeDvisual.ts"
import "./index.ts"
import { addBackground } from "./index.ts";

document.fonts.ready.then(() => {

  const htmlDoc = document.querySelector("html");
  
  if (htmlDoc) {
  
    htmlDoc.classList.add("font-loaded");

    addBackground();
    
  }
  
});

export default null;
