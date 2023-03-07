import { Color, InstancedMesh, MathUtils, Mesh } from "three";
import { Triplet, useBox } from "@react-three/cannon";
import { useMemo } from "react";
import React from "react";

const count = 150;

const arrCube: { randomPosition: Triplet; randomSize: Triplet }[] = [];

const randomSize: () => Triplet = () => [
  Math.abs(Math.random() - 0.5),
  Math.abs(Math.random() - 0.5),
  Math.abs(Math.random() - 0.5),
];

const randomPosition: () => Triplet = () => [0, 20 + Math.random() * 20, -4];

const Cube: React.FC<{ args: Triplet; positions: Triplet }> = ({
  args,
  positions,
}) => {
  const [ref] = useBox<Mesh>(() => ({
    mass: 1,
    position: positions,
    args: args,
    type: "Dynamic",
  }));

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 20 + Math.random() * 10, -5]}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={"#205E61"} />
    </mesh>
  );
};

// position={[-1, 0.1, -4]}

function GeometryArr() {
  useMemo(() => {
    for (let i = 0; i < count; i++) {
      arrCube.push({
        randomSize: randomSize(),
        randomPosition: randomPosition(),
      });
    }
  }, []);
  return (
    <>
      {arrCube.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <Cube args={value.randomSize} positions={value.randomPosition} />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default GeometryArr;
