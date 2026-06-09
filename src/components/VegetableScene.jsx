import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense } from 'react'

// ── Tomato ─────────────────────────────────────────────────────────────────

function Tomato({ position, scale = 1, rotation = [0, 0, 0] }) {
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.8} floatingRange={[-0.15, 0.15]}>
      <group position={position} scale={scale} rotation={rotation}>
        {/* body */}
        <mesh castShadow>
          <sphereGeometry args={[0.5, 40, 40]} />
          <meshStandardMaterial color="#cc2200" roughness={0.18} metalness={0.06} />
        </mesh>
        {/* specular spot */}
        <mesh position={[-0.17, 0.23, 0.37]} scale={0.11}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="white" transparent opacity={0.55} roughness={0.0} />
        </mesh>
        {/* top crease */}
        <mesh position={[0, 0.44, 0]} scale={[1, 0.38, 1]}>
          <sphereGeometry args={[0.17, 14, 14]} />
          <meshStandardMaterial color="#a81800" roughness={0.4} />
        </mesh>
        {/* stem */}
        <mesh position={[0, 0.52, 0]} rotation={[0.1, 0, 0.05]}>
          <cylinderGeometry args={[0.034, 0.05, 0.24, 10]} />
          <meshStandardMaterial color="#2d5a1b" roughness={0.85} />
        </mesh>
        {/* calyx leaves */}
        {[0, 1.26, 2.51, 3.77, 5.03].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.13, 0.49, Math.sin(angle) * 0.13]}
            rotation={[Math.cos(angle) * 0.55, angle, 0.25]}
          >
            <boxGeometry args={[0.19, 0.035, 0.07]} />
            <meshStandardMaterial color="#3a7a22" roughness={0.75} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// ── Carrot ─────────────────────────────────────────────────────────────────

