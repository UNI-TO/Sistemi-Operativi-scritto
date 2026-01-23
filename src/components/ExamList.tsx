import { Exam } from '../types/Exam';

interface ExamListProps {
  exams: Exam[];
  onSelectExam: (exam: Exam) => void;
}

export default function ExamList({ exams, onSelectExam }: ExamListProps) {
  // Group exams by date
  const groupedExams = exams.reduce((acc, exam) => {
    const date = exam.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exam);
    return acc;
  }, {} as Record<string, Exam[]>);

  return (
    <div className="exam-list">
      <h2>Seleziona un Esame</h2>
      <div className="exam-groups">
        {Object.entries(groupedExams).map(([date, dateExams]) => (
          <div key={date} className="exam-group">
            <h3>{date}</h3>
            <div className="exam-courses">
              {dateExams.map((exam) => (
                <button
                  key={`${exam.id}-${exam.course}`}
                  onClick={() => onSelectExam(exam)}
                  className="exam-button"
                >
                  Corso {exam.course}
                  <span className="question-count">
                    {exam.questions.length} domande
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
