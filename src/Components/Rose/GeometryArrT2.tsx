import { ThreeEvent } from "@react-three/fiber";
// import {
//   BallCollider,
//   CuboidCollider,
//   InstancedRigidBodies,
//   RapierRigidBody,
//   InstancedRigidBodyProps,
// } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 100;
const box = new THREE.BoxGeometry(1, 1, 1);

const GeometryArrT2 = () => {
  // const api = useRef<RapierRigidBody[]>(null);

  // const handleClickInstance = (evt: ThreeEvent<MouseEvent>) => {
  //   if (api.current && evt.instanceId) {
  //     api.current
  //       .at(evt.instanceId)
  //       ?.applyTorqueImpulse({ x: 0, y: 100, z: 0 }, true);
  //   }
  // };

  // useEffect(() => {
  //   if (api.current) {
  //     api.current.forEach((body) => {
  //       body.applyImpulse(
  //         {
  //           x: -Math.random() * 5,
  //           y: Math.random() * 5,
  //           z: -Math.random() * 5,
  //         },
  //         true
  //       );
  //     });
  //   }
  // }, []);

  // const instances = useMemo(() => {
  //   const instances: InstancedRigidBodyProps[] = [];

  //   for (let i = 0; i < COUNT; i++) {
  //     instances.push({
  //       key: "instance_" + Math.random(),
  //       position: [Math.random() * 20, Math.random() * 20, Math.random() * 20],
  //       rotation: [
  //         Math.random() * Math.PI * 2,
  //         Math.random() * Math.PI * 2,
  //         Math.random() * Math.PI * 2,
  //       ],
  //     });
  //   }

  //   return instances;
  // }, []);

  return (
    <></>
    // <InstancedRigidBodies
    //   ref={api}
    //   colliders={false}
    //   instances={instances}
    // positions={Array.from({ length: COUNT }, () => [
    //   Math.random() * 20,
    //   Math.random() * 20,
    //   Math.random() * 20,
    // ])}
    // rotations={Array.from({ length: COUNT }, () => [
    //   Math.random() * Math.PI * 2,
    //   Math.random() * Math.PI * 2,
    //   Math.random() * Math.PI * 2,
    // ])}
    // scales={Array.from({ length: COUNT }, () => [
    //   0.5 + Math.random(),
    //   0.5 + Math.random(),
    //   0.5 + Math.random(),
    // ])}
    // >
    //   <instancedMesh
    //     castShadow
    //     args={[box, undefined, COUNT]}
    //     onClick={handleClickInstance}
    //   >
    //     <meshBasicMaterial color={"yellow"} />
    //   </instancedMesh>
    //   {/* <BallCollider args={[1]} /> */}
    //   {/* <BallCollider args={[0.5]} position={[1, 0.3, -0.25]} /> */}
    //   {/* <CuboidCollider args={[0.5, 0.2, 0.5]} position={[-1, 0.3, -0.25]} /> */}
    // </InstancedRigidBodies>
  );
};

export default GeometryArrT2;
