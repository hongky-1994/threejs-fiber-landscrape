import { Box } from "@react-three/drei";
import { folder, useControls } from "leva";
import Ground from "./Ground";
import CameraControl from "./CameraControl";
import CameraPositionLogger from "../helper/CameraPositionLogger";

const TweakableBox = ({
  position = [0, 0, 0],
  args = [1, 1, 1],
  color = "#ff8f00",
  debug = false,
}: {
  position?: [number, number, number];
  args?: [number, number, number];
  color?: string;
  debug?: boolean;
}) => {
  const control = useControls("Box", {
    transform: folder({
      scale: 1,
      position: folder({ x: position[0], y: position[1], z: position[2] }),
      size: folder({ sizeX: 1, sizeY: 1, sizeZ: 1 }),
    }),
    material: folder({ color: "#ff8f00" }),
  });

  return (
    <Box
      scale={debug ? control.scale : 1}
      position={debug ? [control.x, control.y, control.z] : position}
      args={debug ? [control.sizeX, control.sizeY, control.sizeZ] : args}
      castShadow
    >
      <meshStandardMaterial color={debug ? control.color : color} flatShading />
    </Box>
  );
};

const Scene = () => {
  return (
    <group>
      {/* LIGHT */}
      <ambientLight />
      <directionalLight
        intensity={0.8}
        position={[10, 10, 10]}
        castShadow
        color={"#9e69da"}
      />
      <spotLight args={["red", 100, 10, Math.PI]} />
      <pointLight
        position={[1, 7, 10]}
        castShadow
        color={"#9e69da"}
        intensity={100}
      />
      <CameraControl />

      <CameraPositionLogger event="mouseup" />
      <Ground />
      <TweakableBox position={[0, 0.5, 0]} args={[1, 3, 1]} />
      <TweakableBox position={[3, 0.5, 2]} />
    </group>
  );
};

export default Scene;
