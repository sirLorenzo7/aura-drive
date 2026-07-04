import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

/**
 * Photorealistic Awakelens smart glasses.
 * - Two rounded rectangular lens frames (RoundedBox rims + tinted glass panes)
 * - Sleek dark metallic frame + bridge + nose pads
 * - Right temple carries a detailed ESP32 microchip PCB (board, shield, pins, LED)
 * - Small IR sensor module mounted on the inner right rim, pointing inward toward the eye
 */

const LensFrame = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Outer rim (rounded rectangle) */}
    <RoundedBox args={[1.35, 0.95, 0.14]} radius={0.28} smoothness={6}>
      <meshPhysicalMaterial
        color="#0e1013"
        metalness={1}
        roughness={0.22}
        clearcoat={1}
        clearcoatRoughness={0.15}
      />
    </RoundedBox>
    {/* Inner cutout ring (slightly recessed, darker) */}
    <RoundedBox args={[1.12, 0.75, 0.15]} radius={0.24} smoothness={6} position={[0, 0, 0.001]}>
      <meshPhysicalMaterial color="#050608" metalness={0.9} roughness={0.35} />
    </RoundedBox>
    {/* Tinted glass lens */}
    <RoundedBox args={[1.06, 0.7, 0.06]} radius={0.22} smoothness={6} position={[0, 0, 0.02]}>
      <meshPhysicalMaterial
        color="#0a1418"
        metalness={0.2}
        roughness={0.05}
        transmission={0.9}
        thickness={0.5}
        ior={1.5}
        transparent
        opacity={0.55}
        clearcoat={1}
        clearcoatRoughness={0.04}
        attenuationColor="#0088aa"
        attenuationDistance={2}
      />
    </RoundedBox>
  </group>
);

