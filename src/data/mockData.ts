import { Participant, Winner } from '../types';

// Mock participants data
export const participants: Participant[] = [
  {
    id: '1',
    name: 'Laura Martínez',
    email: 'laura.martinez@789.mx',
    phone: '(55) 1234-5678',
    projectIdea: 'Una aplicación de realidad aumentada para turismo cultural en México',
    background: 'Desarrolladora Front-end',
    skills: [
      { name: 'JavaScript', level: 'Avanzado' },
      { name: 'React Native', level: 'Intermedio' },
      { name: 'UX/UI', level: 'Experto' },
      { name: 'AR/VR', level: 'Básico' }
    ],
    registerDate: new Date('2025-04-10'),
    teamId: null
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@789.mx',
    phone: '(55) 8765-4321',
    projectIdea: 'Plataforma de análisis predictivo para pequeñas empresas',
    background: 'Científico de Datos',
    skills: [
      { name: 'Python', level: 'Experto' },
      { name: 'Machine Learning', level: 'Avanzado' },
      { name: 'SQL', level: 'Intermedio' },
      { name: 'Data Visualization', level: 'Avanzado' }
    ],
    registerDate: new Date('2025-04-11'),
    teamId: null
  }
];

// Mock winners data
export const winners: Winner[] = [
  {
    id: '1',
    position: 1,
    name: 'Equipo Innovador',
    projectName: 'AI Assistant Pro',
    projectDescription: 'Solución integral que demuestra el uso efectivo de herramientas de IA para automatización de procesos empresariales.',
    teamMembers: ['Laura Martínez', 'Carlos Rodríguez'],
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    position: 2,
    name: 'Tech Duo',
    projectName: 'Smart Process',
    projectDescription: 'Sistema inteligente que utiliza GitHub Copilot y T3 Chat para optimizar flujos de trabajo.',
    teamMembers: ['Ana Gómez', 'Miguel Torres'],
    imageUrl: 'https://images.pexels.com/photos/7947551/pexels-photo-7947551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    position: 3,
    name: 'AI Innovators',
    projectName: 'AI Workflow',
    projectDescription: 'Plataforma que integra Visual Studio con IA y PH Studio para mejorar la productividad del equipo.',
    teamMembers: ['Sofia Hernández', 'Daniel López'],
    imageUrl: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Hackathon information
export const hackathonInfo = {
  title: '789.mx Hackathon de Innovación 2025',
  date: 'Del 10 al 11 de mayo de 2025',
  location: 'Ciudad de México, México',
  phase: 'registration' as HackathonPhase,
  registrationDeadline: '30 de abril de 2025',
  description: 'Únete al primer Hackathon de Innovación organizado por 789.mx. Dos días intensivos de desarrollo y creación de soluciones tecnológicas innovadoras utilizando las últimas herramientas de IA.',
  categories: [
    {
      name: 'Prototipo funcional',
      description: 'Desarrollo de una aplicación, plataforma o experiencia completamente funcional.'
    },
    {
      name: 'Pitch o presentación final',
      description: 'Presentación efectiva de la solución en máximo 5 minutos.'
    },
    {
      name: 'Documentación',
      description: 'Documento o video breve que explique la solución desarrollada.'
    }
  ],
  requiredTools: [
    'T3 Chat',
    'GitHub Copilot',
    'Cursor',
    'Visual Studio con IA',
    'PH Studio',
    'Prism – Automatización'
  ],
  evaluationCriteria: [
    {
      name: 'Originalidad e innovación',
      weight: 25,
      description: 'Grado de creatividad y novedad de la solución propuesta.'
    },
    {
      name: 'Viabilidad técnica y operativa',
      weight: 25,
      description: 'Factibilidad de implementación y sostenibilidad de la solución en el contexto de la empresa.'
    },
    {
      name: 'Impacto en la organización',
      weight: 25,
      description: 'Potencial de la solución para mejorar procesos, comunicación o cultura organizacional.'
    },
    {
      name: 'Presentación y comunicación',
      weight: 25,
      description: 'Claridad, coherencia y persuasión en la presentación del proyecto al jurado.'
    }
  ],
  timeline: [
    {
      name: 'Sesión de lanzamiento y presentación del reto',
      date: '09/04/2025',
      description: 'Presentación del desafío y las reglas del hackathon'
    },
    {
      name: 'Desarrollo del hackathon',
      date: '10/05/2025 - 11/05/2025',
      description: 'Dos días intensivos de desarrollo y creación'
    },
    {
      name: 'Presentación de proyectos',
      date: '12/05/2025',
      description: 'Presentación ante el jurado'
    },
    {
      name: 'Anuncio de ganadores y premiación',
      date: '15/05/2025 - 16/05/2025',
      description: 'Ceremonia de premiación y reconocimiento'
    }
  ],
  prizes: [
    {
      position: 1,
      prize: '20,000 MXN para el equipo (dividido en partes iguales), implementación del proyecto, reconocimiento institucional, licencias Pro'
    },
    {
      position: 2,
      prize: '10,000 MXN, licencias Pro, reconocimiento y 3 días libres'
    },
    {
      position: 3,
      prize: 'Licencias Pro y reconocimiento institucional'
    }
  ]
};

// Function to save a new participant (mock implementation)
export const saveParticipant = (participant: Omit<Participant, 'id' | 'registerDate' | 'teamId'>): Promise<Participant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newParticipant: Participant = {
        ...participant,
        id: (participants.length + 1).toString(),
        registerDate: new Date(),
        teamId: null
      };
      participants.push(newParticipant);
      resolve(newParticipant);
    }, 500);
  });
};

// Mock teams data
export interface Team {
  id: string;
  name: string;
  members: string[];
  createdAt: Date;
}

export const teams: Team[] = [];

export const createTeam = (name: string, memberIds: string[]): Promise<Team> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTeam: Team = {
        id: (teams.length + 1).toString(),
        name,
        members: memberIds,
        createdAt: new Date()
      };
      
      // Update participants with team assignment
      memberIds.forEach(memberId => {
        const participant = participants.find(p => p.id === memberId);
        if (participant) {
          participant.teamId = newTeam.id;
        }
      });
      
      teams.push(newTeam);
      resolve(newTeam);
    }, 500);
  });
};