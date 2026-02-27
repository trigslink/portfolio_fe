import { ShieldCheck, Globe, Zap, Activity } from 'lucide-react';
import type { NavigationItem, FeatureItem, RoadmapItem, TeamMember } from '../types';

export const NAVIGATION: NavigationItem[] = [
  { name: 'PROTOCOL', href: '#features' },
  { name: 'NETWORK', href: '#architecture' },
  { name: 'ROADMAP', href: '#roadmap' },
  { name: 'TEAM', href: '#team' },
];

export const FEATURES: FeatureItem[] = [
  {
    title: 'Autonomous Resolution',
    subtitle: 'Zero-Human Bottleneck',
    description: 'Trigslink provides 15-second autonomous settlement through machine-verified logic, bypassing human-centric dispute windows.',
    icon: <Zap className="w-8 h-8 text-blue-400" />, 
    stat: '15s Finality'
  },
  {
    title: 'Universal Liquidity (ULR)',
    subtitle: 'Cross-Chain Rails',
    description: 'Unifies fragmented cross-chain capital into global rails, allowing instant-settle bets from any network while protecting capital.',
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    stat: 'ULR Engine'
  },
  {
    title: 'Machine Verified Grounding',
    subtitle: 'Evidence-Based Truth',
    description: 'Multi-node verification against official news wires and document repositories eliminates human heuristic bias.',
    icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
    stat: 'Node Integrity'
  },
  {
    title: 'Capital Velocity',
    subtitle: 'Institutional Efficiency',
    description: 'Eliminates the "Zombie Period" of locked capital, enabling high-frequency market makers to recycle liquidity instantly.',
    icon: <Activity className="w-8 h-8 text-blue-400" />,
    stat: '100% Utility'
  },
];

export const ROADMAP: RoadmapItem[] = [
  {
    phase: 'PHASE 01',
    title: 'Deterministic Trust',
    items: ['Autonomous Resolution Layer','ULR Cross-Chain Bridge','Global Truth Pool Aggregator'],
    status: 'current' 
  },
  {
    phase: 'PHASE 02',
    title: 'Universal Rails',
    items: [ 'Verification Script SDK','Core Handshake Logic Deployment', 'Institutional API Launch'],
    status: 'upcoming'
  },
  {
    phase: 'PHASE 03',
    title: 'Global Truth Router',
    items: ['Parametric Underwriting Hub', 'DAO Treasury Automation', 'Enterprise Compliance Gateways'],
    status: 'upcoming'
  },
];

export const TEAM: TeamMember[] = [
  { name: 'Aakash Jaiswal', role: 'Co-founder & Core AI Lead', initials: 'AJ', hex: '0x01', image: '/images/aakash.png' },
  { name: 'Gianluca Godfrey', role: 'Co-founder & Protocol Strategy', initials: 'GG', hex: '0x02', image: '/images/gianluca.png' },
  { name: 'Charles Cai', role: 'Protocol Architect', initials: 'CC', hex: '0x03', image: '/images/charles.png' },
  { name: 'Odudu Essien', role: 'Brand & Design', initials: 'OE', hex: '0x04', image: '/images/odudu.png' },
  { name: 'Yelena Cefalù', role: 'Growth Lead', initials: 'YC', hex: '0x05', image: '/images/yellie.png' }
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/trigslink', 
  youtube: 'https://youtube.com/@trigslink', 
  x: 'https://x.com/trigslink',
};