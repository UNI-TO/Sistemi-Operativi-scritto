import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const examFolder = path.join(__dirname, '../docs/pdf-esami/foto-esami/SO Appello 14_01 33 punti');
const solutionsPath = path.join(examFolder, 'Soluzioni.txt');
const outputPath = path.join(__dirname, '../src/data/exam-so-appello-14-01.json');

// TODO: Parser per immagini PNG
// Questo script genera l'esame basandosi sulle soluzioni e sulle immagini

function parseSolutions(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const solutions = {};

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const match = trimmed.match(/^(\d+)\.\s*(.+)$/);
    if (match) {
      const questionNum = parseInt(match[1]);
      const answer = match[2].trim();
      solutions[questionNum] = answer;
      console.log(`  Parsed Q${questionNum}: ${answer}`);
    }
  });

  return solutions;
}

function createExamFromSolutions(solutions) {
  const exam = {
    id: 'so-appello-14-01-2025',
    date: '2025.01.14',
    course: 'A',
    title: 'SO Appello 14/01/2025 - Teoria (33 punti)',
    topics: ['generalita', 'processi-scheduling', 'sincronizzazione', 'memoria-primaria', 'memoria-massa', 'file-system'],
    questions: []
  };

  Object.entries(solutions).forEach(([numStr, answer]) => {
    const num = parseInt(numStr);

    // Domande 1-11: Vero/Falso singole
    if (num >= 1 && num <= 11) {
      const isTrue = answer === 'V';
      exam.questions.push({
        number: num,
        text: `Domanda ${num} (vedi immagine ${num}.png)`,
        answer: `La risposta corretta è: ${isTrue ? 'Vero' : 'Falso'}`,
        maxPoints: 2,
        negativePoints: 1,
        type: 'true-false',
        options: [
          { id: 'vero', text: 'Vero', isCorrect: isTrue },
          { id: 'falso', text: 'Falso', isCorrect: !isTrue }
        ],
        correctAnswer: isTrue ? 'vero' : 'falso',
        imageRef: `${num}.png`
      });
    }
    // Domande 12-17: Domande multiple con più risposte V/F
    else if (num >= 12 && num <= 17) {
      const multiAnswers = answer.split('-');

      if (num === 13) {
        // Domanda a risposta aperta
        exam.questions.push({
          number: num,
          text: `Domanda ${num} (vedi immagine ${num}.png)`,
          answer: `Risposte corrette: ${answer}`,
          maxPoints: 3,
          negativePoints: 0,
          type: 'multianswer',
          imageRef: `${num}.png`
        });
      } else {
        // Domande V/F multiple o con opzioni
        exam.questions.push({
          number: num,
          text: `Domanda ${num} (vedi immagine ${num}.png) - Seleziona le risposte corrette`,
          answer: `Risposte corrette: ${answer}`,
          maxPoints: 3,
          negativePoints: 1.5,
          type: 'multianswer',
          imageRef: `${num}.png`,
          correctAnswers: multiAnswers
        });
      }
    }
  });

  return exam;
}

try {
  console.log('Parsing SO Appello 14/01 exam...\n');

  // Parse solutions
  const solutions = parseSolutions(solutionsPath);
  console.log(`✓ Loaded ${Object.keys(solutions).length} solutions`);

  // Create exam
  const exam = createExamFromSolutions(solutions);
  console.log(`✓ Created exam: ${exam.title}`);
  console.log(`  Questions: ${exam.questions.length}`);
  console.log(`  - True/False: ${exam.questions.filter(q => q.type === 'true-false').length}`);
  console.log(`  - Multianswer: ${exam.questions.filter(q => q.type === 'multianswer').length}`);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to JSON
  fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));
  console.log(`\n✓ Saved to ${outputPath}`);

  console.log('\n📋 Note:');
  console.log('  - Le immagini delle domande sono in: docs/pdf-esami/foto-esami/SO Appello 14_01 33 punti/');
  console.log('  - Per visualizzare le immagini nell\'app, dovrai implementare un componente ImageQuestion');
  console.log('  - Le immagini devono essere copiate in public/exams/ per essere accessibili');

  console.log('\n✨ Next steps:');
  console.log('  1. Copia le immagini PNG in public/exams/so-appello-14-01/');
  console.log('  2. Implementa componente ImageQuestion.tsx');
  console.log('  3. Esegui: node scripts/merge-exams.js');

} catch (error) {
  console.error('Error parsing PNG exam:', error);
}
