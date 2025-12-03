import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import { Robot } from './Robot';

interface RobotSceneProps {
  mousePosition: { x: number; y: number };
}

export function RobotScene({ mousePosition }: RobotSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 45 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={1024}
        />
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={0.3} 
          color="#b8e8e8"
        />
        <pointLight 
          position={[0, 2, 2]} 
          intensity={0.5} 
          color="hsl(175, 70%, 50%)" 
        />
        
        {/* Robot with floating animation */}
        <Float
          speed={2}
          rotationIntensity={0.1}
          floatIntensity={0.3}
          floatingRange={[-0.05, 0.05]}
        >
          <Robot mousePosition={mousePosition} />
        </Float>
        
        {/* Ground shadow */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={5}
          blur={2}
          far={4}
          color="hsl(175, 50%, 30%)"
        />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
