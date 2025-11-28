import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { CELESTIAL_ORIGINS, CONSTELLATIONS, ConstellationData } from '../constants';
import { CelestialOrigin } from '../types';

interface StarMapProps {
  onSelectOrigin: (origin: CelestialOrigin) => void;
}

// Reusable Orbiting Planet Component
const OrbitingBody: React.FC<{ 
  radius: number; 
  speed: number; 
  size: number; 
  color: string; 
  offset?: number;
  name?: string;
}> = ({ radius, speed, size, color, offset = 0, name }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * speed + offset;
    }
  });

  return (
    <group ref={ref}>
      <group position={[radius, 0, 0]}>
        <mesh>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {name && (
          <Html distanceFactor={15} zIndexRange={[50, 0]}>
             <div className="text-[10px] text-white/80 whitespace-nowrap bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10 transform -translate-y-6 pointer-events-none">
                 {name}
             </div>
          </Html>
        )}
      </group>
      
      {/* Orbit Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Component to render a single constellation
const ConstellationGroup: React.FC<{
  data: ConstellationData;
  originData?: CelestialOrigin; // Passed if this constellation contains a target system
  onSelect: (origin: CelestialOrigin) => void;
}> = ({ data, originData, onSelect }) => {
  
  // Calculate line points
  const linePoints = useMemo(() => {
    return data.lines.map(([startIdx, endIdx]) => {
      const start = new THREE.Vector3(...data.stars[startIdx].pos);
      const end = new THREE.Vector3(...data.stars[endIdx].pos);
      return [start, end] as [THREE.Vector3, THREE.Vector3];
    });
  }, [data]);

  const isSelectedSystem = (index: number) => index === data.mainSystemIndex;

  return (
    <group>
      {/* Constellation Lines */}
      {linePoints.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={data.color}
          transparent
          opacity={0.3} // Subtle lines
          lineWidth={1}
        />
      ))}

      {/* Stars in the Constellation */}
      {data.stars.map((star, index) => {
        const isTarget = isSelectedSystem(index) && originData;
        
        return (
          <group key={index} position={star.pos}>
            <mesh 
              onClick={(e) => {
                if (isTarget) {
                  e.stopPropagation();
                  onSelect(originData);
                }
              }}
            >
              <sphereGeometry args={[star.size * (isTarget ? 1.2 : 0.5), 16, 16]} />
              <meshStandardMaterial 
                color={isTarget ? data.color : '#ffffff'} 
                emissive={isTarget ? data.color : '#000000'}
                emissiveIntensity={isTarget ? 2 : 0}
                transparent
                opacity={isTarget ? 1 : 0.4} // Non-target stars are dimmer
              />
            </mesh>

            {/* IF THIS IS THE TARGET SYSTEM, ADD DETAILS (Label, Orbits, etc) */}
            {isTarget && (
              <group>
                 {/* Connection Line to Earth (Visual reference) */}
                 <Line
                    points={[[0, 0, 0], [-star.pos[0], -star.pos[1], -star.pos[2]]]}
                    color={data.color}
                    transparent
                    opacity={0.1}
                    lineWidth={1}
                    dashed
                 />
                 
                 {/* Label */}
                 <Html position={[0, 2, 0]} center distanceFactor={25} zIndexRange={[100, 0]}>
                   <div 
                     onClick={(e) => { e.stopPropagation(); onSelect(originData); }}
                     className="cursor-pointer group flex flex-col items-center"
                   >
                     <div 
                       className="text-white font-mono text-sm bg-black/60 px-3 py-1 rounded border transition-colors whitespace-nowrap"
                       style={{ borderColor: data.color }}
                     >
                        {originData.name}
                     </div>
                     <div className="text-xs text-white/60 text-center mt-1 font-bold">{originData.distance}</div>
                   </div>
                 </Html>

                 {/* SPECIAL VISUALS FOR SPECIFIC SYSTEMS */}
                 
                 {/* Proxima System -> Add Proxima b */}
                 {originData.id === 'proxima-b' && (
                    <OrbitingBody radius={1.8} speed={0.8} size={0.3} color="#a8a29e" offset={1} name="比邻星 b" />
                 )}

                 {/* Sirius System -> Add Sirius B */}
                 {originData.id === 'sirius' && (
                    <OrbitingBody radius={2.5} speed={0.2} size={0.3} color="#ffffff" offset={2} name="天狼星 B" />
                 )}
                 
                 {/* Zeta Reticuli -> Binary Companion (Zeta 2) */}
                 {originData.id === 'zeta-reticuli' && (
                    <OrbitingBody radius={2.0} speed={0.3} size={1.0} color="#fbbf24" offset={3} name="泽塔星 2 (Zeta 2)" />
                 )}

                 {/* Glow Halo */}
                 <mesh scale={[2, 2, 2]}>
                    <sphereGeometry args={[star.size, 16, 16]} />
                    <meshBasicMaterial color={data.color} transparent opacity={0.1} />
                 </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};

export const StarMap: React.FC<StarMapProps> = ({ onSelectOrigin }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  // Get origins that are NOT part of a constellation definition to render them as standalone
  const standaloneOrigins = CELESTIAL_ORIGINS.filter(origin => 
    !CONSTELLATIONS.some(c => c.targetId === origin.id)
  );

  return (
    <group ref={groupRef}>
      {/* --- CENTER: SOLAR SYSTEM --- */}
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <OrbitingBody radius={2.5} speed={0.5} size={0.3} color="#3b82f6" name="地球" />
        <Html position={[0, 1.5, 0]} center distanceFactor={15} zIndexRange={[100, 0]}>
          <div className="text-yellow-200 font-mono text-xs bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-yellow-900/50 whitespace-nowrap">
            太阳系
          </div>
        </Html>
      </group>

      {/* --- CONSTELLATIONS --- */}
      {CONSTELLATIONS.map(constellation => {
        const originData = CELESTIAL_ORIGINS.find(o => o.id === constellation.targetId);
        return (
          <ConstellationGroup 
            key={constellation.id} 
            data={constellation} 
            originData={originData}
            onSelect={onSelectOrigin} 
          />
        );
      })}

      {/* --- STANDALONE SYSTEMS (No Constellation Map defined yet) --- */}
      {standaloneOrigins.map((origin) => {
        const pos = new THREE.Vector3(...origin.position);
        
        return (
          <group key={origin.id} position={pos}>
            <Line
              points={[[0, 0, 0], [-pos.x, -pos.y, -pos.z]]}
              color="#ffffff"
              transparent
              opacity={0.1}
              lineWidth={1}
            />
            <group onClick={(e) => { e.stopPropagation(); onSelectOrigin(origin); }}>
              <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial 
                  color="#aa00ff" 
                  emissive="#8800ff"
                  emissiveIntensity={2}
                  toneMapped={false}
                />
              </mesh>
              <Html position={[0, 2.5, 0]} center distanceFactor={25} zIndexRange={[100, 0]}>
                 <div className="cursor-pointer group flex flex-col items-center">
                   <div className="text-white font-mono text-sm bg-black/60 px-3 py-1 rounded border border-purple-500 whitespace-nowrap">
                      {origin.name}
                   </div>
                 </div>
              </Html>
            </group>
          </group>
        );
      })}
    </group>
  );
};
