import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Rose = () => {
  const { x, y, z, rX, rY, rZ, scale } = {
    x: 1,
    y: 0,
    z: -1,
    scale: 2,
    rX: Math.PI / 2 - Math.PI / 14,
    rY: 0,
    rZ: 0,
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
        object.material.envMapIntensity = 8;
      }
    });
  }, [gltf]);

  return (
    // <Caustics
    //   color={[1, 0.8, 0.8]}
    //   // focus={[0, -1.2, 0]}
    //   lightSource={[-2, 2.5, -2.5]}
    //   // frustum={1.75}
    //   intensity={0.005}
    //   worldRadius={0.66 / 10}
    //   ior={0.6}
    //   causticsOnly={false}
    //   backside={false} // backfaceIor={1.26}
    // >
    <primitive object={gltf.scene} />
    // <mesh scale={10} rotation={[0, -Math.PI / 2, 0]}>
    // </mesh>
  );
};

export default Rose;
