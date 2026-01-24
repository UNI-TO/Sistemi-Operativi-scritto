import { useState } from 'react';
import { Exam, Topic, TOPICS_INFO } from '../types/Exam';

interface ExamListProps {
  exams: Exam[];
  onSelectExam: (exam: Exam) => void;
  selectedTopic?: Topic | null;
}

export default function ExamList({ exams, onSelectExam, selectedTopic }: ExamListProps) {
  const [filterTopic, setFilterTopic] = useState<Topic | null>(selectedTopic || null);

  // Filter exams by topic if selected
  const filteredExams = filterTopic
    ? exams.filter(exam => exam.topics?.includes(filterTopic))
    : exams;

  // Group exams by date
  const groupedExams = filteredExams.reduce((acc, exam) => {
    const date = exam.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exam);
    return acc;
  }, {} as Record<string, Exam[]>);

  // Get unique topics from all exams
  const allTopics = Array.from(
    new Set(exams.flatMap(exam => exam.topics || []))
  ).sort();

  return (
    <div className="exam-list">
      <h2>Seleziona un Esame</h2>

      {/* Topic filter */}
      {allTopics.length > 0 && (
        <div className="topic-filter">
          <label>Filtra per argomento:</label>
          <div className="topic-buttons">
            <button
              className={`filter-button ${filterTopic === null ? 'active' : ''}`}
              onClick={() => setFilterTopic(null)}
            >
              Tutti ({exams.length})
            </button>
            {allTopics.map(topic => {
              const count = exams.filter(e => e.topics?.includes(topic)).length;
              return (
                <button
                  key={topic}
                  className={`filter-button ${filterTopic === topic ? 'active' : ''}`}
                  onClick={() => setFilterTopic(topic)}
                >
                  {TOPICS_INFO[topic]?.label || topic} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Exams list */}
      <div className="exam-groups">
        {Object.entries(groupedExams).length === 0 ? (
          <div className="no-exams">
            <p>Nessun esame trovato per questo argomento.</p>
          </div>
        ) : (
          Object.entries(groupedExams).map(([date, dateExams]) => (
            <div key={date} className="exam-group">
              <h3>{date}</h3>
              <div className="exam-courses">
                {dateExams.map((exam) => (
                  <button
                    key={`${exam.id}-${exam.course}`}
                    onClick={() => onSelectExam(exam)}
                    className="exam-button"
                  >
                    <div className="exam-button-header">
                      Corso {exam.course}
                      <span className="question-count">
                        {exam.questions.length} domande
                      </span>
                    </div>
                    {exam.topics && exam.topics.length > 0 && (
                      <div className="exam-topics">
                        {exam.topics.map(topic => (
                          <span key={topic} className={`topic-tag ${topic}`}>
                            {TOPICS_INFO[topic]?.label.split(' - ')[0] || topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
