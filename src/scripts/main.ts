import "../styles/reset.scss";
import "../styles/index.scss";
import "./threeDvisual.ts"

document.fonts.ready.then(() => {

  const htmlDoc = document.querySelector("html");
  
  if (htmlDoc) {
  
    htmlDoc.classList.add("font-loaded");
  
  }
  
});

export default null;
