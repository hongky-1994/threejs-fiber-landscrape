import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import CameraHelper from "./CameraHelper";

const CameraControl = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <group>
      <OrbitControls args={[camera, domElement]} />;
      <CameraHelper />
    </group>
  );
};

export default CameraControl;
