import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";

function App() {
  const frustumSize = 50;
  const aspect = window.innerWidth / window.innerHeight;

  return (
    <div className="canvas">
      <Canvas
        orthographic
        camera={{
          position: [1, 1, 1],
          left: (frustumSize * aspect) / -2,
          right: (frustumSize * aspect) / 2,
          top: frustumSize / 2,
          bottom: frustumSize / -2,
          near: -100,
          far: 100,
          zoom: 50,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
