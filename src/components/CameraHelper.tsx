import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { button, buttonGroup, folder, useControls } from "leva";
import { useRef } from "react";
import { Vector3Tuple } from "three";
import * as THREE from "three";

enum ACTION {
  NONE = 0,
  ROTATE = 1,
  TRUCK = 2,
  OFFSET = 4,
  DOLLY = 8,
  ZOOM = 16,
  TOUCH_ROTATE = 32,
  TOUCH_TRUCK = 64,
  TOUCH_OFFSET = 128,
  TOUCH_DOLLY = 256,
  TOUCH_ZOOM = 512,
  TOUCH_DOLLY_TRUCK = 1024,
  TOUCH_DOLLY_OFFSET = 2048,
  TOUCH_DOLLY_ROTATE = 4096,
  TOUCH_ZOOM_TRUCK = 8192,
  TOUCH_ZOOM_OFFSET = 16384,
  TOUCH_ZOOM_ROTATE = 32768,
}

const { DEG2RAD } = THREE.MathUtils;

const CameraHelper = () => {
  const { camera } = useThree();

  const cameraControlsRef = useRef<CameraControls>(null);

  const {
    minDistance,
    enabled,
    verticalDragToForward,
    dollyToCursor,
    infinityDolly,
  } = useControls({
    thetaGrp: buttonGroup({
      label: "rotate theta",
      opts: {
        "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
        "-90º": () => cameraControlsRef.current?.rotate(-90 * DEG2RAD, 0, true),
        "+360º": () =>
          cameraControlsRef.current?.rotate(360 * DEG2RAD, 0, true),
      },
    }),
    phiGrp: buttonGroup({
      label: "rotate phi",
      opts: {
        "+20º": () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
        "-40º": () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true),
      },
    }),
    truckGrp: buttonGroup({
      label: "truck",
      opts: {
        "(1,0)": () => cameraControlsRef.current?.truck(1, 0, true),
        "(0,1)": () => cameraControlsRef.current?.truck(0, 1, true),
        "(-1,-1)": () => cameraControlsRef.current?.truck(-1, -1, true),
      },
    }),
    dollyGrp: buttonGroup({
      label: "dolly",
      opts: {
        "1": () => cameraControlsRef.current?.dolly(1, true),
        "-1": () => cameraControlsRef.current?.dolly(-1, true),
      },
    }),
    zoomGrp: buttonGroup({
      label: "zoom",
      opts: {
        "/2": () => cameraControlsRef.current?.zoom(camera.zoom / 2, true),
        "/-2": () => cameraControlsRef.current?.zoom(-camera.zoom / 2, true),
      },
    }),
    minDistance: { value: 0 },
    moveTo: folder(
      {
        vec1: { value: [3, 5, 2], label: "vec" },
        "moveTo(…vec)": button((get) =>
          cameraControlsRef.current?.moveTo(
            ...(get("moveTo.vec1") as Vector3Tuple),
            true
          )
        ),
      },
      { collapsed: true }
    ),
    // "fitToBox(mesh)": button(() =>
    //   cameraControlsRef.current?.fitToBox(meshRef.current, true)
    // ),
    setPosition: folder(
      {
        vec2: { value: [-5, 2, 1], label: "vec" },
        "setPosition(…vec)": button((get) =>
          cameraControlsRef.current?.setPosition(
            ...(get("setPosition.vec2") as Vector3Tuple),
            true
          )
        ),
      },
      { collapsed: true }
    ),
    setTarget: folder(
      {
        vec3: { value: [3, 0, -3], label: "vec" },
        "setTarget(…vec)": button((get) =>
          cameraControlsRef.current?.setTarget(
            ...(get("setTarget.vec3") as Vector3Tuple),
            true
          )
        ),
      },
      { collapsed: true }
    ),
    setLookAt: folder(
      {
        vec4: { value: [1, 2, 3], label: "position" },
        vec5: { value: [1, 1, 0], label: "target" },
        "setLookAt(…position, …target)": button((get) =>
          cameraControlsRef.current?.setLookAt(
            ...(get("setLookAt.vec4") as Vector3Tuple),
            ...(get("setLookAt.vec5") as Vector3Tuple),
            true
          )
        ),
      },
      { collapsed: true }
    ),
    lerpLookAt: folder(
      {
        vec6: { value: [-2, 0, 0], label: "posA" },
        vec7: { value: [1, 1, 0], label: "tgtA" },
        vec8: { value: [0, 2, 5], label: "posB" },
        vec9: { value: [-1, 0, 0], label: "tgtB" },
        t: { value: Math.random(), label: "t", min: 0, max: 1 },
        "f(…posA,…tgtA,…posB,…tgtB,t)": button((get) => {
          return cameraControlsRef.current?.lerpLookAt(
            ...(get("lerpLookAt.vec6") as Vector3Tuple),
            ...(get("lerpLookAt.vec7") as Vector3Tuple),
            ...(get("lerpLookAt.vec8") as Vector3Tuple),
            ...(get("lerpLookAt.vec9") as Vector3Tuple),
            get("lerpLookAt.t"),
            true
          );
        }),
      },
      { collapsed: true }
    ),
    saveState: button(() => cameraControlsRef.current?.saveState()),
    reset: button(() => cameraControlsRef.current?.reset(true)),
    enabled: { value: true, label: "controls on" },
    verticalDragToForward: {
      value: false,
      label: "vert. drag to move forward",
    },
    dollyToCursor: { value: false, label: "dolly to cursor" },
    infinityDolly: { value: false, label: "infinity dolly" },
  });

  return (
    <CameraControls
      makeDefault
      ref={cameraControlsRef}
      minDistance={minDistance}
      enabled={enabled}
      verticalDragToForward={verticalDragToForward}
      dollyToCursor={dollyToCursor}
      infinityDolly={infinityDolly}
      mouseButtons={{
        left: ACTION.TRUCK,
        middle: ACTION.NONE,
        right: ACTION.NONE,
        wheel: ACTION.NONE,
      }}
    />
  );
};

export default CameraHelper;
