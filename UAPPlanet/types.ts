export enum ViewMode {
  EARTH = 'EARTH',
  GALAXY = 'GALAXY'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UAPEvent {
  id: string;
  title: string;
  year: string;
  locationName: string;
  coords: Coordinates; // For Earth placement
  shortDesc: string;
  image?: string;
  isAI?: boolean;
  type: 'CRASH' | 'ABDUCTION' | 'SIGHTING' | 'MUTILATION' | 'CONTACT';
}

export interface CelestialOrigin {
  id: string;
  name: string;
  designation: string; // e.g., Zeta Reticuli
  distance: string; // Light years
  associatedBeings?: string; // e.g., Greys
  position: [number, number, number]; // XYZ in 3D space relative to Earth
  shortDesc: string;
  image?: string;
  isAI?: boolean;
  type: 'HOMEWORLD' | 'SIGNAL' | 'ANOMALY';
}

export type SelectionData = UAPEvent | CelestialOrigin;