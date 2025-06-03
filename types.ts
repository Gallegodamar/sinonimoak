export interface DailyQuestion {
  id: string;
  targetWord: string;
  options: string[]; // Should contain 3 options, one of them being the correctSynonym
  correctSynonym: string;
}

export interface UserAnswer {
  questionId: string;
  targetWord: string;
  selectedOption: string;
  correctSynonym: string;
  isCorrect: boolean;
  score: number; // Puntuazioa galdera bakoitzeko
}

export type GameState = 'START_SCREEN' | 'LOADING' | 'PLAYING' | 'RESULTS' | 'ERROR';

export interface StoredGameData {
  questions: DailyQuestion[];
  fetchTimestamp: string; // ISO string
  // lastPlayedDate?: string; // ISO string, noiz jokatu zen azkenekoz - REMOVED
}

export enum FeedbackType {
  NONE = 'NONE',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}