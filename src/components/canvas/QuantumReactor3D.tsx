import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface QuantumReactorProps {
  className?: string;
}

export const QuantumReactor3D: React.FC<QuantumReactorProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const shockwaveRef = useRef<{ radius: number; opacity: number; active: boolean }>({
    radius: 0,
    opacity: 0,
    active: false,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 22;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Central Quantum Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Icosahedron wireframe
    const coreGeometry = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Inner solid glowing node
    const innerNodeGeo = new THREE.OctahedronGeometry(2.4, 0);
    const innerNodeMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const innerNodeMesh = new THREE.Mesh(innerNodeGeo, innerNodeMat);
    coreGroup.add(innerNodeMesh);

    // Core point vertices glow
    const corePointsMat = new THREE.PointsMaterial({
      color: 0x10B981,
      size: 0.25,
      transparent: true,
      opacity: 0.9,
    });
    const corePoints = new THREE.Points(coreGeometry, corePointsMat);
    coreGroup.add(corePoints);

    // 4. Orbital Rings (3 distinct cybernetic energy loops)
    const ring1Geo = new THREE.TorusGeometry(6.2, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(7.5, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(8.8, 0.03, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x10B981, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 2.5;
    coreGroup.add(ring3);

    // 5. Starfield & Quantum Flux Particles
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#00F0FF'), // Cyan
      new THREE.Color('#8B5CF6'), // Violet
      new THREE.Color('#10B981'), // Emerald
      new THREE.Color('#38BDF8'), // Sky
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // 6. Shockwave Ring (Triggers on click)
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.3, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    scene.add(shockwaveMesh);

    // 7. Mouse & Touch Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 1.5;
      mouseRef.current.targetY = y * 1.5;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    const handleClick = () => {
      shockwaveRef.current = {
        radius: 0.5,
        opacity: 0.9,
        active: true,
      };
      // Speed burst on core rotation
      coreGroup.rotation.y += 0.4;
      coreGroup.rotation.x += 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate central core
      coreGroup.rotation.y = elapsedTime * 0.25 + mouseRef.current.x * 0.8;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 - mouseRef.current.y * 0.8;
      coreGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.15;

      innerNodeMesh.rotation.y = -elapsedTime * 0.5;
      innerNodeMesh.rotation.z = elapsedTime * 0.4;

      // Animate orbital rings
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.2;
      ring3.rotation.x = elapsedTime * 0.25;

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Shockwave animation
      if (shockwaveRef.current.active) {
        shockwaveRef.current.radius += 0.45;
        shockwaveRef.current.opacity -= 0.02;
        shockwaveMesh.scale.set(shockwaveRef.current.radius, shockwaveRef.current.radius, 1);
        shockwaveMat.opacity = Math.max(0, shockwaveRef.current.opacity);

        if (shockwaveRef.current.opacity <= 0) {
          shockwaveRef.current.active = false;
        }
      }

      // Parallax camera sway
      camera.position.x = mouseRef.current.x * 2.5;
      camera.position.y = mouseRef.current.y * 2.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      innerNodeGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      particlesGeometry.dispose();
      shockwaveGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
      title="Click anywhere on the reactor for energy pulse"
    />
  );
};
