import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Blob = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Gentle mouse follow
      const targetX = (state.pointer.x * state.viewport.width) / 4;
      const targetY = (state.pointer.y * state.viewport.height) / 4;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 128, 128]} scale={1.8}>
        <MeshDistortMaterial 
          color="#ffffff" 
          attach="material" 
          distort={0.5} 
          speed={1.5} 
          roughness={0.0}
          metalness={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} color="#aaaaaa" intensity={1} />
      
      <Blob />
      
      <Environment preset="city" />
    </Canvas>
  );
};

export default Scene;
