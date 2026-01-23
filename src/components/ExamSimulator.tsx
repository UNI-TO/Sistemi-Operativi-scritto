import { useState } from 'react';
import { Exam, UserAnswer } from '../types/Exam';
import QuestionCard from './QuestionCard';

interface ExamSimulatorProps {
  exam: Exam;
  onBack: () => void;
}

export default function ExamSimulator({ exam, onBack }: ExamSimulatorProps) {
  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswer>>(
    () => {
      const initial: Record<number, UserAnswer> = {};
      exam.questions.forEach((q) => {
        initial[q.number] = {
          questionNumber: q.number,
          answer: '',
          showSolution: false,
        };
      });
      return initial;
    }
  );

  const handleAnswerChange = (questionNumber: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: {
        ...prev[questionNumber],
        answer,
      },
    }));
  };

  const handleToggleSolution = (questionNumber: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: {
        ...prev[questionNumber],
        showSolution: !prev[questionNumber].showSolution,
      },
    }));
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Sei sicuro di voler resettare tutte le risposte?'
    );
    if (confirmed) {
      const reset: Record<number, UserAnswer> = {};
      exam.questions.forEach((q) => {
        reset[q.number] = {
          questionNumber: q.number,
          answer: '',
          showSolution: false,
        };
      });
      setUserAnswers(reset);
    }
  };

  return (
    <div className="exam-simulator">
      <div className="exam-header">
        <button onClick={onBack} className="back-button">
          ← Torna agli esami
        </button>
        <div className="exam-info">
          <h1>{exam.title}</h1>
          <p className="exam-meta">
            Data: {exam.date} | Corso: {exam.course} | {exam.questions.length}{' '}
            domande
          </p>
        </div>
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>

      <div className="questions-container">
        {exam.questions.map((question) => (
          <QuestionCard
            key={question.number}
            question={question}
            userAnswer={userAnswers[question.number]?.answer || ''}
            showSolution={userAnswers[question.number]?.showSolution || false}
            onAnswerChange={(answer) =>
              handleAnswerChange(question.number, answer)
            }
            onToggleSolution={() => handleToggleSolution(question.number)}
          />
        ))}
      </div>
    </div>
  );
}
