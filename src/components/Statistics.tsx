import { useState, useMemo } from 'react';
import { Exam, Topic, TOPICS_INFO, ExamScore } from '../types/Exam';

interface StatisticsProps {
  exams: Exam[];
  onBack: () => void;
}

interface TopicStats {
  topic: Topic;
  totalExams: number;
  completedExams: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
}

export default function Statistics({ exams, onBack }: StatisticsProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // Calcola statistiche per argomento
  const topicStats = useMemo(() => {
    const stats: Record<Topic, TopicStats> = {} as Record<Topic, TopicStats>;

    // Inizializza stats per ogni topic
    Object.keys(TOPICS_INFO).forEach((topic) => {
      stats[topic as Topic] = {
        topic: topic as Topic,
        totalExams: 0,
        completedExams: 0,
        totalQuestions: 0,
        answeredQuestions: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalPoints: 0,
        earnedPoints: 0,
        percentage: 0,
      };
    });

    // Analizza ogni esame
    exams.forEach((exam) => {
      if (!exam.topics || exam.topics.length === 0) return;

      // Carica score salvato
      const savedScore = localStorage.getItem(`exam_score_${exam.id}`);
      const examScore: ExamScore | null = savedScore ? JSON.parse(savedScore) : null;

      // Carica risposte utente
      const savedAnswers = localStorage.getItem(`exam_progress_${exam.id}`);
      const hasProgress = savedAnswers !== null;

      exam.topics.forEach((topic) => {
        if (!stats[topic]) return;

        stats[topic].totalExams++;

        if (hasProgress) {
          stats[topic].completedExams++;
        }

        // Conta le domande per questo topic
        exam.questions.forEach((question) => {
          stats[topic].totalQuestions++;
          stats[topic].totalPoints += question.maxPoints;
        });

        if (examScore) {
          stats[topic].answeredQuestions += examScore.answeredQuestions;
          stats[topic].correctAnswers += examScore.correctAnswers;
          stats[topic].incorrectAnswers += examScore.incorrectAnswers;
          stats[topic].earnedPoints += examScore.earnedPoints;
        }
      });
    });

    // Calcola percentuali
    Object.values(stats).forEach((stat) => {
      if (stat.totalPoints > 0) {
        stat.percentage = (stat.earnedPoints / stat.totalPoints) * 100;
      }
    });

    return stats;
  }, [exams]);

  // Statistiche globali
  const globalStats = useMemo(() => {
    let totalCompleted = 0;
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    exams.forEach((exam) => {
      const savedScore = localStorage.getItem(`exam_score_${exam.id}`);
      const examScore: ExamScore | null = savedScore ? JSON.parse(savedScore) : null;

      if (examScore) {
        totalCompleted++;
        answeredQuestions += examScore.answeredQuestions;
        correctAnswers += examScore.correctAnswers;
        earnedPoints += examScore.earnedPoints;
      }

      exam.questions.forEach((q) => {
        totalQuestions++;
        totalPoints += q.maxPoints;
      });
    });

    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

    return {
      totalExams: exams.length,
      totalCompleted,
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      totalPoints,
      earnedPoints,
      percentage,
    };
  }, [exams]);

  const getPerformanceColor = (percentage: number): string => {
    if (percentage >= 80) return '#22c55e'; // verde
    if (percentage >= 60) return '#f59e0b'; // arancione
    if (percentage >= 40) return '#fb923c'; // arancione scuro
    return '#ef4444'; // rosso
  };

  const filteredTopics = selectedTopic
    ? [topicStats[selectedTopic]]
    : Object.values(topicStats).sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="statistics-page">
      <div className="exam-header">
        <button onClick={onBack} className="back-button">
          ← Torna alla home
        </button>
        <div className="exam-info">
          <h1>📊 Statistiche Avanzate</h1>
          <p className="exam-meta">Analisi delle performance per argomento</p>
        </div>
      </div>

      {/* Statistiche Globali */}
      <div className="exam-score-card" style={{ marginBottom: '2rem' }}>
        <h3>📈 Statistiche Globali</h3>
        <div className="score-grid">
          <div className="score-item">
            <div className="score-value">{globalStats.totalCompleted}/{globalStats.totalExams}</div>
            <div className="score-label">Esami Completati</div>
          </div>
          <div className="score-item">
            <div className="score-value">{globalStats.answeredQuestions}/{globalStats.totalQuestions}</div>
            <div className="score-label">Domande Risposte</div>
          </div>
          <div className="score-item">
            <div className="score-value">{globalStats.correctAnswers}</div>
            <div className="score-label">Risposte Corrette</div>
          </div>
          <div className="score-item">
            <div className="score-value">{globalStats.earnedPoints.toFixed(1)}/{globalStats.totalPoints}</div>
            <div className="score-label">Punti Totali</div>
          </div>
          <div className="score-item">
            <div className="score-value" style={{ color: getPerformanceColor(globalStats.percentage) }}>
              {globalStats.percentage.toFixed(1)}%
            </div>
            <div className="score-label">Performance Media</div>
          </div>
        </div>
      </div>

      {/* Filtro per argomento */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ fontWeight: 'bold', marginRight: '1rem' }}>Filtra per argomento:</label>
        <select
          value={selectedTopic || ''}
          onChange={(e) => setSelectedTopic(e.target.value ? (e.target.value as Topic) : null)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
          }}
        >
          <option value="">Tutti gli argomenti</option>
          {Object.keys(TOPICS_INFO).map((topic) => (
            <option key={topic} value={topic}>
              {TOPICS_INFO[topic as Topic].label}
            </option>
          ))}
        </select>
      </div>

      {/* Statistiche per Argomento */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {filteredTopics.map((stat) => {
          const topicInfo = TOPICS_INFO[stat.topic];
          const completionRate = stat.totalExams > 0 ? (stat.completedExams / stat.totalExams) * 100 : 0;

          return (
            <div key={stat.topic} className="question-card" style={{ backgroundColor: '#f9fafb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1f2937' }}>
                    {topicInfo.label}
                  </h3>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
                    {topicInfo.description}
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#9ca3af', fontSize: '0.75rem' }}>
                    Capitoli: {topicInfo.chapters.join(', ')}
                  </p>
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: getPerformanceColor(stat.percentage),
                }}>
                  {stat.percentage.toFixed(0)}%
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
              }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                    {stat.completedExams}/{stat.totalExams}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    Esami completati ({completionRate.toFixed(0)}%)
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                    {stat.answeredQuestions}/{stat.totalQuestions}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Domande risposte</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>
                    {stat.correctAnswers}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Risposte corrette</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                    {stat.incorrectAnswers}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Risposte sbagliate</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1' }}>
                    {stat.earnedPoints.toFixed(1)}/{stat.totalPoints}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Punti</div>
                </div>
              </div>

              {/* Barra di progresso */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${stat.percentage}%`,
                    backgroundColor: getPerformanceColor(stat.percentage),
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <p style={{ fontSize: '1.25rem' }}>Nessuna statistica disponibile per questo argomento.</p>
          <p>Completa alcuni esami per visualizzare le tue performance!</p>
        </div>
      )}
    </div>
  );
}