function Carrot({ position, scale = 1, rotation = [0, 0, 0] }) {
  return (
    <Float speed={1.0} rotationIntensity={0.9} floatIntensity={2.0} floatingRange={[-0.2, 0.2]}>
      <group position={position} scale={scale} rotation={rotation}>
        {/* body */}
        <mesh rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.25, 1.1, 18]} />
          <meshStandardMaterial color="#e8720c" roughness={0.38} metalness={0.04} />
        </mesh>
        {/* surface rings */}
        {[0.25, -0.05, -0.32].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <torusGeometry args={[0.25 - i * 0.056, 0.018, 8, 28]} />
            <meshStandardMaterial color="#c85e08" roughness={0.5} />
          </mesh>
        ))}
        {/* greens */}
        {[
          [0, 0, 0, 0], [0.07, 0.09, 0.04, 0.5], [-0.09, 0.11, -0.03, -0.6],
          [0.04, 0.07, -0.09, 1.2], [-0.05, 0.13, 0.07, -1.1],
        ].map(([ox, oy, oz, rz], i) => (
          <mesh
            key={i}
            position={[ox, 0.62 + oy, oz]}
            rotation={[0.15 * (i % 3 - 1), i * 0.8, rz]}
          >
            <cylinderGeometry args={[0.022, 0.038, 0.52, 7]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#3a9022' : '#2d7a1a'} roughness={0.7} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// ── Broccoli ───────────────────────────────────────────────────────────────

function Broccoli({ position, scale = 1, rotation = [0, 0, 0] }) {
  const florets = [
    [0,    0.14,  0,    0.46, '#28a745'],
    [0.33, 0.02,  0.09, 0.24, '#2ecc71'],
    [-0.33,0.02,  0.09, 0.24, '#27ae60'],
    [0.11, 0.04, -0.31, 0.24, '#2ecc71'],
    [-0.11,0.04,  0.31, 0.24, '#23a85a'],
    [0.23, 0.15, -0.21, 0.21, '#28a745'],
    [-0.23,0.17,  0.19, 0.21, '#2ecc71'],
    [0.18, 0.25,  0.18, 0.18, '#34d058'],
    [-0.18,0.26, -0.16, 0.18, '#28a745'],
  ]
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.1, 0.1]}>
      <group position={position} scale={scale} rotation={rotation}>
        {/* stem */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.17, 0.78, 14]} />
          <meshStandardMaterial color="#4a7a2a" roughness={0.82} />
        </mesh>
        {/* stem texture ring */}
        <mesh position={[0, -0.2, 0]}>
          <torusGeometry args={[0.13, 0.015, 6, 20]} />
          <meshStandardMaterial color="#3d6a22" roughness={0.8} />
        </mesh>
        {florets.map(([x, y, z, r, color], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <sphereGeometry args={[r, 12, 12]} />
            <meshStandardMaterial color={color} roughness={0.88} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// ── Avocado ────────────────────────────────────────────────────────────────

function Avocado({ position, scale = 1, rotation = [0, 0, 0] }) {
  return (
    <Float speed={1.2} rotationIntensity={0.75} floatIntensity={2.1} floatingRange={[-0.15, 0.15]}>
      <group position={position} scale={scale} rotation={rotation}>
        {/* outer skin — pear shape */}
        <mesh scale={[0.84, 1.2, 0.84]}>
          <sphereGeometry args={[0.52, 36, 36]} />
          <meshStandardMaterial color="#1e4d0a" roughness={0.72} metalness={0.04} />
        </mesh>
        {/* flesh (visible from cut side) */}
        <mesh position={[0.06, -0.02, 0.33]} scale={[0.53, 0.72, 0.44]}>
          <sphereGeometry args={[0.52, 28, 28]} />
          <meshStandardMaterial color="#b0d060" roughness={0.28} metalness={0.04} />
        </mesh>
        {/* pit */}
        <mesh position={[0.07, -0.02, 0.35]} scale={0.29}>
          <sphereGeometry args={[0.52, 20, 20]} />
          <meshStandardMaterial color="#7a3b10" roughness={0.62} metalness={0.08} />
        </mesh>
        {/* top nub */}
        <mesh position={[0, 0.65, 0]} scale={[0.12, 0.2, 0.12]}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color="#163808" roughness={0.85} />
        </mesh>
        {/* specular */}
        <mesh position={[-0.2, 0.3, 0.38]} scale={0.08}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.35} roughness={0.0} />
        </mesh>
      </group>
    </Float>
  )
}

// ── Lemon ──────────────────────────────────────────────────────────────────

function Lemon({ position, scale = 1, rotation = [0, 0, 0] }) {
  return (
    <Float speed={2.0} rotationIntensity={1.1} floatIntensity={1.7} floatingRange={[-0.18, 0.18]}>
      <group position={position} scale={scale} rotation={rotation}>
        {/* body */}
        <mesh scale={[1.32, 0.88, 1.05]}>
          <sphereGeometry args={[0.42, 36, 36]} />
          <meshStandardMaterial color="#f5e030" roughness={0.14} metalness={0.08} />
        </mesh>
        {/* specular */}
        <mesh position={[-0.22, 0.18, 0.3]} scale={0.1}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial color="white" transparent opacity={0.55} roughness={0.0} />
        </mesh>
        {/* tips */}
        {[-1, 1].map((dir, i) => (
          <mesh key={i} position={[dir * 0.53, 0, 0]} scale={[0.14, 0.1, 0.1]}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial color="#e0c820" roughness={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// ── Bell Pepper ────────────────────────────────────────────────────────────

function BellPepper({ position, scale = 1, rotation = [0, 0, 0] }) {
  return (
    <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.9} floatingRange={[-0.12, 0.12]}>
      <group position={position} scale={scale} rotation={rotation}>
        {/* main body */}
        <mesh scale={[1, 0.94, 1]} castShadow>
          <sphereGeometry args={[0.46, 36, 36]} />
          <meshStandardMaterial color="#c8380a" roughness={0.22} metalness={0.07} />
        </mesh>
        {/* 4 lobes */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.24, -0.1, Math.sin(angle) * 0.24]}
            scale={[0.5, 0.85, 0.5]}
          >
            <sphereGeometry args={[0.36, 18, 18]} />
            <meshStandardMaterial color="#b82a06" roughness={0.22} metalness={0.06} />
          </mesh>
        ))}
        {/* top collar */}
        <mesh position={[0, 0.41, 0]}>
          <cylinderGeometry args={[0.09, 0.22, 0.12, 14]} />
          <meshStandardMaterial color="#a02206" roughness={0.32} />
        </mesh>
        {/* stem */}
        <mesh position={[0, 0.54, 0]}>
          <cylinderGeometry args={[0.036, 0.056, 0.28, 10]} />
          <meshStandardMaterial color="#2d7a1a" roughness={0.82} />
        </mesh>
        {/* specular */}
        <mesh position={[-0.18, 0.2, 0.35]} scale={0.1}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.45} roughness={0.0} />
        </mesh>
      </group>
    </Float>
  )
}

// ── Garlic ─────────────────────────────────────────────────────────────────

function Garlic({ position, scale = 1, rotation = [0, 0, 0] }) {
  const cloves = [
    [0, 0, 0, 1.0],
    [0.28, 0, 0.1, 0.72], [-0.28, 0, 0.1, 0.72],
    [0.14, 0, -0.26, 0.68], [-0.14, 0, -0.26, 0.68],
  ]
  return (
    <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1.6} floatingRange={[-0.12, 0.12]}>
      <group position={position} scale={scale} rotation={rotation}>
        {cloves.map(([x, y, z, s], i) => (
          <mesh key={i} position={[x, y * s + (1 - s) * 0.08, z]} scale={[s * 0.5, s * 0.7, s * 0.5]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color={i === 0 ? '#f5f0e8' : '#ede8dc'} roughness={0.5} metalness={0.02} />
          </mesh>
        ))}
        {/* papery skin overtone */}
        <mesh scale={[0.88, 0.7, 0.88]} position={[0, -0.06, 0]}>
          <sphereGeometry args={[0.58, 20, 20]} />
          <meshStandardMaterial color="#e8dcc8" roughness={0.7} transparent opacity={0.35} />
        </mesh>
        {/* stem tip */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.028, 0.05, 0.22, 8]} />
          <meshStandardMaterial color="#c8b898" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

// ── Scene ──────────────────────────────────────────────────────────────────

function Scene() {
  return (
    <>
      {/* Lighting rig */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[8, 10, 6]}  intensity={1.5} color="#ffffff" castShadow />
      <pointLight      position={[-6, -4,  4]}  intensity={0.65} color="#b8f0d0" />
      <pointLight      position={[ 6,  5, -3]}  intensity={0.55} color="#ffeab0" />
      <pointLight      position={[ 0, -6,  5]}  intensity={0.3}  color="#ffffff" />

      {/* Left column */}
      <Broccoli   position={[-6.8,  2.4, -1.0]} scale={1.2}  rotation={[0.2,  0.5, -0.1]} />
      <Tomato     position={[-5.8, -0.8,  0.2]} scale={1.0}  rotation={[0.0,  0.3,  0.1]} />
      <Lemon      position={[-6.2, -3.0, -0.4]} scale={0.78} rotation={[0.3, -0.4,  0.2]} />

      {/* Top strip */}
      <Carrot     position={[-2.2,  4.2, -0.5]} scale={1.05} rotation={[0.2,  0.3, -1.3]} />
      <Garlic     position={[ 0.4,  4.0,  0.0]} scale={0.9}  rotation={[0.1, -0.5,  0.1]} />
      <BellPepper position={[ 2.8,  3.8,  0.0]} scale={0.9}  rotation={[0.1,  0.5,  0.1]} />

      {/* Right column */}
      <Avocado    position={[ 6.4,  2.2,  0.2]} scale={1.15} rotation={[0.3, -0.4,  0.2]} />
      <Lemon      position={[ 6.0, -0.6, -0.4]} scale={0.88} rotation={[0.1,  0.6, -0.2]} />
      <Broccoli   position={[ 5.6, -2.8,  0.0]} scale={0.82} rotation={[-0.2, 0.8,  0.1]} />

      {/* Bottom strip */}
      <Tomato     position={[-3.4, -3.4,  0.2]} scale={0.78} rotation={[0.1, -0.5, -0.1]} />
      <Carrot     position={[ 2.0, -3.8,  0.0]} scale={0.88} rotation={[-0.3, 0.2,  1.5]} />
      <Garlic     position={[-0.8, -3.5, -0.3]} scale={0.72} rotation={[0.2,  0.8, -0.2]} />
    </>
  )
}

// ── Export ─────────────────────────────────────────────────────────────────

export default function VegetableScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 46 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
