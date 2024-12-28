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

// Create cube particles with different colors
const cubes = [];
const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const numCubes = 50;

for (let i = 0; i < numCubes; i++) {
    const cubeColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: cubeColor, transparent: true, opacity: 0.8 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // Position the cubes randomly in space
    cube.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);

    // Set random rotation for each cube
    cube.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);

    scene.add(cube);
    cubes.push(cube);
}

// Position the camera
camera.position.z = 5;

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate and move each cube
    cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Move cubes in a circular motion
        const angle = 0.005 * index + performance.now() * 0.0002;
        cube.position.x = Math.sin(angle) * 5;
        cube.position.y = Math.cos(angle) * 5;
    });

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