import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', function() {
    const bgContainer = document.getElementById('cyberpunk-bg');
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    bgContainer.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00f7ff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0xff003c, 3, 20);
    pointLight1.position.set(-10, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x0fe0b6, 3, 20);
    pointLight2.position.set(10, 5, 5);
    scene.add(pointLight2);
    
    const gridHelper = new THREE.GridHelper(100, 100, 0x0fe0b6, 0x0fe0b6);
    gridHelper.position.y = -5;
    scene.add(gridHelper);
    
    const createFloatingCubes = () => {
        const cubeGroup = new THREE.Group();
        const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        
        for (let i = 0; i < 50; i++) {
            const randomMaterial = new THREE.MeshStandardMaterial({
                color: Math.random() < 0.5 ? 0xff003c : 0x0fe0b6,
                emissive: Math.random() < 0.5 ? 0xff003c : 0x0fe0b6,
                emissiveIntensity: 0.5,
                metalness: 0.8,
                roughness: 0.2
            });
            
            const cube = new THREE.Mesh(cubeGeometry, randomMaterial);
            
            cube.position.x = (Math.random() - 0.5) * 40;
            cube.position.y = (Math.random() - 0.5) * 20;
            cube.position.z = (Math.random() - 0.5) * 40;
            
            cube.rotation.x = Math.random() * Math.PI;
            cube.rotation.y = Math.random() * Math.PI;
            
            cube.userData = {
                speed: 0.01 + Math.random() * 0.02,
                rotationSpeed: 0.01 + Math.random() * 0.02,
                direction: Math.random() > 0.5 ? 1 : -1
            };
            
            cubeGroup.add(cube);
        }
        
        scene.add(cubeGroup);
        return cubeGroup;
    };
    
    const createCityscape = () => {
        const cityGroup = new THREE.Group();
        const buildingCount = 20;
        
        for (let i = 0; i < buildingCount; i++) {
            const width = 1 + Math.random() * 2;
            const height = 3 + Math.random() * 10;
            const depth = 1 + Math.random() * 2;
            
            const buildingGeo = new THREE.BoxGeometry(width, height, depth);
            const buildingMat = new THREE.MeshStandardMaterial({
                color: 0x050518,
                emissive: Math.random() < 0.3 ? 0xff003c : 0x0fe0b6,
                emissiveIntensity: 0.2,
                metalness: 0.9,
                roughness: 0.1
            });
            
            const building = new THREE.Mesh(buildingGeo, buildingMat);
            
            // Add windows
            const windowCount = Math.floor(height * 2);
            const windowGeo = new THREE.PlaneGeometry(0.2, 0.2);
            
            for (let j = 0; j < windowCount; j++) {
                if (Math.random() > 0.3) {
                    const windowMat = new THREE.MeshBasicMaterial({
                        color: Math.random() < 0.5 ? 0xff003c : 0x0fe0b6,
                        side: THREE.DoubleSide
                    });
                    
                    const windowMesh = new THREE.Mesh(windowGeo, windowMat);
                    windowMesh.position.x = (Math.random() - 0.5) * (width - 0.3);
                    windowMesh.position.y = (Math.random() * height) - (height / 2) + 0.5;
                    windowMesh.position.z = depth / 2 + 0.01;
                    building.add(windowMesh);
                    
                    // Clone window to opposite side
                    const windowMeshB = windowMesh.clone();
                    windowMeshB.position.z = -depth / 2 - 0.01;
                    building.add(windowMeshB);
                }
            }
            
            // Position buildings in a circle
            const angle = (i / buildingCount) * Math.PI * 2;
            const radius = 20;
            building.position.x = Math.cos(angle) * radius;
            building.position.z = Math.sin(angle) * radius;
            building.position.y = height / 2 - 5;
            
            building.lookAt(0, 0, 0);
            
            cityGroup.add(building);
        }
        
        scene.add(cityGroup);
        return cityGroup;
    };
    
    // Create holographic circle
    const createHolographicCircle = () => {
        const circleGroup = new THREE.Group();
        
        const ringGeo = new THREE.RingGeometry(8, 8.2, 64);
        const ringMat = new THREE.MeshBasicMaterial({ 
            color: 0x0fe0b6,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -4.9;
        circleGroup.add(ring);
        
        // Add rays
        const rayCount = 36;
        const rayGeo = new THREE.PlaneGeometry(0.1, 10);
        const rayMat = new THREE.MeshBasicMaterial({
            color: 0x0fe0b6,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        
        for (let i = 0; i < rayCount; i++) {
            const ray = new THREE.Mesh(rayGeo, rayMat);
            const angle = (i / rayCount) * Math.PI * 2;
            ray.position.x = Math.cos(angle) * 8;
            ray.position.z = Math.sin(angle) * 8;
            ray.position.y = -4.85;
            ray.rotation.y = angle;
            ray.rotation.x = Math.PI / 2;
            circleGroup.add(ray);
        }
        
        scene.add(circleGroup);
        return circleGroup;
    };
    
    // Create hexagon particles
    const createHexParticles = () => {
        const particleGroup = new THREE.Group();
        const particleCount = 100;
        
        const hexGeo = new THREE.CircleGeometry(0.2, 6);
        
        for (let i = 0; i < particleCount; i++) {
            const particleMat = new THREE.MeshBasicMaterial({
                color: Math.random() < 0.5 ? 0xff003c : 0x0fe0b6,
                transparent: true,
                opacity: 0.3 + Math.random() * 0.5,
                side: THREE.DoubleSide
            });
            
            const particle = new THREE.Mesh(hexGeo, particleMat);
            
            // Random positions
            particle.position.x = (Math.random() - 0.5) * 40;
            particle.position.y = (Math.random() - 0.5) * 20;
            particle.position.z = (Math.random() - 0.5) * 40;
            
            // Random rotation
            particle.rotation.x = Math.random() * Math.PI;
            particle.rotation.y = Math.random() * Math.PI;
            
            // Add animation properties
            particle.userData = {
                speed: 0.03 + Math.random() * 0.05,
                rotationSpeed: 0.01 + Math.random() * 0.02,
                direction: Math.random() > 0.5 ? 1 : -1,
                pulse: Math.random() * Math.PI
            };
            
            particleGroup.add(particle);
        }
        
        scene.add(particleGroup);
        return particleGroup;
    };
    
    // Initialize the 3D objects
    const cubes = createFloatingCubes();
    const cityscape = createCityscape();
    const circle = createHolographicCircle();
    const particles = createHexParticles();
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
        requestAnimationFrame(animate);
        
        const time = clock.getElapsedTime();
        
        // Animate cubes
        cubes.children.forEach(cube => {
            cube.rotation.x += cube.userData.rotationSpeed;
            cube.rotation.y += cube.userData.rotationSpeed * 0.8;
            cube.position.y += Math.sin(time + cube.position.x) * 0.005;
        });
        
        // Rotate cityscape slowly
        cityscape.rotation.y = time * 0.05;
        
        // Pulse circle
        circle.scale.x = 1 + Math.sin(time * 0.5) * 0.05;
        circle.scale.z = 1 + Math.sin(time * 0.5) * 0.05;
        
        // Animate particles
        particles.children.forEach(particle => {
            particle.rotation.x += particle.userData.rotationSpeed;
            particle.rotation.z += particle.userData.rotationSpeed * 0.7;
            particle.position.y += Math.sin(time + particle.userData.pulse) * 0.01;
            particle.material.opacity = 0.3 + Math.sin(time + particle.userData.pulse) * 0.2;
        });
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Make the background responsive to mouse movement for parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        gsap.to(camera.position, {
            x: mouseX * 2,
            y: 5 + mouseY * 2,
            duration: 1
        });
    });
    
    // Adjust background visibility based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / maxScroll;
        
        // Fade out background when scrolling down
        const opacity = 1 - scrollPercentage * 1.5;
        bgContainer.style.opacity = Math.max(0.2, opacity);
        
        // Adjust camera position based on scroll
        camera.position.y = 5 - scrollPercentage * 3;
        camera.position.z = 15 + scrollPercentage * 5;
    });
});