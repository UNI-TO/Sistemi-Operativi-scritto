import { Question, UserAnswer } from '../types/Exam';

interface ImageQuestionProps {
  question: Question;
  examId: string;
  userAnswer?: UserAnswer;
  selectedOptions: string[];
  showSolution: boolean;
  isCorrect?: boolean;
  onAnswerChange: (selectedOptions: string[]) => void;
  onToggleSolution: () => void;
  onCheckAnswer: () => void;
}

export default function ImageQuestion({
  question,
  examId,
  selectedOptions,
  showSolution,
  isCorrect,
  onAnswerChange,
  onToggleSolution,
  onCheckAnswer
}: ImageQuestionProps) {
  const isTrueFalse = question.type === 'true-false';
  const isMultianswer = question.type === 'multianswer';

  // Generate image path based on exam ID and question image reference
  const imagePath = question.imageRef
    ? `/exams/${examId}/${question.imageRef}`
    : null;

  const handleOptionClick = (optionId: string) => {
    if (isTrueFalse) {
      onAnswerChange([optionId]);
    } else {
      const isSelected = selectedOptions.includes(optionId);
      if (isSelected) {
        onAnswerChange(selectedOptions.filter(id => id !== optionId));
      } else {
        onAnswerChange([...selectedOptions, optionId]);
      }
    }
  };

  const getOptionClassName = (option: { id: string; isCorrect?: boolean }) => {
    const isSelected = selectedOptions.includes(option.id);
    let className = 'option-item';

    if (isSelected) {
      className += ' selected';
    }

    if (showSolution) {
      if (option.isCorrect) {
        className += ' correct';
      } else if (isSelected && !option.isCorrect) {
        className += ' incorrect';
      }
    }

    return className;
  };

  return (
    <div className="image-question-card">
      <div className="question-header">
        <h3>Domanda {question.number}</h3>
        <div className="question-meta">
          <span className="question-type-badge">{question.type || 'essay'}</span>
          <span className="points-badge">
            {question.maxPoints} {question.maxPoints === 1 ? 'punto' : 'punti'}
            {question.negativePoints && question.negativePoints > 0 && (
              <span className="negative-points"> (-{question.negativePoints})</span>
            )}
          </span>
        </div>
      </div>

      <div className="question-text">
        <p>{question.text}</p>
      </div>

      {imagePath && (
        <div className="question-image-container">
          <img
            src={imagePath}
            alt={`Domanda ${question.number}`}
            className="question-image"
            onError={(e) => {
              console.error(`Failed to load image: ${imagePath}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {isTrueFalse && question.options && (
        <div className="options-container">
          {question.options.map((option) => (
            <button
              key={option.id}
              className={getOptionClassName(option)}
              onClick={() => handleOptionClick(option.id)}
              disabled={showSolution}
            >
              <span className="option-text">{option.text}</span>
              {showSolution && option.isCorrect && (
                <span className="correct-indicator">✓</span>
              )}
              {showSolution && !option.isCorrect && selectedOptions.includes(option.id) && (
                <span className="incorrect-indicator">✗</span>
              )}
            </button>
          ))}
        </div>
      )}

      {isMultianswer && question.correctAnswers && (
        <div className="multianswer-container">
          <p className="multianswer-instruction">
            Seleziona le risposte corrette per ogni affermazione (V = Vero, F = Falso)
          </p>
          <div className="multianswer-grid">
            {question.correctAnswers.map((_, index) => (
              <div key={index} className="multianswer-row">
                <span className="multianswer-label">Affermazione {index + 1}:</span>
                <div className="multianswer-options">
                  <button
                    className={`multianswer-option ${selectedOptions[index] === 'V' ? 'selected' : ''} ${
                      showSolution && question.correctAnswers![index] === 'V' ? 'correct' : ''
                    } ${
                      showSolution && selectedOptions[index] === 'V' && question.correctAnswers![index] !== 'V'
                        ? 'incorrect'
                        : ''
                    }`}
                    onClick={() => {
                      const newAnswers = [...selectedOptions];
                      newAnswers[index] = 'V';
                      onAnswerChange(newAnswers);
                    }}
                    disabled={showSolution}
                  >
                    V
                  </button>
                  <button
                    className={`multianswer-option ${selectedOptions[index] === 'F' ? 'selected' : ''} ${
                      showSolution && question.correctAnswers![index] === 'F' ? 'correct' : ''
                    } ${
                      showSolution && selectedOptions[index] === 'F' && question.correctAnswers![index] !== 'F'
                        ? 'incorrect'
                        : ''
                    }`}
                    onClick={() => {
                      const newAnswers = [...selectedOptions];
                      newAnswers[index] = 'F';
                      onAnswerChange(newAnswers);
                    }}
                    disabled={showSolution}
                  >
                    F
                  </button>
                  {showSolution && (
                    <span className="correct-answer-hint">
                      (Risposta: {question.correctAnswers![index]})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMultianswer && !question.correctAnswers && (
        <div className="multianswer-open">
          <textarea
            className="multianswer-textarea"
            placeholder="Scrivi qui la tua risposta..."
            value={selectedOptions[0] || ''}
            onChange={(e) => onAnswerChange([e.target.value])}
            disabled={showSolution}
            rows={4}
          />
        </div>
      )}

      <div className="question-actions">
        {!showSolution && selectedOptions.length > 0 && (
          <button className="btn btn-primary" onClick={onCheckAnswer}>
            Verifica Risposta
          </button>
        )}
        {showSolution && (
          <>
            <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <span className="feedback-icon">✓</span>
                  <span className="feedback-text">
                    Risposta corretta! +{question.maxPoints} {question.maxPoints === 1 ? 'punto' : 'punti'}
                  </span>
                </>
              ) : (
                <>
                  <span className="feedback-icon">✗</span>
                  <span className="feedback-text">
                    Risposta errata.{' '}
                    {question.negativePoints && question.negativePoints > 0
                      ? `-${question.negativePoints} ${
                          question.negativePoints === 1 ? 'punto' : 'punti'
                        }`
                      : 'Nessuna penalità'}
                  </span>
                </>
              )}
            </div>
            <button className="btn btn-secondary" onClick={onToggleSolution}>
              Nascondi Soluzione
            </button>
          </>
        )}
        {!showSolution && (
          <button className="btn btn-secondary" onClick={onToggleSolution}>
            Mostra Soluzione
          </button>
        )}
      </div>

      {showSolution && (
        <div className="solution-section">
          <h4>Soluzione</h4>
          <div className="solution-content">
            <pre>{question.answer}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
