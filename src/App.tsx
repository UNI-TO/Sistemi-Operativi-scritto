import { useState } from 'react'
import './App.css'
import ExamList from './components/ExamList'
import ExamSimulator from './components/ExamSimulator'
import { Exam } from './types/Exam'
import examsData from './data/exams.json'

function App() {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const exams = examsData as Exam[]

  return (
    <div className="app">
      {!selectedExam ? (
        <ExamList
          exams={exams}
          onSelectExam={setSelectedExam}
        />
      ) : (
        <ExamSimulator
          exam={selectedExam}
          onBack={() => setSelectedExam(null)}
        />
      )}
    </div>
  )
}

export default App
