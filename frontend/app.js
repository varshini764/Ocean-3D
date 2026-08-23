// 1. Scene, Camera, and Renderer Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// 2. Camera Rotation & Zoom Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.8;
controls.zoomSpeed = 1.0;

// 3. Lighting Setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 3, 5);
scene.add(directionalLight);

// 4. Create Ocean Sphere (3D Globe)
const geometry = new THREE.SphereGeometry(8, 64, 64);
const material = new THREE.MeshPhongMaterial({
  color: 0x0a4d8c,
  emissive: 0x021526,
  shininess: 25,
  wireframe: false
});

const oceanGlobe = new THREE.Mesh(geometry, material);
scene.add(oceanGlobe);

// Add Wireframe Grid Mesh to show latitude/longitude lines
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00d2ff,
  wireframe: true,
  transparent: true,
  opacity: 0.15
});
const wireframeGlobe = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(wireframeGlobe);

// 5. Responsive Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  // Slow background rotation
  oceanGlobe.rotation.y += 0.001;
  wireframeGlobe.rotation.y += 0.001;
  
  controls.update();
  renderer.render(scene, camera);
}

animate();