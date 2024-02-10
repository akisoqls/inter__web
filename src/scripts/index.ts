import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 20, 70 / 30, 0.1, 1000 );

let scrollX = 0.00
let scrollY = 0.00
let prevScrollPosition = 0;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 70, 30 );
document.querySelector("#icon")?.appendChild(renderer.domElement);
window.addEventListener("scroll", () => {
  if (prevScrollPosition < window.scrollY) {
    scrollX += 0.2
	} else {
    scrollY += 0.2
	}
  prevScrollPosition = window.scrollY;
  
})
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  
  scrollX -= 0.01;
  cube.rotation.x = scrollX
  scrollY -= 0.01;
  cube.rotation.y = scrollY;

  renderer.render( scene, camera );
}
animate();

export default null