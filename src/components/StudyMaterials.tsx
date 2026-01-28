import { useState } from 'react';
import { StudyMaterial, TOPICS_INFO, Topic } from '../types/Exam';

interface StudyMaterialsProps {
  materials: StudyMaterial[];
  onSelectTopic?: (topic: Topic) => void;
  onBack: () => void;
}

export default function StudyMaterials({ materials, onSelectTopic, onBack }: StudyMaterialsProps) {
  const [expandedSummaries, setExpandedSummaries] = useState<Record<string, boolean>>({});

  const toggleSummary = (materialId: string) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [materialId]: !prev[materialId]
    }));
  };

  return (
    <div className="study-materials">
      <div className="study-header">
        <h2>📚 Materiale di Studio</h2>
        <button onClick={onBack} className="back-button">
          ← Torna alla Home
        </button>
      </div>

      <div className="materials-grid">
        {materials.map((material) => {
          const topicInfo = TOPICS_INFO[material.topic];

          return (
            <div key={material.id} className="material-card">
              <div className="material-header">
                <h3>{material.title}</h3>
                <span className={`topic-badge ${material.topic}`}>
                  {topicInfo.label}
                </span>
              </div>

              <p className="material-description">{material.description}</p>

              <div className="material-chapters">
                <h4>Capitoli:</h4>
                <ul>
                  {material.chapters.map((chapter, idx) => (
                    <li key={idx}>{chapter}</li>
                  ))}
                </ul>
              </div>

              {material.summary && (
                <div className="material-summary-container">
                  <button
                    className="summary-toggle-button"
                    onClick={() => toggleSummary(material.id)}
                  >
                    {expandedSummaries[material.id] ? '▼' : '▶'} 📖 Riassunto Dettagliato
                  </button>

                  {expandedSummaries[material.id] && (
                    <div className="material-summary">
                      <h4>📖 Concetti Chiave:</h4>
                      <ul className="summary-list key-concepts">
                        {material.summary.keyConcepts.map((concept, idx) => (
                          <li key={idx} dangerouslySetInnerHTML={{ __html: concept }} />
                        ))}
                      </ul>

                      <h4>⭐ Punti Importanti:</h4>
                      <ul className="summary-list important-points">
                        {material.summary.importantPoints.map((point, idx) => (
                          <li key={idx} dangerouslySetInnerHTML={{ __html: point }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {material.pdfFiles && material.pdfFiles.length > 0 ? (
                <div className="material-files">
                  <h4>PDF disponibili ({material.pdfFiles.length}):</h4>
                  <ul className="pdf-list">
                    {material.pdfFiles.map((pdf, idx) => (
                      <li key={idx}>
                        <a
                          href={`/docs/pdf-lezioni/${topicInfo.folderName}/${pdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pdf-link"
                        >
                          📄 {pdf}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="no-files">
                  <p>Nessun PDF caricato. Aggiungi i file PDF nella cartella:</p>
                  <code>docs/pdf-lezioni/{topicInfo.folderName}/</code>
                </div>
              )}

              {onSelectTopic && (
                <button
                  onClick={() => onSelectTopic(material.topic)}
                  className="view-exams-button"
                >
                  Vedi Esami su questo argomento →
                </button>
              )}
            </div>
          );
        })}
      </div>

      {materials.length === 0 && (
        <div className="empty-state">
          <p>Nessun materiale di studio disponibile.</p>
          <p>Esegui <code>node scripts/parse-study-materials.js</code> per generare i materiali.</p>
        </div>
      )}
    </div>
  );
}
