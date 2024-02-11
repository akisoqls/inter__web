import * as THREE from "three";
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';


const canvas = {
  height: 100,
  width: 100
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, canvas.height / canvas.width, 0.1);

camera.lookAt(new THREE.Vector3(0, 0, 0));

let scrollX = 0.00
let scrollY = 0.00
let prevScrollPosition = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( canvas.height, canvas.width );
document.querySelector("#icon")?.appendChild(renderer.domElement);
window.addEventListener("scroll", () => {
  if (prevScrollPosition < window.scrollY) {
    scrollX += 0.2
	} else {
    scrollY += 0.2
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

renderer.setClearColor(0x000000, 0);

// loader.load( '../assets/globs/icon.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );
// scene.add( cube );

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  
  scrollX -= 0.01;
  model.rotation.x = scrollX
  scrollY -= 0.01;
  model.rotation.y = scrollY;

  renderer.render(scene, camera);
}
animate();

export default null