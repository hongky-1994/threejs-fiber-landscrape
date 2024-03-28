import { Grid, Plane } from "@react-three/drei";

const Ground = () => {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.5,
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: "#9d4b4b",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: true,
    infiniteGrid: true,
  };
  return (
    <group>
      <Plane
        position={[0, -0.01, 0]}
        args={[100, 100]}
        rotation-x={-Math.PI / 2}
      >
        <meshStandardMaterial color="#ffffff" />
      </Plane>
      <Grid position={[0, 0, 0]} args={[20, 20]} {...gridConfig} />;
    </group>
  );
};

export default Ground;
