export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'documentation' | 'tutorial' | 'book';
  difficulty: DifficultyLevel;
  description?: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  resources: Resource[];
  subtopics?: string[]; // IDs of related topics
  difficulty: DifficultyLevel;
  position?: { x: number; y: number }; // For mind map layout
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}