const Glasses = () => {
  const group = useRef<Group>(null);
  const led = useRef<Mesh>(null);
  const ir = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) group.current.position.y = Math.sin(t * 0.9) * 0.04;
    if (led.current) {
      (led.current.material as any).emissiveIntensity = 2.5 + Math.sin(t * 3) * 1.8;
    }
    if (ir.current) {
      (ir.current.material as any).emissiveIntensity = 3 + Math.sin(t * 2.4) * 1.4;
    }
  });

  return (
    <group ref={group} rotation={[0.05, 0, 0]} scale={1.05}>
      {/* Left + Right lens frames */}
      <LensFrame position={[-0.82, 0.05, 0]} />
      <LensFrame position={[0.82, 0.05, 0]} />

      {/* Bridge */}
      <RoundedBox
        args={[0.42, 0.14, 0.14]}
        radius={0.05}
        smoothness={5}
        position={[0, 0.18, 0.02]}
      >
        <meshPhysicalMaterial color="#12141a" metalness={1} roughness={0.22} clearcoat={1} />
      </RoundedBox>
      {/* Bridge cyan accent */}
      <mesh position={[0, 0.18, 0.1]}>
        <boxGeometry args={[0.28, 0.02, 0.005]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Nose pads */}
      <mesh position={[-0.14, -0.35, 0.1]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshPhysicalMaterial color="#2a2d33" metalness={0.85} roughness={0.45} />
      </mesh>
      <mesh position={[0.14, -0.35, 0.1]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <meshPhysicalMaterial color="#2a2d33" metalness={0.85} roughness={0.45} />
      </mesh>

      {/* Hinges */}
      <mesh position={[-1.48, 0.1, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.18, 24]} />
        <meshPhysicalMaterial color="#3a3d44" metalness={1} roughness={0.28} />
      </mesh>
      <mesh position={[1.48, 0.1, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.18, 24]} />
        <meshPhysicalMaterial color="#3a3d44" metalness={1} roughness={0.28} />
      </mesh>

      {/* LEFT TEMPLE (plain) */}
      <group position={[-1.65, 0.1, -0.55]} rotation={[0, -0.28, 0]}>
        <RoundedBox args={[1.6, 0.16, 0.16]} radius={0.05} smoothness={5}>
          <meshPhysicalMaterial color="#141619" metalness={1} roughness={0.28} clearcoat={0.8} />
        </RoundedBox>
        {/* subtle brand groove */}
        <mesh position={[0, -0.05, 0.081]}>
          <boxGeometry args={[0.6, 0.015, 0.003]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* RIGHT TEMPLE with detailed ESP32 microchip */}
      <group position={[1.65, 0.1, -0.55]} rotation={[0, 0.28, 0]}>
        {/* Temple arm */}
        <RoundedBox args={[1.6, 0.16, 0.16]} radius={0.05} smoothness={5}>
          <meshPhysicalMaterial color="#141619" metalness={1} roughness={0.28} clearcoat={0.8} />
        </RoundedBox>

        {/* PCB board (green-ish dark) mounted on top of temple */}
        <group position={[-0.15, 0.13, 0]}>
          <RoundedBox args={[0.85, 0.04, 0.28]} radius={0.015} smoothness={4}>
            <meshPhysicalMaterial color="#0b3a2e" metalness={0.3} roughness={0.6} />
          </RoundedBox>

          {/* ESP32 metal RF shield (main chip) */}
          <group position={[0.08, 0.045, 0]}>
            <RoundedBox args={[0.42, 0.05, 0.2]} radius={0.008} smoothness={4}>
              <meshPhysicalMaterial
                color="#a8adb4"
                metalness={1}
                roughness={0.28}
                clearcoat={0.5}
              />
            </RoundedBox>
            {/* engraved ESP32 label (dark line) */}
            <mesh position={[0, 0.026, 0]}>
              <boxGeometry args={[0.22, 0.002, 0.03]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          </group>

          {/* PCB antenna trace (zig-zag rectangle) at left end */}
          <mesh position={[-0.32, 0.023, 0]}>
            <boxGeometry args={[0.14, 0.005, 0.12]} />
            <meshStandardMaterial
              color="#c9a24a"
              metalness={1}
              roughness={0.35}
            />
          </mesh>

          {/* Small resistors / capacitors as tiny boxes */}
          {[-0.22, -0.15, 0.32, 0.36].map((x, i) => (
            <mesh key={i} position={[x, 0.024, 0.11]}>
              <boxGeometry args={[0.025, 0.012, 0.014]} />
              <meshStandardMaterial color="#111" metalness={0.4} roughness={0.6} />
            </mesh>
          ))}
          {[-0.22, -0.15, 0.32, 0.36].map((x, i) => (
            <mesh key={`b-${i}`} position={[x, 0.024, -0.11]}>
              <boxGeometry args={[0.025, 0.012, 0.014]} />
              <meshStandardMaterial color="#111" metalness={0.4} roughness={0.6} />
            </mesh>
          ))}

          {/* Golden connector pins along the front edge */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`pin-${i}`} position={[-0.36 + i * 0.09, 0.018, 0.145]}>
              <boxGeometry args={[0.03, 0.006, 0.02]} />
              <meshStandardMaterial color="#e5c46a" metalness={1} roughness={0.3} />
            </mesh>
          ))}

          {/* Pulsing status LED */}
          <mesh ref={led} position={[-0.28, 0.032, -0.08]}>
            <sphereGeometry args={[0.022, 20, 20]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
          <pointLight
            color="#00e5ff"
            intensity={0.8}
            distance={1.2}
            position={[-0.28, 0.08, -0.08]}
          />
        </group>
      </group>

      {/* IR SENSOR MODULE — mounted on inner right rim, pointing inward toward the eye */}
      <group position={[0.42, -0.15, 0.18]} rotation={[0, -0.35, 0]}>
        {/* Small housing box */}
        <RoundedBox args={[0.18, 0.14, 0.12]} radius={0.02} smoothness={4}>
          <meshPhysicalMaterial color="#0a0a0c" metalness={0.9} roughness={0.32} clearcoat={0.6} />
        </RoundedBox>
        {/* Lens barrel */}
        <mesh position={[0, 0, 0.075]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.05, 24]} />
          <meshPhysicalMaterial color="#111" metalness={0.95} roughness={0.25} />
        </mesh>
        {/* Glowing IR emitter */}
        <mesh ref={ir} position={[0, 0, 0.11]}>
          <sphereGeometry args={[0.032, 20, 20]} />
          <meshStandardMaterial
            color="#ff2020"
            emissive="#ff2020"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="#ff3030" intensity={0.6} distance={0.8} position={[0, 0, 0.18]} />

        {/* Tiny cyan accent stripe on housing */}
        <mesh position={[0, 0.055, 0.061]}>
          <boxGeometry args={[0.1, 0.008, 0.002]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#00e5ff"
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
};

const HardwareModel = () => {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0.3, 4.4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Cinematic lighting */}
        <ambientLight intensity={0.28} />
        <directionalLight position={[5, 6, 4]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-5, 2, -2]} intensity={0.7} color="#00d5ff" />
        <pointLight position={[0, -2, 3]} intensity={0.55} color="#00a8ff" />
        <spotLight position={[0, 4, 3]} intensity={0.9} angle={0.6} penumbra={1} color="#ffffff" />

        <Suspense fallback={null}>
          <Glasses />
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.5}
            scale={8}
            blur={2.6}
            far={2}
            color="#000000"
          />
          <Environment preset="night" />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={1.15}
            luminanceThreshold={0.22}
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
          autoRotateSpeed={1.0}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
};

export default HardwareModel;
