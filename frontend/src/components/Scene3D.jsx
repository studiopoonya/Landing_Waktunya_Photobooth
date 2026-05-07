import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Polaroid({ position, rotation, color, scrollY }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.4) * 0.15;
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.3) * 0.08;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.15 - scrollY * 0.003;
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.4, 1.7, 0.06]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.15, 0.04]}>
        <boxGeometry args={[1.1, 1.1, 0.01]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.6, 0.04]}>
        <boxGeometry args={[1.1, 0.06, 0.01]} />
        <meshStandardMaterial color="#e0f2fe" />
      </mesh>
    </group>
  );
}

function Camera3D({ scrollY }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.1 - scrollY * 0.002;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2}>
      <mesh castShadow>
        <boxGeometry args={[2, 1.3, 0.9]} />
        <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.55]}>
        <cylinderGeometry args={[0.35, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#0369a1" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.82]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#7dd3fc" roughness={0} metalness={1} opacity={0.9} transparent />
      </mesh>
      <mesh position={[-0.7, 0.45, 0.46]}>
        <boxGeometry args={[0.45, 0.28, 0.1]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.55, 0.5, 0.46]}>
        <boxGeometry args={[0.4, 0.25, 0.08]} />
        <meshStandardMaterial color="#bae6fd" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0.75, 0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.12, 16]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.3} metalness={0.3} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const count = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return arr;
  }, []);

  const pointsRef = useRef();
  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#0ea5e9" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function SceneContent({ scrollY }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow color="#ffffff" />
      <pointLight position={[-4, 4, 2]} intensity={1} color="#38bdf8" />
      <pointLight position={[4, -2, 3]} intensity={0.6} color="#7dd3fc" />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <Camera3D scrollY={scrollY} />
      </Float>

      <Polaroid position={[-3.8, 0.6, -1]} rotation={[0.1, 0.3, -0.1]} color="#bae6fd" scrollY={scrollY} />
      <Polaroid position={[3.6, -0.4, -1.5]} rotation={[-0.05, -0.25, 0.08]} color="#7dd3fc" scrollY={scrollY} />
      <Polaroid position={[-2.8, -2, -2]} rotation={[0.15, 0.2, 0.12]} color="#e0f2fe" scrollY={scrollY} />
      <Polaroid position={[2.5, 2, -2.5]} rotation={[-0.1, -0.15, -0.05]} color="#38bdf8" scrollY={scrollY} />

      <FloatingParticles />
    </>
  );
}

export default function Scene3D({ scrollY = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <SceneContent scrollY={scrollY} />
    </Canvas>
  );
}
