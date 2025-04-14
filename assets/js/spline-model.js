import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SplineLoader } from '@splinetool/loader';

export default function initSplineScene() {
    const container = document.getElementById('spline-container');
    if (!container) {
        console.error('Spline container not found');
        return;
    }

    // Create a scene
    const scene = new THREE.Scene();
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add a simple mesh (placeholder for Spline model)
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff4500,
        emissive: 0x331100,
        metalness: 0.3,
        roughness: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate the mesh
        if (mesh) {
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
        }
        
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
    
    // Mark as loaded
    container.classList.add('scene-loaded');
    console.log('3D scene initialized');

    return {
        scene,
        camera,
        renderer,
        controls
    };
}