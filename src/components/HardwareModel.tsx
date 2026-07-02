import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";

/**
 * Conceptual 3D model of the Awakelens smart glasses:
 * - Two lens rims + bridge + temples (frames)
 * - ESP32 microcontroller box on the right temple
 * - Two glowing red IR sensor emitters pointing inward
 */
const Glasses = () => {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      // Subtle idle float
      group.current.position.y = Math.sin(performance.now() * 0.0008) * 0.05;
    }
  });

  const frameMat = {
    color: "#1a1a1a",
    metalness: 0.9,
    roughness: 0.25,
  };

  const silverMat = {
    color: "#c8ccd1",
    metalness: 1,
    roughness: 0.3,
  };

  const lensMat = {
    color: "#0a1518",
    metalness: 0.4,
    roughness: 0.1,
    transparent: true,
    opacity: 0.55,
  };

  return (
    <group ref={group} rotation={[0.05, 0, 0]}>
      {/* Left lens rim */}
      <mesh position={[-0.95, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.05, 24, 64]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      {/* Left lens glass */}
      <mesh position={[-0.95, 0, 0]}>
        <circleGeometry args={[0.62, 48]} />
        <meshStandardMaterial {...lensMat} />
      </mesh>

      {/* Right lens rim */}
      <mesh position={[0.95, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.05, 24, 64]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      {/* Right lens glass */}
      <mesh position={[0.95, 0, 0]}>
        <circleGeometry args={[0.62, 48]} />
        <meshStandardMaterial {...lensMat} />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 24]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* Nose pads */}
      <mesh position={[-0.18, -0.2, 0.05]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial {...silverMat} />
      </mesh>
      <mesh position={[0.18, -0.2, 0.05]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial {...silverMat} />
      </mesh>

      {/* Left temple (arm) */}
      <mesh position={[-1.85, 0.08, -0.6]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[1.4, 0.08, 0.08]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      {/* Right temple */}
      <mesh position={[1.85, 0.08, -0.6]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[1.4, 0.08, 0.08]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>

      {/* ESP32 module on right temple */}
      <group position={[1.75, 0.15, -0.5]} rotation={[0, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[0.55, 0.18, 0.22]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.85} roughness={0.35} />
        </mesh>
        {/* Silver shield on top */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.18]} />
          <meshStandardMaterial {...silverMat} />
        </mesh>
        {/* Status LED */}
        <mesh position={[0.2, 0.05, 0.115]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* IR sensors pointing inward toward the eyes */}
      {/* Left IR emitter (mounted on left rim, pointing back toward wearer's eye) */}
      <group position={[-0.95, -0.55, 0.02]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 24]} />
          <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Glowing red lens */}
        <mesh position={[0, 0, -0.045]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color="#ff2b2b"
            emissive="#ff2b2b"
            emissiveIntensity={3}
          />
        </mesh>
        <pointLight color="#ff2b2b" intensity={0.4} distance={0.6} position={[0, 0, -0.1]} />
      </group>

      {/* Right IR emitter */}
      <group position={[0.95, -0.55, 0.02]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 24]} />
          <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.045]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color="#ff2b2b"
            emissive="#ff2b2b"
            emissiveIntensity={3}
          />
        </mesh>
        <pointLight color="#ff2b2b" intensity={0.4} distance={0.6} position={[0, 0, -0.1]} />
      </group>
    </group>
  );
};

const HardwareModel = () => {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#00000000"]} />

        {/* Lighting */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 3]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#00e5ff" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#00e5ff" />

        <Suspense fallback={null}>
          <Glasses />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
};

export default HardwareModel;
