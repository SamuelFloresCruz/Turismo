'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, Center, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

function MountainMesh({ position, scale, color }: { position: [number, number, number], scale: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(1, 2, 4)
    geo.translate(0, 1, 0)
    return geo
  }, [])

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 10 - 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#f4c542" transparent opacity={0.8} />
    </points>
  )
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <mesh ref={sunRef} position={[4, 3, -5]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial color="#f4c542" />
    </mesh>
  )
}

function Llama({ position }: { position: [number, number, number] }) {
  const llamaRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (llamaRef.current) {
      llamaRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group ref={llamaRef} position={position} scale={0.3}>
      {/* Cuerpo */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial color="#e8d5b7" />
      </mesh>
      {/* Cuello */}
      <mesh position={[0, 1.2, 0.3]}>
        <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
        <meshStandardMaterial color="#e8d5b7" />
      </mesh>
      {/* Cabeza */}
      <mesh position={[0, 1.8, 0.4]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#e8d5b7" />
      </mesh>
      {/* Orejas */}
      <mesh position={[0.15, 2.1, 0.4]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.08, 0.25, 4]} />
        <meshStandardMaterial color="#e8d5b7" />
      </mesh>
      <mesh position={[-0.15, 2.1, 0.4]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.08, 0.25, 4]} />
        <meshStandardMaterial color="#e8d5b7" />
      </mesh>
      {/* Patas */}
      {[[-0.25, 0, 0.35], [0.25, 0, 0.35], [-0.25, 0, -0.35], [0.25, 0, -0.35]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          <meshStandardMaterial color="#d4c4a8" />
        </mesh>
      ))}
    </group>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fff8e7" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#2d7a4f" />
      
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      <Sun />
      <FloatingParticles />
      
      {/* Montañas - Cordillera del Tunari */}
      <MountainMesh position={[-4, -2, -8]} scale={2.5} color="#4a7c59" />
      <MountainMesh position={[-1.5, -2, -10]} scale={3.5} color="#2d5a3d" />
      <MountainMesh position={[2, -2, -9]} scale={3} color="#3d6b4a" />
      <MountainMesh position={[5, -2, -7]} scale={2} color="#5a8c69" />
      <MountainMesh position={[-6, -2, -6]} scale={1.8} color="#6a9c79" />
      <MountainMesh position={[0, -2, -12]} scale={4} color="#1d4a2d" />
      
      {/* Llamas */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Llama position={[-2, -1.8, -3]} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <Llama position={[2.5, -1.8, -4]} />
      </Float>
      
      {/* Suelo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#8fbc8f" />
      </mesh>
      
      <Environment preset="sunset" />
    </>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 1, 8], fov: 60 }}>
        <Scene3D />
      </Canvas>
    </div>
  )
}
