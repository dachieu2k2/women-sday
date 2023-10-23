import { PlaneProps, usePlane } from "@react-three/cannon";
import { useRef } from "react";

function Floor(props: PlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<THREE.Mesh>(null));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <shadowMaterial color="#171717" />
    </mesh>
  );
}

export default Floor;
