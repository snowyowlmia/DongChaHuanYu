import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { UAP_EVENTS, EARTH_DAY_MAP, EARTH_NORMAL_MAP } from '../constants';
import { UAPEvent } from '../types';

interface GlobeProps {
  onSelectEvent: (event: UAPEvent) => void;
  isPaused: boolean;
}

// Helper to convert Lat/Lng to Vector3 on a sphere
const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  return new THREE.Vector3(x, y, z);
};

export const Globe: React.FC<Omit<GlobeProps, 'isPaused'>> = () => {
  const [colorMap, normalMap] = useLoader(TextureLoader, [
    EARTH_DAY_MAP,
    EARTH_NORMAL_MAP
  ]);

  return (
    <group>
      {/* Earth Surface - High Quality, No Clouds as requested */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.8, 0.8)}
          roughness={0.7} // Matte finish for better visibility
          metalness={0.0}
        />
      </mesh>

      {/* Atmosphere Glow - Very Subtle */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#4f90ff" transparent opacity={0.05} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

export const RotatingSystem: React.FC<GlobeProps> = ({ onSelectEvent, isPaused }) => {
   const groupRef = useRef<THREE.Group>(null);
   const [hovered, setHovered] = useState<string | null>(null);
   
   // Rotate the entire system (Earth + Markers) together
   useFrame((_, delta) => {
     if (groupRef.current && !isPaused && !hovered) {
       groupRef.current.rotation.y += delta * 0.05;
     }
   });

   const markers = useMemo(() => {
    return UAP_EVENTS.map((event) => {
      // Radius matches earth radius + small offset
      const position = latLngToVector3(event.coords.lat, event.coords.lng, 2.5);
      return { ...event, position };
    });
  }, []);

   return (
     <group ref={groupRef}>
        <Globe onSelectEvent={onSelectEvent} />
        {markers.map((event) => (
          <group key={event.id} position={event.position} lookAt={(new THREE.Vector3(0,0,0))}>
             {/* Marker Point */}
             <mesh 
               onClick={(e) => { e.stopPropagation(); onSelectEvent(event); }}
               onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(event.id); }}
               onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(null); }}
             >
               <sphereGeometry args={[0.04, 16, 16]} />
               <meshBasicMaterial color="#ff3333" toneMapped={false} />
             </mesh>
             
             {/* Pulse Ring */}
             <mesh 
                onClick={(e) => { e.stopPropagation(); onSelectEvent(event); }}
                onPointerOver={() => setHovered(event.id)}
                onPointerOut={() => setHovered(null)}
             >
               <ringGeometry args={[0.06, 0.08, 32]} />
               <meshBasicMaterial color="#ff3333" side={THREE.DoubleSide} transparent opacity={0.6} />
             </mesh>
             
             {/* Interaction Hit Box (Invisible larger area for easier clicking) */}
             <mesh 
                onClick={(e) => { e.stopPropagation(); onSelectEvent(event); }} 
                onPointerOver={() => setHovered(event.id)}
                onPointerOut={() => setHovered(null)}
                visible={false}
             >
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial />
             </mesh>
          </group>
        ))}
     </group>
   )
}