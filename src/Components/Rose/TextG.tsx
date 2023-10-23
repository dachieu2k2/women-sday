import { useLoader } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide, TextureLoader } from "three";

const TextG = () => {
  const [colorMap] = useLoader(TextureLoader, ["./hihi.png"]);
  // console.log(colorMap);
  localStorage.setItem("Design", "By Phạm Đắc Hiếu");

  return (
    <>
      {/* <Text
        position={[-1, 0.1, -4]}
        rotation={[Math.PI / 2, Math.PI, Math.PI / 1.5]}
        fontSize={2}
        font={"https://fonts.googleapis.com/css2?family=Pacifico&display=swap"}
      >
        HAPPY
      </Text>
      <Text
        // position={[2, 0.1, -8]}
        position={[-3, 0.1, -3]}
        rotation={[Math.PI / 2, Math.PI, Math.PI / 1.5]}
      >
        WOMEN'S DAY
      </Text> */}
      {/* <directionalLight></directionalLight> */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.1, -0.09, 0.1]}
        scale={0.2}
        receiveShadow
        castShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          // displacementScale={1}
          map={colorMap}
          transparent={true}
          // depthTest={false}
          // depthWrite={false}
          blending={AdditiveBlending}
          // color={"white"}
          // vertexColors={true}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
};

export default TextG;
