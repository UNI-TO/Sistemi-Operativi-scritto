// Opzioni per domande a scelta multipla
export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  number: number;
  text: string;
  answer: string;
  maxPoints: number;
  type?: 'essay' | 'multianswer' | 'multiple-choice' | 'true-false' | 'matching';

  // Per domande a scelta multipla/vero-falso
  options?: QuestionOption[];
  correctAnswer?: string | string[];  // Risposta corretta (singola o multiple)
  correctAnswers?: string[];  // Array di risposte corrette per domande multianswer con V/F

  // Punteggio negativo per risposte sbagliate
  negativePoints?: number;  // Punti da sottrarre se sbagliato (default: 0)

  // Per domande con immagini
  imageRef?: string;  // Nome del file immagine (es. "1.png")

  // Per domande di matching/associazione
  pairs?: Array<{ left: string; right: string }>;
}

export interface Exam {
  id: string;
  date: string;
  course: string;
  title: string;
  questions: Question[];
  topics?: Topic[];  // Collegamenti agli argomenti trattati
}

export interface UserAnswer {
  questionNumber: number;
  answer: string;  // Per essay/multianswer
  selectedOptions?: string[];  // Per multiple-choice
  showSolution: boolean;
  isCorrect?: boolean;  // Validazione risposta
  pointsEarned?: number;  // Punti guadagnati (può essere negativo!)
}

export interface ExamScore {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  answeredQuestions: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

// Argomenti del corso (6 parti)
export type Topic =
  | 'generalita'
  | 'processi-scheduling'
  | 'sincronizzazione'
  | 'memoria-primaria'
  | 'memoria-massa'
  | 'file-system';

export interface StudyMaterial {
  id: string;
  topic: Topic;
  title: string;
  description: string;
  chapters: string[];  // Capitoli del libro di riferimento
  pdfFiles: string[];  // File PDF nella cartella
}

export const TOPICS_INFO: Record<Topic, {
  label: string;
  description: string;
  chapters: string[];
  folderName: string;
}> = {
  'generalita': {
    label: 'I - Generalità',
    description: 'Introduzione e strutture dei sistemi operativi',
    chapters: ['Cap. 1', 'Cap. 2'],
    folderName: 'parteUno-Generalità'
  },
  'processi-scheduling': {
    label: 'II - Gestione dei Processi',
    description: 'Processi, Thread e Scheduling della CPU',
    chapters: ['Cap. 3', 'Cap. 4', 'Cap. 5'],
    folderName: 'parteDue-Tre-Gestione dei processi Sincronizzazione dei processi'
  },
  'sincronizzazione': {
    label: 'III - Sincronizzazione',
    description: 'Strumenti di sincronizzazione e esempi',
    chapters: ['Cap. 6', 'Cap. 7'],
    folderName: 'parteDue-Tre-Gestione dei processi Sincronizzazione dei processi'
  },
  'memoria-primaria': {
    label: 'IV - Gestione della Memoria',
    description: 'Memoria centrale e memoria virtuale',
    chapters: ['Cap. 9', 'Cap. 10'],
    folderName: 'parteQuattro-Gestione della memoria (primaria)'
  },
  'memoria-massa': {
    label: 'V - Memoria di Massa',
    description: 'Dischi rigidi, RAID e SSD',
    chapters: ['Cap. 11'],
    folderName: 'parteCinque-Gestione della memoria di massa'
  },
  'file-system': {
    label: 'VI - File System',
    description: 'Interfaccia e realizzazione del file system',
    chapters: ['Cap. 13', 'Cap. 14'],
    folderName: 'parteSei-File System'
  }
};
