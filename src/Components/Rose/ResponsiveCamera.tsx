import { useThree } from "@react-three/fiber";

const ResponsiveCamera = () => {
  const { x, y, z } = {
    x: 1.2089696907753384,
    y: 6.329032705533957,
    z: 3.7210859345481277,
  };
  const { size, camera } = useThree((state) => state);

  if (size.width <= 768) {
    camera.position.set(x, y, z);
  } else {
    camera.position.set(x, y, z);
  }

  return <></>;
};

export default ResponsiveCamera;
