import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvasWrapperInFV = document.querySelector("section#firstview > div")
const canvasWrapperInHeader = document.querySelector("#icon")

const header = document.querySelector("header#global_header");
const headerHeight = header !== null ? header.getBoundingClientRect().height : 54;

let canvas = {
  height: Math.min(window.innerHeight - headerHeight, 1200),
  width: Math.min(window.innerWidth, 800)
}
const scene = new THREE.Scene();
const cameraForFV = new THREE.PerspectiveCamera(50, canvas.height / canvas.width, 0.1);
const cameraForHeader = new THREE.PerspectiveCamera(50, 120/160, 0.1);

cameraForFV.lookAt(new THREE.Vector3(0, 0, 0));

let scrollX = 0.00
let scrollY = 0.00
let prevScrollPosition = 0;

let currentObject: "firstView" | "header" = "firstView"

const renderers = {
  firstView: new THREE.WebGLRenderer(),
  header: new THREE.WebGLRenderer()
}

renderers.firstView.setSize( canvas.height, canvas.width );
renderers.header.setSize(120, 160);


if (canvasWrapperInFV) {

  canvasWrapperInFV.classList.add("active");
  canvasWrapperInFV.appendChild(renderers.firstView.domElement);

}

if (canvasWrapperInHeader) {

  canvasWrapperInHeader.appendChild(renderers.header.domElement);

}


window.addEventListener("resize", () => {
  canvas = {
    height: Math.min(window.innerHeight - headerHeight, 1200),
    width: Math.min(window.innerWidth, 800)
  }

  renderers.firstView.setPixelRatio(canvas.height / canvas.width);

  // cameraForFV.aspect = canvas.height / canvas.width
  cameraForFV.updateProjectionMatrix();
})

window.addEventListener("scroll", () => {
  
  if (canvasWrapperInHeader && canvasWrapperInFV) {

    if (canvasWrapperInHeader.getBoundingClientRect().y < window.innerHeight / 3) {

      currentObject = "header"
      canvasWrapperInHeader.classList.add("active")
      canvasWrapperInFV.classList.remove("active")
      
    } else {
      
      currentObject = "firstView"
      canvasWrapperInHeader.classList.remove("active")
      canvasWrapperInFV.classList.add("active")

    }

  }

  const globalHeader = document.querySelector("header#global_header")
  if (globalHeader) {
    if (window.scrollY + headerHeight > window.innerHeight) {

      document.querySelector("header#global_header")?.classList.add("fix")

    } else {

      document.querySelector("header#global_header")?.classList.remove("fix")

    }
    
  }

  if (prevScrollPosition < window.scrollY) {
    scrollX += 0.1
	} else {
    scrollY += 0.1
	}
  prevScrollPosition = window.scrollY;
  
})

const loader = new GLTFLoader();
// GLTFファイルのパスを指定
const glb = await loader.loadAsync('./assets/gltf/pcNetwork.glb');

const model = glb.scene;
console.log(model)
scene.add(model);


const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(-5, 5, 3)
scene.add(directionalLight)

renderers.firstView.setClearColor(0x000000, 0);
renderers.header.setClearColor(0x000000, 0);

cameraForFV.position.z = 5;
cameraForHeader.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  
  scrollX -= 0.005;
  model.rotation.x = scrollX
  scrollY -= 0.005;
  model.rotation.y = scrollY;

  renderers.firstView.render(scene, cameraForFV);
  renderers.header.render(scene, cameraForHeader);
}
animate();

export default null