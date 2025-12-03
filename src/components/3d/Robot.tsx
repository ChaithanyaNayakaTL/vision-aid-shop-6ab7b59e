import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, RoundedBox, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface RobotProps {
  mousePosition: { x: number; y: number };
}

export function Robot({ mousePosition }: RobotProps) {
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  // Teal color matching the theme
  const tealColor = useMemo(() => new THREE.Color('hsl(175, 70%, 35%)'), []);
  const tealGlow = useMemo(() => new THREE.Color('hsl(175, 70%, 50%)'), []);
  const bodyColor = useMemo(() => new THREE.Color('#e8f4f4'), []);
  const darkTeal = useMemo(() => new THREE.Color('hsl(175, 60%, 25%)'), []);

  useFrame((state, delta) => {
    // Head follows cursor with smooth lerp
    if (headRef.current) {
      const targetRotationY = mousePosition.x * 0.4;
      const targetRotationX = -mousePosition.y * 0.2;
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        delta * 3
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        delta * 3
      );
    }

    // Right arm points toward cursor
    if (rightArmRef.current) {
      const targetRotationZ = -0.3 + mousePosition.x * 0.3;
      const targetRotationX = mousePosition.y * 0.2;
      
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        targetRotationZ,
        delta * 2.5
      );
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        targetRotationX,
        delta * 2.5
      );
    }

    // Eyes look at cursor
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeTargetX = mousePosition.x * 0.08;
      const eyeTargetY = mousePosition.y * 0.05;
      
      leftEyeRef.current.position.x = THREE.MathUtils.lerp(
        leftEyeRef.current.position.x,
        -0.18 + eyeTargetX,
        delta * 5
      );
      leftEyeRef.current.position.y = THREE.MathUtils.lerp(
        leftEyeRef.current.position.y,
        0.08 + eyeTargetY,
        delta * 5
      );
      
      rightEyeRef.current.position.x = THREE.MathUtils.lerp(
        rightEyeRef.current.position.x,
        0.18 + eyeTargetX,
        delta * 5
      );
      rightEyeRef.current.position.y = THREE.MathUtils.lerp(
        rightEyeRef.current.position.y,
        0.08 + eyeTargetY,
        delta * 5
      );
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Body - Main torso */}
      <group position={[0, 0.5, 0]}>
        <RoundedBox args={[1.2, 1.4, 0.7]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
        </RoundedBox>
        
        {/* Chest plate with teal accent */}
        <RoundedBox args={[0.8, 0.6, 0.1]} radius={0.08} position={[0, 0.1, 0.35]}>
          <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
        </RoundedBox>
        
        {/* Chest light */}
        <Sphere args={[0.08]} position={[0, 0.1, 0.42]}>
          <meshStandardMaterial 
            color={tealGlow} 
            emissive={tealGlow} 
            emissiveIntensity={2}
          />
        </Sphere>

        {/* Center chest detail circles */}
        {[-0.15, 0.15].map((x, i) => (
          <Sphere key={i} args={[0.05]} position={[x, -0.15, 0.42]}>
            <meshStandardMaterial 
              color={tealGlow} 
              emissive={tealGlow} 
              emissiveIntensity={1.5}
            />
          </Sphere>
        ))}
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 1.55, 0]}>
        {/* Main head */}
        <RoundedBox args={[0.8, 0.7, 0.65]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
        </RoundedBox>
        
        {/* Face plate */}
        <RoundedBox args={[0.65, 0.45, 0.1]} radius={0.08} position={[0, 0, 0.32]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.2}
            chromaticAberration={0.02}
            transmission={0.95}
            roughness={0.1}
            color="#b8e8e8"
          />
        </RoundedBox>
        
        {/* Eyes - glowing teal */}
        <Sphere ref={leftEyeRef} args={[0.08]} position={[-0.18, 0.08, 0.38]}>
          <meshStandardMaterial 
            color={tealGlow} 
            emissive={tealGlow} 
            emissiveIntensity={3}
          />
        </Sphere>
        <Sphere ref={rightEyeRef} args={[0.08]} position={[0.18, 0.08, 0.38]}>
          <meshStandardMaterial 
            color={tealGlow} 
            emissive={tealGlow} 
            emissiveIntensity={3}
          />
        </Sphere>

        {/* Antenna */}
        <group position={[0, 0.45, 0]}>
          <Cylinder args={[0.02, 0.02, 0.15]} position={[0, 0.075, 0]}>
            <meshStandardMaterial color={darkTeal} metalness={0.8} roughness={0.2} />
          </Cylinder>
          <Sphere args={[0.05]} position={[0, 0.18, 0]}>
            <meshStandardMaterial
              color={tealGlow} 
              emissive={tealGlow} 
              emissiveIntensity={2}
            />
          </Sphere>
        </group>

        {/* Ear pieces */}
        {[-0.45, 0.45].map((x, i) => (
          <RoundedBox key={i} args={[0.08, 0.2, 0.15]} radius={0.03} position={[x, 0, 0]}>
            <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
          </RoundedBox>
        ))}
      </group>

      {/* Neck */}
      <Cylinder args={[0.15, 0.2, 0.2]} position={[0, 1.15, 0]}>
        <meshStandardMaterial color={darkTeal} metalness={0.6} roughness={0.3} />
      </Cylinder>

      {/* Right Arm (pointing arm) */}
      <group ref={rightArmRef} position={[0.75, 0.9, 0]}>
        {/* Shoulder */}
        <Sphere args={[0.15]} position={[0, 0, 0]}>
          <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
        </Sphere>
        
        {/* Upper arm */}
        <group rotation={[0, 0, -0.5]}>
          <RoundedBox args={[0.18, 0.5, 0.18]} radius={0.06} position={[0.15, -0.1, 0]}>
            <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
          </RoundedBox>
          
          {/* Elbow */}
          <Sphere args={[0.1]} position={[0.25, -0.3, 0]}>
            <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
          </Sphere>
          
          {/* Forearm */}
          <RoundedBox args={[0.14, 0.45, 0.14]} radius={0.05} position={[0.35, -0.45, 0]}>
            <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
          </RoundedBox>
          
          {/* Hand */}
          <group position={[0.38, -0.72, 0]}>
            <RoundedBox args={[0.16, 0.12, 0.08]} radius={0.03}>
              <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
            </RoundedBox>
            {/* Pointing finger */}
            <Cylinder args={[0.025, 0.02, 0.15]} position={[0.03, 0.12, 0]} rotation={[0, 0, 0]}>
              <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
            </Cylinder>
          </group>
        </group>
      </group>

      {/* Left Arm */}
      <group position={[-0.75, 0.9, 0]}>
        {/* Shoulder */}
        <Sphere args={[0.15]} position={[0, 0, 0]}>
          <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
        </Sphere>
        
        {/* Upper arm */}
        <RoundedBox args={[0.18, 0.5, 0.18]} radius={0.06} position={[-0.1, -0.3, 0]}>
          <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
        </RoundedBox>
        
        {/* Elbow */}
        <Sphere args={[0.1]} position={[-0.1, -0.55, 0]}>
          <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
        </Sphere>
        
        {/* Forearm */}
        <RoundedBox args={[0.14, 0.45, 0.14]} radius={0.05} position={[-0.1, -0.85, 0]}>
          <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
        </RoundedBox>
        
        {/* Hand */}
        <RoundedBox args={[0.16, 0.12, 0.08]} radius={0.03} position={[-0.1, -1.12, 0]}>
          <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
        </RoundedBox>
      </group>

      {/* Legs */}
      {[-0.3, 0.3].map((x, i) => (
        <group key={i} position={[x, -0.4, 0]}>
          {/* Hip joint */}
          <Sphere args={[0.12]} position={[0, 0, 0]}>
            <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
          </Sphere>
          
          {/* Upper leg */}
          <RoundedBox args={[0.22, 0.5, 0.22]} radius={0.06} position={[0, -0.35, 0]}>
            <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
          </RoundedBox>
          
          {/* Knee */}
          <Sphere args={[0.1]} position={[0, -0.65, 0]}>
            <meshStandardMaterial color={tealColor} metalness={0.5} roughness={0.2} />
          </Sphere>
          
          {/* Lower leg */}
          <RoundedBox args={[0.2, 0.5, 0.2]} radius={0.06} position={[0, -0.95, 0]}>
            <meshStandardMaterial color={bodyColor} metalness={0.1} roughness={0.3} />
          </RoundedBox>
          
          {/* Foot */}
          <RoundedBox args={[0.22, 0.1, 0.32]} radius={0.04} position={[0, -1.25, 0.05]}>
            <meshStandardMaterial color={darkTeal} metalness={0.6} roughness={0.2} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}
