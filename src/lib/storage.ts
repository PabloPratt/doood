export type DooodUser = {
  name: string;
  email: string;
  createdAt: string;
};

export type SavedProject = {
  id: string;
  title: string;
  bookType: string;
  genre: string;
  audience: string;
  tone: string;
  idea: string;
  length: string;
  goal: string;
  blueprint: {
    title: string;
    promise: string;
    targetReader?: string;
    chapters: Array<{ title: string; goal: string }>;
    milestones: string[];
    writingPlan: string;
    firstQuest?: string;
    nextActions?: string[];
  };
  wordCount: number;
  createdAt: string;
  updatedAt: string;
};

export const USER_KEY = 'doood_user';
export const PROJECTS_KEY = 'doood_projects';
