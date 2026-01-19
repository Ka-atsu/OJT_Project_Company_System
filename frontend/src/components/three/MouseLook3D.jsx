import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 8, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.55);
    fill.position.set(-6, 2, 3);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);

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
    };

    loader.load(
      url,
      (gltf) => {
        model = gltf.scene;

        // ground-center it so it doesn’t float/crop weirdly
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);

        model.position.x -= center.x;
        model.position.z -= center.z;
        model.position.y -= box.min.y; // bottom to y=0

        model.traverse((obj) => {
          if (obj.isMesh) obj.frustumCulled = false;
        });

        group.add(model);

        // ✅ guarantees you can see it
        frameObject(group, 1.3);

        // rest pose
        group.rotation.x = -0.08;
        group.rotation.y = 0.18;
      },
      undefined,
      (err) => console.error("GLB load error:", err),
    );

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

    // mouse look (whole page)
    const restX = -0.08;
    const restY = 0.18;
    let tx = restX;
    let ty = restY;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onMove = (e) => {
      const targetEl = mount.closest(".auth") || document.documentElement;
      const rect = targetEl.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      ty = clamp(restY + nx * 0.45, restY - 0.55, restY + 0.55);
      tx = clamp(restX + ny * 0.25, restX - 0.35, restX + 0.35);
    };

    const onLeave = () => {
      tx = restX;
      ty = restY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    window.addEventListener("mouseleave", onLeave);

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      group.rotation.x += (tx - group.rotation.x) * 0.08;
      group.rotation.y += (ty - group.rotation.y) * 0.08;

      const t = clock.getElapsedTime();
      group.position.y = Math.sin(t * 1.2) * 0.03;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("mouseleave", onLeave);
      ro.disconnect();

      if (model) disposeModel(model);
      renderer.dispose();

      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, [url]);

  return <div ref={mountRef} className={`auth-three ${className}`} />;
}
