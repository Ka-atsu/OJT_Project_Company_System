import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function MouseLook3D({ url, className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !url) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 500);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* =====================
       LIGHTING
    ===================== */

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 8, 6);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-6, 2, 3);
    scene.add(fill);

    /* =====================
       GROUP
    ===================== */

    const group = new THREE.Group();
    scene.add(group);

    /* =====================
       CONTROLS
    ===================== */

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.6;

    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.75;

    // ✅ auto-spin
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    /* =====================
       LOAD MODEL
    ===================== */

    const loader = new GLTFLoader();
    let model = null;

    const disposeModel = (root) => {
      root.traverse((obj) => {
        if (!obj.isMesh) return;
        obj.geometry?.dispose?.();
        if (Array.isArray(obj.material))
          obj.material.forEach((m) => m?.dispose?.());
        else obj.material?.dispose?.();
      });
    };

    const frameObject = (object, padding = 1.25) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      const maxSize = Math.max(size.x, size.y, size.z) || 1;
      const fov = THREE.MathUtils.degToRad(camera.fov);
      let dist = maxSize / 2 / Math.tan(fov / 2);
      dist *= padding;

      camera.position.set(center.x, center.y + size.y * 0.15, center.z + dist);

      camera.near = Math.max(0.01, dist / 100);
      camera.far = dist * 200;
      camera.lookAt(center);
      camera.updateProjectionMatrix();

      controls.target.copy(center);
      controls.update();
    };

    loader.load(
      url,
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);

        model.position.x -= center.x;
        model.position.z -= center.z;
        model.position.y -= box.min.y;

        model.traverse((obj) => {
          if (obj.isMesh) obj.frustumCulled = false;
        });

        group.add(model);
        frameObject(group, 1.3);

        group.rotation.set(-0.08, 0.18, 0);
      },
      undefined,
      (err) => console.error("GLB load error:", err),
    );

    /* =====================
       RESIZE
    ===================== */

    const resize = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    /* =====================
       LOOP
    ===================== */

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    /* =====================
       CLEANUP
    ===================== */

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();

      if (model) disposeModel(model);
      renderer.dispose();

      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, [url]);

  return <div ref={mountRef} className={`auth-three ${className}`} />;
}
