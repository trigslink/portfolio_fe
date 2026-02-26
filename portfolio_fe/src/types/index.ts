import type { ReactNode } from 'react';

export interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

export interface FeatureItem {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  stat: string;
}

export interface RoadmapItem {
  phase: string;
  title: string;
  items: string[];
  status: 'completed' | 'current' | 'upcoming';
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  hex: string;
  image: string;
}

export interface Dot {
  x: number;
  y: number;
  z: number;
  neighbors: { idx: number; dist: number }[] | number[]; 
  pulse: number;
}

export interface ProjectedDot {
  x: number;
  y: number;
  scale: number;
  z: number;
  originalIndex: number;
  pulse: number;
}

export interface Signal {
  startIdx: number;
  endIdx: number;
  progress: number;
}