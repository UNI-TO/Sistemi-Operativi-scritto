export interface Question {
  number: number;
  text: string;
  answer: string;
  maxPoints: number;
  type?: 'essay' | 'multianswer';
}

export interface Exam {
  id: string;
  date: string;
  course: string;
  title: string;
  questions: Question[];
}

export interface UserAnswer {
  questionNumber: number;
  answer: string;
  showSolution: boolean;
}
