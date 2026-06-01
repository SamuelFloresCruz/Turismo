'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGem({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.5}
          roughness={0}
          transmission={0.9}
          ior={1.5}
          chromaticAberration={0.03}
        />
      </mesh>
    </Float>
  )
}

function AnimatedTorus({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f4c542" />
      
      <FloatingGem position={[-3, 2, 0]} color="#2d7a4f" scale={0.8} />
      <FloatingGem position={[3, -1, -2]} color="#f4c542" scale={0.6} />
      <FloatingGem position={[0, 0, -3]} color="#c4553d" scale={0.7} />
      
      <AnimatedTorus position={[-2, -2, -1]} color="#2d7a4f" />
      <AnimatedTorus position={[2, 2, -2]} color="#f4c542" />
      
      <Environment preset="city" />
    </>
  )
}

export default function Floating3DElements() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
