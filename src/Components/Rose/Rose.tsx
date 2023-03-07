import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Rose = () => {
  const { x, y, z, rX, rY, rZ, scale } = {
    x: 5,
    y: 0,
    z: -3,
    scale: 10,
    rX: Math.PI / 2,
    rY: -Math.PI / 11,
    rZ: Math.PI / 4,
  };
  const gltf = useLoader(GLTFLoader, "./rose/scene.gltf");
  useEffect(() => {
    gltf.scene.rotation.set(rX, rY, rZ);
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(x, y, z);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  return (
    // <mesh scale={10} rotation={[0, -Math.PI / 2, 0]}>
    <primitive object={gltf.scene} />
    // </mesh>
  );
};

export default Rose;
