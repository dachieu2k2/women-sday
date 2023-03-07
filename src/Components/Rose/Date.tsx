import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Color, Mesh } from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Date = () => {
  const { x, y, z, rX, rY, rZ, scale } = {
    x: 2,
    y: 0.1,
    z: -8,
    scale: 5,
    rX: Math.PI / 2,
    rY: 0,
    rZ: Math.PI / 3,
  };
  const gltf = useLoader(GLTFLoader, "./83/83.glb");
  useEffect(() => {
    gltf.scene.rotation.set(rX, rY, rZ);
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(x, y, z);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 50;
        // object.material.color = "white";
        object.material.emissive = new Color(1, 1, 1);
        object.material.roughness = 0.6;
        // console.log(object.material);
      }
    });
  }, [gltf]);

  return (
    // <mesh scale={10} rotation={[0, -Math.PI / 2, 0]}>
    <primitive object={gltf.scene} />
    // </mesh>
  );
};

export default Date;
