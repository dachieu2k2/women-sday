import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Box,
  MeshReflectorMaterial,
  OrbitControls,
  RandomizedLight,
  Plane,
  Text,
  Torus,
} from "@react-three/drei";
import { useControls } from "leva";
import Rose from "./Components/Rose/Rose";
import { Vector3 } from "three";
import Date from "./Components/Rose/Date";
import TextG from "./Components/Rose/TextG";
import { Physics } from "@react-three/cannon";
import Floor from "./Components/Rose/Floor";
import GeometryArr from "./Components/Rose/GeometryArr";
import ResponsiveCamera from "./Components/Rose/ResponsiveCamera";

const t = new Vector3(0, 0, 0);

function App() {
  const {
    orbitcontrols,
    axesHelper,
    near,
    far,
    fov,
    intensity,
    directionalLightIntensity,
    directionalLightColor,
    floorColor,
    floorSize,
  } = {
    intensity: 0.8,
    orbitcontrols: true,
    axesHelper: true,
    near: 30,
    far: 55,
    fov: 18,
    directionalLightIntensity: 3.6,
    directionalLightColor: "white",
    floorColor: "#762340",
    floorSize: 200,
  };
  return (
    <Canvas
      shadows
      gl={{ antialias: false }}
      camera={{
        position: [-35, 30, 20],
        // near,
        // far,
        fov,
      }}
    >
      <Physics>
        <Suspense fallback={null}>
          <color attach="background" args={["#f0f0f0"]} />

          <ambientLight intensity={intensity} />
          <directionalLight
            position={[-10, 10, 5]}
            shadow-mapSize={[256, 256]}
            shadow-bias={-0.0001}
            intensity={directionalLightIntensity}
            color={directionalLightColor}
            castShadow
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-10, 10, -10, 10]}
            />
          </directionalLight>

          <Rose />
          <Date />
          <TextG />

          {/* <Plane /> */}
          <Floor />
          <GeometryArr />
          <ResponsiveCamera />

          {orbitcontrols && (
            <OrbitControls
              autoRotate
              autoRotateSpeed={0.1}
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 4}
            />
          )}
          {/* <OrbitControls  /> */}
          {axesHelper && <axesHelper />}
        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App;
