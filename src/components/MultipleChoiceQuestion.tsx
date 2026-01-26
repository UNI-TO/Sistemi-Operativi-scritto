import { Question } from '../types/Exam';

interface MultipleChoiceQuestionProps {
  question: Question;
  selectedOptions: string[];
  showSolution: boolean;
  isCorrect?: boolean;
  onAnswerChange: (selected: string[]) => void;
  onToggleSolution: () => void;
  onCheckAnswer?: () => void;
}

export default function MultipleChoiceQuestion({
  question,
  selectedOptions,
  showSolution,
  isCorrect,
  onAnswerChange,
  onToggleSolution,
  onCheckAnswer
}: MultipleChoiceQuestionProps) {
  const isTrueFalse = question.type === 'true-false';

  const handleOptionClick = (optionId: string) => {
    if (isTrueFalse) {
      // True/False: solo una risposta
      onAnswerChange([optionId]);
    } else {
      // Multiple choice: può essere singola o multipla
      const isSelected = selectedOptions.includes(optionId);
      if (isSelected) {
        onAnswerChange(selectedOptions.filter(id => id !== optionId));
      } else {
        onAnswerChange([...selectedOptions, optionId]);
      }
    }
  };

  const getScoreDisplay = () => {
    if (isCorrect === undefined) return null;

    const points = isCorrect ? question.maxPoints : -(question.negativePoints || 0);
    const bgColor = isCorrect ? '#d4edda' : '#f8d7da';
    const textColor = isCorrect ? '#155724' : '#721c24';

    return (
      <div
        className="score-badge"
        style={{
          background: bgColor,
          color: textColor,
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontWeight: '600',
          marginTop: '1rem'
        }}
      >
        {isCorrect ? '✓ Corretto' : '✗ Sbagliato'}
        {' '}
        ({points > 0 ? '+' : ''}{points} punti)
      </div>
    );
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-title">
          <h3>Domanda {question.number}</h3>
          <span className={`question-type-badge ${question.type}`}>
            {isTrueFalse ? 'Vero/Falso' : 'Scelta Multipla'}
          </span>
        </div>
        <div className="points-info">
          <span className="points">Punti: +{question.maxPoints}</span>
          {question.negativePoints && question.negativePoints > 0 && (
            <span className="negative-points" style={{ color: '#dc3545', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
              (Se sbagliato: -{question.negativePoints})
            </span>
          )}
        </div>
      </div>

      <div className="question-text">
        <pre>{question.text}</pre>
      </div>

      <div className="answer-section">
        <label>Seleziona la risposta:</label>
        <div className="options-list">
          {question.options?.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const showCorrect = showSolution && option.isCorrect;
            const showIncorrect = showSolution && isSelected && !option.isCorrect;

            return (
              <div
                key={option.id}
                className={`option-item ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showIncorrect ? 'incorrect' : ''}`}
                onClick={() => !showSolution && handleOptionClick(option.id)}
                style={{
                  cursor: showSolution ? 'default' : 'pointer',
                }}
              >
                <input
                  type={isTrueFalse ? 'radio' : 'checkbox'}
                  checked={isSelected}
                  onChange={() => {}}
                  disabled={showSolution}
                />
                <span className="option-text">{option.text}</span>
                {showCorrect && <span className="correct-indicator">✓ Corretto</span>}
                {showIncorrect && <span className="incorrect-indicator">✗ Sbagliato</span>}
              </div>
            );
          })}
        </div>

        {selectedOptions.length > 0 && !showSolution && onCheckAnswer && (
          <button onClick={onCheckAnswer} className="check-answer-button">
            Verifica Risposta
          </button>
        )}

        {getScoreDisplay()}
      </div>

      <div className="solution-section">
        <button onClick={onToggleSolution} className="toggle-solution">
          {showSolution ? 'Nascondi' : 'Mostra'} Soluzione
        </button>

        {showSolution && question.answer && (
          <div className="solution-content">
            <h4>Spiegazione:</h4>
            <pre className="code-solution">{question.answer}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
