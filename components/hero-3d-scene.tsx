"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

/* ── Wireframe Shapes ─────────────────────────────── */

function WireframeShape({
  position,
  scale = 1,
  color = "#d4a853",
  opacity = 0.12,
  geometry,
  speed = 1,
}: {
  position: [number, number, number]
  scale?: number
  color?: string
  opacity?: number
  geometry: "torus-knot" | "icosahedron" | "dodecahedron" | "octahedron"
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    meshRef.current.rotation.x += 0.001 * speed
    meshRef.current.rotation.y += 0.0015 * speed
  })

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === "torus-knot" && <torusKnotGeometry args={[1, 0.3, 100, 16]} />}
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 1]} />}
        {geometry === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  )
}

/* ── Mouse-Reactive Light ─────────────────────────── */

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null!)
  const { viewport } = useThree()

  useFrame(({ pointer }) => {
    lightRef.current.position.x = pointer.x * viewport.width * 0.4
    lightRef.current.position.y = pointer.y * viewport.height * 0.4
    lightRef.current.position.z = 4
  })

  return <pointLight ref={lightRef} intensity={2} distance={20} color="#d4a853" />
}

/* ── Ambient Particles ────────────────────────────── */

function Particles({ count = 80 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!)

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15
  }

  useFrame((state) => {
    points.current.rotation.y = state.clock.elapsedTime * 0.02
    points.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#d4a853"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Main Scene ───────────────────────────────────── */

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.12} />
        <MouseLight />
        <Particles />

        {/* Large torus knot — golden, top-left */}
        <WireframeShape
          position={[-3.5, 2, -3]}
          scale={1.5}
          geometry="torus-knot"
          color="#d4a853"
          opacity={0.08}
          speed={0.6}
        />

        {/* Icosahedron — purple, right side */}
        <WireframeShape
          position={[4, -0.5, -2]}
          scale={1.3}
          geometry="icosahedron"
          color="#8b5cf6"
          opacity={0.07}
          speed={1}
        />

        {/* Octahedron — orange, bottom */}
        <WireframeShape
          position={[0.5, -3, -4]}
          scale={0.9}
          geometry="octahedron"
          color="#f97316"
          opacity={0.06}
          speed={1.3}
        />

        {/* Dodecahedron — gold, center-left, far */}
        <WireframeShape
          position={[-1.5, -1, -5]}
          scale={0.7}
          geometry="dodecahedron"
          color="#d4a853"
          opacity={0.04}
          speed={0.8}
        />

        {/* Small icosahedron — purple, top-right, close */}
        <WireframeShape
          position={[2.5, 3, -1]}
          scale={0.5}
          geometry="icosahedron"
          color="#a855f7"
          opacity={0.05}
          speed={1.6}
        />
      </Canvas>
    </div>
  )
}
