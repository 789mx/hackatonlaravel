export interface Skill {
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectIdea: string;
  background: string;
  skills: Skill[];
  registerDate: Date;
  teamId: string | null;
}

export interface Winner {
  id: string;
  position: number;
  name: string;
  projectName: string;
  projectDescription: string;
  teamMembers: string[];
  imageUrl: string;
}

export type HackathonPhase = 'registration' | 'development' | 'judging' | 'completed';

export interface EvaluationCriteria {
  name: string;
  weight: number;
  description: string;
}

export interface TimelineEvent {
  name: string;
  date: string;
  description: string;
}