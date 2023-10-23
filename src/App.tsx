import { useRef } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Loader } from "@react-three/drei";
import { Vector3 } from "three";
import TextG from "./Components/Rose/TextG";
import Floor from "./Components/Rose/Floor";
import ResponsiveCamera from "./Components/Rose/ResponsiveCamera";
import GeometryArr from "./Components/Rose/GeometryArr";
import * as THREE from "three";
import { Physics } from "@react-three/cannon";
import Rose from "./Components/Rose/Rose";
import { easing } from "maath";
import Date from "./Components/Rose/Date";
import { Overlay } from "./Components/Interfaces";

const t = new Vector3(0, 0, 0);

function App() {
  // const {
  //   orbitcontrols,
  //   axesHelper,
  //   near,
  //   far,
  //   fov,
  //   intensity,
  //   directionalLightIntensity,
  //   directionalLightColor,
  //   floorColor,
  //   floorSize,
  // } = {
  //   intensity: 0.8,
  //   orbitcontrols: true,
  //   axesHelper: true,
  //   near: 30,
  //   far: 55,
  //   fov: 18,
  //   directionalLightIntensity: 3.6,
  //   directionalLightColor: "white",
  //   floorColor: "#762340",
  //   floorSize: 200,
  // };

  console.log(
    "♥ Thank you for being there during the tears and of course, the laughter. May you have a Happy Women’s Day!"
  );

  return (
    <>
      <Canvas
        shadows
        gl={{
          alpha: false,
          // todo: stop using legacy lights
          useLegacyLights: true,
        }}
        camera={{
          fov: 50,
          position: [1.2089696907753384, 6.329032705533957, 3.7210859345481277],
          near: 0.1,
          far: 1000,
        }}
        onCreated={({ scene }) =>
          (scene.background = new THREE.Color("#2a363b"))
        }
      >
        <CameraRig>
          <hemisphereLight intensity={0.5} />
          <spotLight
            position={[0, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
            shadow-mapSize-width={256}
            shadow-mapSize-height={256}
          />
          <Physics broadphase="SAP">
            {/* Floor */}

            <Floor rotation={[-Math.PI / 2, 0, 0]} />
            {/* Box aray */}
            <GeometryArr />
          </Physics>
          {/* Rose */}
          <Rose />
          {/* text on floor */}
          <TextG />
          {/* Text */}
          <Date />
          {/* <OrbitControls /> */}
          {/* <SoftShadows /> */}
          {/* <SoftShadows size={0.3} /> */}
          <Environment
            frames={Infinity}
            preset="sunset"
            resolution={20}
            background
            blur={0.8}
          >
            <Lightformer
              intensity={0.5}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            <Lightformer
              intensity={0.5}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={[10, 10, 1]}
            />
            <group rotation={[Math.PI / 2, 1, 0]}>
              {[2, -2, 2, -4, 2, -5, 2, -9].map((x, i) => (
                <Lightformer
                  key={i}
                  intensity={1}
                  rotation={[Math.PI / 4, 0, 0]}
                  position={[x, 4, i * 4]}
                  scale={[4, 1, 1]}
                />
              ))}
              <Lightformer
                intensity={0.5}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={[50, 2, 1]}
              />
              <Lightformer
                intensity={0.5}
                rotation-y={Math.PI / 2}
                position={[-5, -1, -1]}
                scale={[50, 2, 1]}
              />
              <Lightformer
                intensity={0.5}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={[50, 2, 1]}
              />
            </group>
            <group>
              <Lightformer
                intensity={5}
                form="ring"
                color="blue"
                rotation-y={Math.PI / 2}
                position={[-5, 2, -1]}
                scale={[10, 10, 1]}
              />
            </group>
          </Environment>
        </CameraRig>
        <ResponsiveCamera />
      </Canvas>
      <Loader />
      <Overlay />
    </>
  );
}

const CameraRig: React.FC<React.PropsWithChildren> = ({ children }) => {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    easing.dampE(
      group.current?.rotation,
      [0, -state.pointer.x / 4, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
};

export default App;
