import { Color, InstancedMesh, MathUtils, Mesh, Vector3 } from "three";
import { Triplet, useBox } from "@react-three/cannon";
import { useMemo, useState } from "react";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";

const count = 150;

const arrCube: { randomPosition: Triplet; randomSize: Triplet }[] = [];

const randomSize: () => Triplet = () => [
  Math.abs(Math.random() - 0.5),
  Math.abs(Math.random() - 0.5),
  Math.abs(Math.random() - 0.5),
];

// const randomSize: () => Triplet = () => [0, 20 + Math.random() * 10, -5];

const randomPosition: () => Triplet = () => [0, 10 + Math.random() * 20, -4];

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

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) =>
    ref.current?.scale.setScalar(
      hovered ? 1 + Math.sin(state.clock.elapsedTime * 10) / 5 : 1
    )
  );
  // Sets document.body.style.cursor: useCursor(flag, onPointerOver = 'pointer', onPointerOut = 'auto')
  useCursor(hovered);

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 10 + Math.random() * 20, -4]}
      onClick={(e) => (e.stopPropagation(), setClicked(!clicked))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial
        // color={"#205E61"}
        color={clicked ? "lightblue" : hovered ? "aquamarine" : "#205E61"}
      />
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
