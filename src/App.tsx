import { useState } from 'react'
import './App.css'
import ExamList from './components/ExamList'
import ExamSimulator from './components/ExamSimulator'
import StudyMaterials from './components/StudyMaterials'
import { Exam, StudyMaterial, Topic } from './types/Exam'
import examsData from './data/exams.json'
import studyMaterialsData from './data/study-materials.json'

type View = 'home' | 'exams' | 'study' | 'simulator';

function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  const exams = examsData as Exam[]
  const studyMaterials = studyMaterialsData as StudyMaterial[]

  const handleSelectExam = (exam: Exam) => {
    setSelectedExam(exam)
    setCurrentView('simulator')
  }

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic)
    setCurrentView('exams')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedExam(null)
    setSelectedTopic(null)
  }

  return (
    <div className="app">
      {currentView === 'home' && (
        <div className="home">
          <header className="home-header">
            <h1>🎓 Simulatore Esami - Sistemi Operativi</h1>
            <p>Preparati per l'esame di Sistemi Operativi con esercizi pratici in C e teoria</p>
          </header>

          <div className="home-actions">
            <button
              className="main-action-button exams"
              onClick={() => setCurrentView('exams')}
            >
              <span className="action-icon">📝</span>
              <span className="action-title">Esami</span>
              <span className="action-desc">Pratica con {exams.length} esami completi</span>
            </button>

            <button
              className="main-action-button study"
              onClick={() => setCurrentView('study')}
            >
              <span className="action-icon">📚</span>
              <span className="action-title">Teoria</span>
              <span className="action-desc">Consulta il materiale di studio</span>
            </button>
          </div>

          <div className="home-stats">
            <div className="stat-card">
              <div className="stat-number">{exams.length}</div>
              <div className="stat-label">Esami disponibili</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {exams.reduce((sum, e) => sum + e.questions.length, 0)}
              </div>
              <div className="stat-label">Domande totali</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{studyMaterials.length}</div>
              <div className="stat-label">Argomenti trattati</div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'exams' && !selectedExam && (
        <ExamList
          exams={exams}
          onSelectExam={handleSelectExam}
          selectedTopic={selectedTopic}
        />
      )}

      {currentView === 'study' && (
        <StudyMaterials
          materials={studyMaterials}
          onSelectTopic={handleSelectTopic}
          onBack={handleBackToHome}
        />
      )}

      {currentView === 'simulator' && selectedExam && (
        <ExamSimulator
          exam={selectedExam}
          onBack={handleBackToHome}
        />
      )}

      {currentView !== 'home' && currentView !== 'simulator' && currentView !== 'study' && (
        <button onClick={handleBackToHome} className="floating-back-button">
          ← Home
        </button>
      )}
    </div>
  )
}

export default App
