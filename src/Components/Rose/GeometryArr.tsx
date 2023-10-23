import type { Triplet } from "@react-three/cannon";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { InstancedMesh } from "three";
import { Color } from "three";

import niceColors from "../colors";

type InstancedGeometryProps = {
  colors: Float32Array;
  number: number;
  size: number;
};

const Spheres = ({ colors, number, size }: InstancedGeometryProps) => {
  const [ref, { at }] = useSphere(
    () => ({
      args: [size],
      mass: 1,
      position: [Math.random() - 0.5, Math.random() * 10, Math.random() - 0.5],
    }),
    useRef<InstancedMesh>(null)
  );
  useFrame(() =>
    at(Math.floor(Math.random() * number)).position.set(
      0,
      Math.random() * 10,
      0
    )
  );
  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={ref}
      args={[undefined, undefined, number]}
    >
      <sphereGeometry args={[size, 48]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </sphereGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  );
};

const Boxes = ({ colors, number, size }: InstancedGeometryProps) => {
  const args: Triplet = [size, size, size];
  const [ref, { at }] = useBox(
    () => ({
      args,
      mass: 1,
      position: [
        Math.random() - 0.5,
        Math.random() * 2 + 4,
        Math.random() - 0.5,
      ],
    }),
    useRef<InstancedMesh>(null)
  );
  useFrame(() =>
    at(Math.floor(Math.random() * number)).position.set(
      0,
      Math.random() * 2 + 4,
      0
    )
  );
  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={ref}
      args={[undefined, undefined, number]}
    >
      <boxGeometry args={args}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
};

const instancedGeometry = {
  box: Boxes,
  sphere: Spheres,
};

export default () => {
  const [number] = useState(200);
  const [size] = useState(0.1);

  const colors = useMemo(() => {
    const array = new Float32Array(number * 3);
    const color = new Color();
    for (let i = 0; i < number; i++)
      color
        .set(niceColors[Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3);
    return array;
  }, [number]);

  const InstancedGeometry = instancedGeometry["box"];

  return (
    <>
      <InstancedGeometry {...{ colors, number, size }} />
    </>
  );
};
