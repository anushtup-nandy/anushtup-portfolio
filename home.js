import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set a transparent background
document.body.appendChild(renderer.domElement);

// Adjust canvas position to cover the whole screen
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1'; // Ensure it's behind other content

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);
for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0xaaaaaa
});

const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particlesMesh);

// Position the camera
camera.position.z = 2;

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate particles
    particlesMesh.rotation.y += 0.0005;

    renderer.render(scene, camera);
};

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// Initialize and start the animation
animate();