import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
document.body.appendChild(renderer.domElement);

// Adjust canvas position for full screen coverage
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1'; // Ensure it's behind other content

// Create a wavy geometry
const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x0077be, wireframe: true, transparent: true, opacity: 0.5 });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Position the camera
camera.position.z = 5;

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Add a wave effect
    const time = performance.now() * 0.001;
    for (let i = 0; i < geometry.attributes.position.count; i++) {
        const z = Math.sin(geometry.attributes.position.getX(i) * 2 + time * 2) * 0.5;
        geometry.attributes.position.setZ(i, z);
    }
    geometry.attributes.position.needsUpdate = true;

    // Rotate the plane
    plane.rotation.z = time * 0.1;

    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// Start the animation
animate();