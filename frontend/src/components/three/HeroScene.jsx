import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function HeroScene() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f8f9fa");

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 200, 500);
    camera.lookAt(0, 5, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    controls.target.set(0, 5, 0); // focus point
    controls.update();

    // LIGHTING (sand-friendly)
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(6, 10, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-6, 6, -4);
    scene.add(fillLight);

    // LOAD MODEL
    const loader = new GLTFLoader();
    let sand = null;

    loader.load(
      "/models/construction_site_building_site_architecture.glb",
      (gltf) => {
        sand = gltf.scene;
        sand.scale.set(2, 2, 2);
        sand.position.set(0, -1, 0);
        scene.add(sand);
      }
    );

    // RESIZE
    const resize = () => {
      const w = wrap.clientWidth || 1;
      const h = wrap.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ANIMATION (subtle = professional)
    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (sand) sand.rotation.y += 0.002;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="border rounded-3 overflow-hidden"
      style={{ height: 260, width: "100%" }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
