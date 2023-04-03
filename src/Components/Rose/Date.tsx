import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { ReactThreeFiber, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Color, Mesh } from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTF, RGBELoader } from "three-stdlib";
type MeshRefractionMaterialProps = JSX.IntrinsicElements["shaderMaterial"] & {
  envMap: THREE.CubeTexture | THREE.Texture;
  bounces?: number;
  ior?: number;
  fresnel?: number;
  aberrationStrength?: number;
  color?: ReactThreeFiber.Color;
  fastChroma?: boolean;
};
type GLTFResult = GLTF & {
  nodes: {
    Text: Mesh;
  };
  materials: {};
};
export function Date(props: JSX.IntrinsicElements["group"]) {
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

  const { nodes, materials } = useGLTF("./83/83.glb") as unknown as GLTFResult;

  const mesh = useRef<Mesh>(null);

  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );
  const config: MeshRefractionMaterialProps = {
    envMap: texture,
    bounces: 9,
    aberrationStrength: 0.01,
    ior: 2.75,
    fresnel: 1,
    color: "white",
    fastChroma: true,
  };

  const configa = {
    backside: false,
    samples: 16,
    resolution: 256,
    transmission: 0.95,
    roughness: 0.5,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
    thickness: 200,
    backsideThickness: 200,
    ior: 10,
    chromaticAberration: 1,
    anisotropy: 5,
    distortion: 0,
    distortionScale: 0.2,
    temporalDistortion: 0,
    attenuationDistance: 0.5,
    attenuationColor: "#ffffff",
    color: "#ffffff",
  };
  return (
    // <mesh scale={10} rotation={[0, -Math.PI / 2, 0]}>
    // </mesh>
    <>
      {/* <primitive object={gltf.scene} /> */}

      <group
        {...props}
        dispose={null}
        position={[x, y, z]}
        rotation={[rX, rY, rZ]}
        scale={[scale, scale, scale]}
      >
        <mesh
          ref={mesh}
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={nodes.Text.material}
        >
          {/* <shaderMaterial
            key={"9812734973492374"}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          /> */}

          {/* <MeshRefractionMaterial
            {...config}
            envMap={texture}
            toneMapped={false}
          /> */}
          <MeshTransmissionMaterial
            {...configa}
            color="white"
            toneMapped={false}
          />
        </mesh>
      </group>
      <spotLight position={[-0, 0, 5]} angle={0.15} penumbra={1} />
      {/* <pointLight position={[x + 10, y + 10, z]} /> */}
    </>
  );
}

useGLTF.preload("/83.glb");
export default Date;
