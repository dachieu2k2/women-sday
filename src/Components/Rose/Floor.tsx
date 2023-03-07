import React from "react";
import { usePlane } from "@react-three/cannon";
import { Mesh } from "three";
import { MeshReflectorMaterial } from "@react-three/drei";

function Floor() {
  const { floorColor, floorSize } = {
    floorColor: "#762340",
    floorSize: 200,
  };
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    args: [200, 200],
    type: "Static",
    mass: 20,
  }));
  return (
    <mesh
      receiveShadow
      // castShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      ref={ref}
    >
      <planeGeometry args={[floorSize, floorSize]} />
      <MeshReflectorMaterial
        color={floorColor}
        mirror={0}
        roughness={0.4}
        mixBlur={0.7}
      />
    </mesh>
  );
}
export default Floor;
