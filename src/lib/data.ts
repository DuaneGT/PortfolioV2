import type { Project } from '@/types';

export const aboutMeText = "I'm a versatile developer with a passion for creating robust, user-centric web applications and engaging, interactive game experiences. My journey in tech began with a curiosity for how things work, which quickly evolved into a career building dynamic websites and complex applications. Along the way, I cultivated a deep interest in game development, bringing imaginative worlds to life with code. My solid foundation in cybersecurity principles ensures that everything I build is not only functional and beautiful but also secure and reliable. I thrive on solving complex problems and am always eager to learn new technologies to push the boundaries of what's possible.";

export const skills = {
  "Web Development": [
    "React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Node.js",
    "Express", "Python", "Django", "HTML5", "CSS3", "Tailwind CSS",
    "PostgreSQL", "MongoDB",
  ],
  "Game Development": [
    "Unity", "C#", "Unreal Engine", "C++", "Blender", "Photon",
    "Game Design Principles", "3D Modeling", "VR/AR Development",
  ],
  "Cybersecurity": [
    "OWASP Top 10", "Network Security", "Penetration Testing Concepts",
    "Secure Coding Practices", "Cryptography Basics", "Vulnerability Assessment",
  ],
};

export const initialProjects: Project[] = [
  {
    title: 'Secure E-commerce Platform',
    description: 'A full-stack e-commerce site with secure payment integration, user authentication, and an admin dashboard for managing products.',
    category: 'Web Development',
    image: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Auth.js'],
    highlight: false,
    dataAiHint: 'online shopping'
  },
  {
    title: 'Project Management Dashboard',
    description: 'A real-time, collaborative project management tool inspired by Trello, built with a focus on performance and user experience.',
    category: 'Web Development',
    image: 'https://placehold.co/600x400.png',
    tags: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
    highlight: false,
    dataAiHint: 'team collaboration'
  },
  {
    title: 'Cybersecurity Educational Hub',
    description: 'An interactive platform for learning cybersecurity concepts, featuring tutorials, quizzes, and simulated attack scenarios.',
    category: 'Web Development',
    image: 'https://placehold.co/600x400.png',
    tags: ['Django', 'Python', 'React', 'Docker'],
    highlight: false,
    dataAiHint: 'security training'
  },
  {
    title: 'Veridian Keeper',
    description: 'A 3D puzzle-platformer where players must navigate treacherous environments to restore a dying forest. Made in Unreal Engine.',
    category: 'Game Development',
    image: 'https://placehold.co/600x400.png',
    tags: ['Unreal Engine', 'C++', 'Blender'],
    highlight: false,
    dataAiHint: 'fantasy forest'
  },
  {
    title: 'Pixel Raiders',
    description: 'A fast-paced, 2D rogue-like dungeon crawler with procedurally generated levels and a wide variety of enemies and loot.',
    category: 'Game Development',
    image: 'https://placehold.co/600x400.png',
    tags: ['Unity', 'C#', 'Pixel Art'],
    highlight: false,
    dataAiHint: 'pixel art'
  },
  {
    title: 'VR Escape Room',
    description: 'An immersive virtual reality escape room experience that challenges players with intricate puzzles and a compelling narrative.',
    category: 'Game Development',
    image: 'https://placehold.co/600x400.png',
    tags: ['Unity', 'VR', 'C#', 'Oculus'],
    highlight: false,
    dataAiHint: 'virtual reality'
  },
];
