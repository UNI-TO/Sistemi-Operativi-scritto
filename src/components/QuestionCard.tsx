import { Question } from '../types/Exam';

interface QuestionCardProps {
  question: Question;
  userAnswer: string;
  showSolution: boolean;
  onAnswerChange: (answer: string) => void;
  onToggleSolution: () => void;
}

export default function QuestionCard({
  question,
  userAnswer,
  showSolution,
  onAnswerChange,
  onToggleSolution
}: QuestionCardProps) {
  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-title">
          <h3>Domanda {question.number}</h3>
          {question.type && (
            <span className={`question-type-badge ${question.type}`}>
              {question.type === 'essay' ? 'Codice' : 'Quiz'}
            </span>
          )}
        </div>
        <span className="points">Punteggio max.: {question.maxPoints}</span>
      </div>

      <div className="question-text">
        <pre>{question.text}</pre>
      </div>

      <div className="answer-section">
        <label htmlFor={`answer-${question.number}`}>La tua risposta:</label>
        <textarea
          id={`answer-${question.number}`}
          value={userAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          rows={15}
          className="code-editor"
          placeholder="Scrivi qui la tua soluzione in C..."
        />
      </div>

      <div className="solution-section">
        <button onClick={onToggleSolution} className="toggle-solution">
          {showSolution ? 'Nascondi' : 'Mostra'} Soluzione
        </button>

        {showSolution && (
          <div className="solution-content">
            <h4>Soluzione:</h4>
            <pre className="code-solution">{question.answer}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
