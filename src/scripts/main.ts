import "../styles/index.scss";
import "../styles/reset.scss";

document.fonts.ready.then(() => {

  const htmlDoc = document.querySelector("html");
  
  if (htmlDoc) {
  
    htmlDoc.classList.add("font-loaded");
  
  }
  
});

export default null;