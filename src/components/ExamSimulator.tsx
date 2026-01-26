import { useState, useEffect } from 'react';
import { Exam, UserAnswer, ExamScore } from '../types/Exam';
import QuestionCard from './QuestionCard';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ImageQuestion from './ImageQuestion';
import { useLocalStorage, clearExamProgress } from '../hooks/useLocalStorage';

interface ExamSimulatorProps {
  exam: Exam;
  onBack: () => void;
}

export default function ExamSimulator({ exam, onBack }: ExamSimulatorProps) {
  // Usa localStorage per salvare i progressi
  const [userAnswers, setUserAnswers] = useLocalStorage<Record<number, UserAnswer>>(
    `exam_progress_${exam.id}`,
    (() => {
      const initial: Record<number, UserAnswer> = {};
      exam.questions.forEach((q) => {
        initial[q.number] = {
          questionNumber: q.number,
          answer: '',
          selectedOptions: [],
          showSolution: false,
        };
      });
      return initial;
    })()
  );

  const [examScore, setExamScore] = useLocalStorage<ExamScore | null>(
    `exam_score_${exam.id}`,
    null
  );

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save ogni volta che cambiano le risposte
  useEffect(() => {
    setLastSaved(new Date());
  }, [userAnswers]);

  const handleAnswerChange = (questionNumber: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: {
        ...prev[questionNumber],
        answer,
      },
    }));
  };

  const handleOptionsChange = (questionNumber: number, selectedOptions: string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: {
        ...prev[questionNumber],
        selectedOptions,
      },
    }));
  };

  const handleCheckAnswer = (questionNumber: number) => {
    const question = exam.questions.find(q => q.number === questionNumber);
    const userAnswer = userAnswers[questionNumber];

    if (!question || !userAnswer.selectedOptions) return;

    let isCorrect = false;

    // Check if it's a multianswer with correctAnswers array (for V/F sequences)
    if (question.correctAnswers && Array.isArray(question.correctAnswers) && userAnswer.selectedOptions) {
      // Compare user's array with correct answers array
      const selectedOpts = userAnswer.selectedOptions;
      isCorrect = question.correctAnswers.length === selectedOpts.length &&
        question.correctAnswers.every((correctAns, idx) =>
          correctAns === selectedOpts[idx]
        );
    } else if (question.correctAnswer) {
      // Regular multiple choice or true/false
      const selectedSet = new Set(userAnswer.selectedOptions);
      const correctAnswer = question.correctAnswer;

      if (Array.isArray(correctAnswer)) {
        // Multiple answers
        const correctSet = new Set(correctAnswer);
        isCorrect = selectedSet.size === correctSet.size &&
          [...selectedSet].every(opt => correctSet.has(opt));
      } else {
        // Single answer
        isCorrect = selectedSet.size === 1 && selectedSet.has(correctAnswer);
      }
    }

    // Calcola punteggio
    const pointsEarned = isCorrect
      ? question.maxPoints
      : -(question.negativePoints || 0);

    setUserAnswers((prev) => ({
      ...prev,
      [questionNumber]: {
        ...prev[questionNumber],
        isCorrect,
        pointsEarned,
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

  const calculateScore = (): ExamScore => {
    let totalPoints = 0;
    let earnedPoints = 0;
    let answeredQuestions = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    exam.questions.forEach(q => {
      totalPoints += q.maxPoints;
      const userAnswer = userAnswers[q.number];

      if (userAnswer.pointsEarned !== undefined) {
        earnedPoints += userAnswer.pointsEarned;
        answeredQuestions++;
        if (userAnswer.isCorrect) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      }
    });

    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

    return {
      totalPoints,
      earnedPoints,
      percentage,
      answeredQuestions,
      totalQuestions: exam.questions.length,
      correctAnswers,
      incorrectAnswers,
    };
  };

  const handleShowScore = () => {
    setExamScore(calculateScore());
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Sei sicuro di voler resettare tutte le risposte? Questo cancellerà anche il salvataggio locale.'
    );
    if (confirmed) {
      const reset: Record<number, UserAnswer> = {};
      exam.questions.forEach((q) => {
        reset[q.number] = {
          questionNumber: q.number,
          answer: '',
          selectedOptions: [],
          showSolution: false,
        };
      });
      setUserAnswers(reset);
      setExamScore(null);
      clearExamProgress(exam.id);
      setLastSaved(null);
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
          {lastSaved && (
            <p className="auto-save-indicator">
              💾 Auto-salvato {lastSaved.toLocaleTimeString('it-IT')}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={handleShowScore} className="back-button">
            📊 Mostra Punteggio
          </button>
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </div>

      {examScore && (
        <div className="exam-score-card">
          <h3>📊 Risultato Esame</h3>
          <div className="score-grid">
            <div className="score-item">
              <div className="score-value">{examScore.earnedPoints.toFixed(1)}</div>
              <div className="score-label">Punti Ottenuti</div>
            </div>
            <div className="score-item">
              <div className="score-value">{examScore.totalPoints}</div>
              <div className="score-label">Punti Totali</div>
            </div>
            <div className="score-item">
              <div className="score-value">{examScore.percentage.toFixed(1)}%</div>
              <div className="score-label">Percentuale</div>
            </div>
            <div className="score-item">
              <div className="score-value">{examScore.correctAnswers}</div>
              <div className="score-label">Corrette</div>
            </div>
            <div className="score-item">
              <div className="score-value">{examScore.incorrectAnswers}</div>
              <div className="score-label">Sbagliate</div>
            </div>
            <div className="score-item">
              <div className="score-value">{examScore.answeredQuestions}/{examScore.totalQuestions}</div>
              <div className="score-label">Risposte Date</div>
            </div>
          </div>
        </div>
      )}

      <div className="questions-container">
        {exam.questions.map((question) => {
          const userAnswer = userAnswers[question.number];
          const hasImage = !!question.imageRef;
          const isMultipleChoiceType = question.type === 'true-false' ||
                                       question.type === 'multiple-choice' ||
                                       question.type === 'multianswer';

          // Use ImageQuestion for questions with images
          if (hasImage) {
            return (
              <ImageQuestion
                key={question.number}
                question={question}
                examId={exam.id}
                userAnswer={userAnswer}
                selectedOptions={userAnswer?.selectedOptions || []}
                showSolution={userAnswer?.showSolution || false}
                isCorrect={userAnswer?.isCorrect}
                onAnswerChange={(selected) =>
                  handleOptionsChange(question.number, selected)
                }
                onToggleSolution={() => handleToggleSolution(question.number)}
                onCheckAnswer={() => handleCheckAnswer(question.number)}
              />
            );
          }

          // Use MultipleChoiceQuestion for true/false and multiple choice without images
          if (isMultipleChoiceType) {
            return (
              <MultipleChoiceQuestion
                key={question.number}
                question={question}
                selectedOptions={userAnswer?.selectedOptions || []}
                showSolution={userAnswer?.showSolution || false}
                isCorrect={userAnswer?.isCorrect}
                onAnswerChange={(selected) =>
                  handleOptionsChange(question.number, selected)
                }
                onToggleSolution={() => handleToggleSolution(question.number)}
                onCheckAnswer={() => handleCheckAnswer(question.number)}
              />
            );
          }

          // Use QuestionCard for essay questions
          return (
            <QuestionCard
              key={question.number}
              question={question}
              userAnswer={userAnswer?.answer || ''}
              showSolution={userAnswer?.showSolution || false}
              onAnswerChange={(answer) =>
                handleAnswerChange(question.number, answer)
              }
              onToggleSolution={() => handleToggleSolution(question.number)}
            />
          );
        })}
      </div>
    </div>
  );
}
