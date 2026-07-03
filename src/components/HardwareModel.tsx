import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

/**
 * Premium cyber-visor smart glasses (Awakelens).
 * - Thick modern frame + wraparound tinted visor
 * - Physical materials (transmission for glass, brushed gunmetal frame)
 * - ESP32 module on right temple with pulsing cyan LED
 * - Two red IR emitters on inner rims pointing at wearer's eyes
 */
const Glasses = () => {
  const group = useRef<Group>(null);
  const led = useRef<Mesh>(null);
  const irL = useRef<Mesh>(null);
  const irR = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) group.current.position.y = Math.sin(t * 0.9) * 0.04;
    if (led.current) {
      const pulse = 2.5 + Math.sin(t * 3) * 1.8;
      (led.current.material as any).emissiveIntensity = pulse;
    }
    const irPulse = 3 + Math.sin(t * 2.2) * 1.2;
    if (irL.current) (irL.current.material as any).emissiveIntensity = irPulse;
    if (irR.current) (irR.current.material as any).emissiveIntensity = irPulse;
  });

  return (
    <group ref={group} rotation={[0.06, 0, 0]} scale={1.1}>
      {/* Wraparound visor (single sleek shield) */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[3.3, 0.75, 0.12]} />
        <meshPhysicalMaterial
          color="#05090c"
          metalness={0.3}
          roughness={0.05}
          transmission={0.85}
          thickness={0.4}
          ior={1.45}
          transparent
          opacity={0.7}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Top frame bar (thick brushed gunmetal) */}
      <mesh position={[0, 0.45, 0.02]}>
        <boxGeometry args={[3.4, 0.14, 0.18]} />
        <meshPhysicalMaterial
          color="#1a1d22"
          metalness={1}
          roughness={0.28}
          clearcoat={0.6}
        />
      </mesh>

      {/* Bottom frame bar */}
      <mesh position={[0, -0.32, 0.02]}>
        <boxGeometry args={[3.15, 0.08, 0.14]} />
        <meshPhysicalMaterial color="#1a1d22" metalness={1} roughness={0.32} />
      </mesh>

      {/* Center bridge accent */}
      <mesh position={[0, 0.1, 0.08]}>
        <boxGeometry args={[0.22, 0.34, 0.04]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
      {/* Bridge cyan accent line */}
      <mesh position={[0, 0.1, 0.11]}>
        <boxGeometry args={[0.05, 0.24, 0.01]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {/* Nose pads */}
      <mesh position={[-0.14, -0.35, 0.1]}>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshPhysicalMaterial color="#2a2d33" metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh position={[0.14, -0.35, 0.1]}>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshPhysicalMaterial color="#2a2d33" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Left temple */}
      <group position={[-1.65, 0.15, -0.55]} rotation={[0, -0.28, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.14, 0.16]} />
          <meshPhysicalMaterial color="#16191d" metalness={1} roughness={0.3} />
        </mesh>
        {/* Awakelens logo strip */}
        <mesh position={[0, 0, 0.081]}>
          <boxGeometry args={[0.5, 0.03, 0.005]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={1.8}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Right temple */}
      <group position={[1.65, 0.15, -0.55]} rotation={[0, 0.28, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.14, 0.16]} />
          <meshPhysicalMaterial color="#16191d" metalness={1} roughness={0.3} />
        </mesh>

        {/* ESP32 module */}
        <group position={[-0.2, 0.12, 0]}>
          <mesh>
            <boxGeometry args={[0.7, 0.12, 0.22]} />
            <meshPhysicalMaterial
              color="#0a0a0c"
              metalness={0.9}
              roughness={0.35}
              clearcoat={0.7}
            />
          </mesh>
          {/* RF shield */}
          <mesh position={[0.05, 0.07, 0]}>
            <boxGeometry args={[0.5, 0.02, 0.18]} />
            <meshPhysicalMaterial
              color="#8a8f96"
              metalness={1}
              roughness={0.25}
            />
          </mesh>
          {/* Pulsing status LED */}
          <mesh ref={led} position={[0.28, 0.02, 0.115]}>
            <sphereGeometry args={[0.025, 20, 20]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
          <pointLight color="#00e5ff" intensity={0.8} distance={1.5} position={[0.28, 0.02, 0.15]} />
        </group>
      </group>

      {/* IR sensors on inner rims (pointing at wearer's eyes = -Z toward camera) */}
      <group position={[-0.7, -0.15, 0.12]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 24]} />
          <meshPhysicalMaterial color="#0d0d0d" metalness={0.95} roughness={0.25} />
        </mesh>
        <mesh ref={irL} position={[0, 0, 0.045]}>
          <sphereGeometry args={[0.04, 20, 20]} />
          <meshStandardMaterial
            color="#ff1a1a"
            emissive="#ff1a1a"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="#ff2020" intensity={0.7} distance={0.9} position={[0, 0, 0.15]} />
      </group>

      <group position={[0.7, -0.15, 0.12]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 24]} />
          <meshPhysicalMaterial color="#0d0d0d" metalness={0.95} roughness={0.25} />
        </mesh>
        <mesh ref={irR} position={[0, 0, 0.045]}>
          <sphereGeometry args={[0.04, 20, 20]} />
          <meshStandardMaterial
            color="#ff1a1a"
            emissive="#ff1a1a"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="#ff2020" intensity={0.7} distance={0.9} position={[0, 0, 0.15]} />
      </group>
    </group>
  );
};

const HardwareModel = () => {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0.3, 4.6], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 6, 4]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-5, 2, -2]} intensity={0.7} color="#00e5ff" />
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#00b3ff" />
        <spotLight position={[0, 4, 3]} intensity={0.8} angle={0.6} penumbra={1} color="#ffffff" />

        <Suspense fallback={null}>
          <Glasses />
          <Environment preset="night" />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={1.1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
};

export default HardwareModel;
