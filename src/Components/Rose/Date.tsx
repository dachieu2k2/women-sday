import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const materialStand = new THREE.MeshStandardMaterial({
  envMapIntensity: 50,
  color: "white",
});

// const innerMaterial = new THREE.MeshStandardMaterial({
//   transparent: true,
//   opacity: 1,
//   color: "black",
//   roughness: 0,
//   side: THREE.FrontSide,
//   blending: THREE.AdditiveBlending,
//   polygonOffset: true,
//   polygonOffsetFactor: 1,
//   envMapIntensity: 2,
// });

const material = new THREE.MeshPhysicalMaterial({});
material.thickness = 3.0;
material.roughness = 0.9;
material.clearcoat = 0.1;
material.clearcoatRoughness = 0;
material.transmission = 0.99;
material.ior = 1.25;
material.envMapIntensity = 25;

export function Date(props: JSX.IntrinsicElements["group"]) {
  const { x, y, z, rX, rY, rZ, scale } = {
    x: -0.4,
    y: 0.0,
    z: -0.8,
    scale: 1,
    rX: Math.PI / 2,
    rY: 0,
    rZ: 0,
  };
  const gltf = useLoader(GLTFLoader, "./83/83.glb");
  useEffect(() => {
    gltf.scene.rotation.set(rX, rY, rZ);
    gltf.scene.scale.set(scale, scale * 1.3, scale);
    gltf.scene.position.set(x, y, z);
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material = material;
        object.material.envMapIntensity = 8;
        // object.material.color = "white";
        // object.material.emissive = new Color(1, 1, 1);
        // object.material.roughness = 0.6;
        // console.log(object.material);
      }
    });
  }, [gltf]);

  return (
    // <mesh scale={10} rotation={[0, -Math.PI / 2, 0]}>
    // </mesh>
    <>
      <pointLight position={[x, y, z]} intensity={1} color={"white"} />
      <primitive object={gltf.scene} />
    </>
  );
}

export default Date;
useGLTF.preload("./83/83.glb");
