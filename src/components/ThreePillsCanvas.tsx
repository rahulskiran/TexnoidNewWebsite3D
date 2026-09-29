import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreePillsCanvasProps {
  className?: string;
}

export const ThreePillsCanvas = ({ className = '' }: ThreePillsCanvasProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xedd4ff, 1.5);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x70d6ff, 2, 20);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // Group for all pills
    const group = new THREE.Group();
    scene.add(group);

    // Figma-style cluster: a wide red/orange pill on top, purple + blue below, green sphere at the bottom
    const wideGeo = new THREE.CapsuleGeometry(0.5, 1.15, 16, 32);
    const roundGeo = new THREE.SphereGeometry(0.55, 48, 32);
    const halfGeo = new THREE.CapsuleGeometry(0.5, 0.35, 16, 32);

    const colors = [
      { geo: wideGeo, color: 0xf24e2e, rough: 0.1, rot: [0.15, 0.2, Math.PI / 2], pos: [0, 1.2, 0.2], spinSpeed: 0 },
      { geo: halfGeo, color: 0x9b4fd8, rough: 0.14, rot: [0.2, -0.3, 0], pos: [-0.55, 0.05, 0.1], spinSpeed: 0 },
      { geo: roundGeo, color: 0x1abcfe, rough: 0.12, rot: [0, 0, 0], pos: [0.62, 0.05, 0.25], spinSpeed: 0 },
      { geo: roundGeo, color: 0x0acf83, rough: 0.12, rot: [0, 0, 0], pos: [-0.5, -1.1, 0.15], spinSpeed: 0 },
    ];

    const pills: THREE.Mesh[] = [];

    colors.forEach((cfg) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        roughness: cfg.rough,
        metalness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
      });

      const mesh = new THREE.Mesh(cfg.geo, mat);
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      mesh.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      (mesh as any).initialPos = new THREE.Vector3().copy(mesh.position);
      (mesh as any).initialRot = new THREE.Euler().copy(mesh.rotation);
      (mesh as any).spinSpeed = cfg.spinSpeed;

      group.add(mesh);
      pills.push(mesh);
    });

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.7;
      mouseY = y * 0.7;
    };

    const handleContainerClick = () => {
      pills.forEach((p, idx) => {
        p.rotation.x += Math.PI * (idx % 2 === 0 ? 1 : -1);
        p.rotation.y += Math.PI * 0.5;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleContainerClick);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId = 0;
    let visible = true;
    const startTime = performance.now();

    const animate = () => {
      if (!visible) {
        animationFrameId = 0;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;

      // Smooth camera / group tilt based on mouse
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      group.rotation.y = targetX * 0.8 + Math.sin(elapsed * 0.7) * 0.08;
      group.rotation.x = -targetY * 0.8 + Math.cos(elapsed * 0.5) * 0.06;

      // Gentle individual floating
      pills.forEach((pill, i) => {
        const p = pill as any;
        const offset = i * 1.5;
        pill.position.y = p.initialPos.y + Math.sin(elapsed * 1.8 + offset) * 0.08;
        pill.position.x = p.initialPos.x + Math.cos(elapsed * 1.2 + offset) * 0.04;
        pill.rotation.z = p.initialRot.z + Math.sin(elapsed * 0.9 + offset) * 0.06;
      });

      renderer.render(scene, camera);
    };

    // Only render while on screen — the canvas sits inside a scrolling column and
    // would otherwise burn GPU time (and cause scroll jank) the whole time it's hidden.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !animationFrameId) animate();
    });
    visibilityObserver.observe(container);

    animate();

    return () => {
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleContainerClick);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      wideGeo.dispose();
      roundGeo.dispose();
      halfGeo.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ minHeight: '220px' }}
      title="Click or drag to play with the 3D pills!"
    />
  );
};
