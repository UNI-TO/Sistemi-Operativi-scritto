import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const txtFilePath = path.join(__dirname, '../docs/pdf-esami/foto-esami/Domande Esame.txt');
const outputPath = path.join(__dirname, '../src/data/exam-teoria-sample.json');

// TODO: Questo parser va integrato con il sistema principale quando avremo più esami TXT
function parseTxtExam(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  const exam = {
    id: 'teoria-sample-001',
    date: '2025.01.XX',
    course: 'A',
    title: 'Esame Teoria - Domande Multiple',
    topics: ['generalita', 'memoria-primaria', 'file-system', 'processi-scheduling', 'sincronizzazione'],
    questions: []
  };

  let questionNumber = 1;

  // Parse Vero/Falso
  const trueFalseSection = content.match(/Vero o Falso:([\s\S]*?)Scelta Multipla:/);
  if (trueFalseSection) {
    const sectionText = trueFalseSection[1].trim();
    const lines = sectionText.split('\n');

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const questionMatch = line.match(/^(\d+)\)(.*)/);

      if (questionMatch) {
        let questionText = questionMatch[2].trim();
        let correctAnswer = null;

        // Cerca la risposta nella riga successiva
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          if (nextLine === 'Vero' || nextLine === 'Falso') {
            correctAnswer = nextLine;
            i += 2; // Skip question and answer
          } else {
            i++;
          }
        } else {
          i++;
        }

        if (correctAnswer) {
          exam.questions.push({
            number: questionNumber++,
            text: questionText,
            answer: `La risposta corretta è: ${correctAnswer}`,
            maxPoints: 1,
            negativePoints: 0.5,
            type: 'true-false',
            options: [
              { id: 'vero', text: 'Vero', isCorrect: correctAnswer === 'Vero' },
              { id: 'falso', text: 'Falso', isCorrect: correctAnswer === 'Falso' }
            ],
            correctAnswer: correctAnswer === 'Vero' ? 'vero' : 'falso'
          });
        }
      } else {
        i++;
      }
    }
  }

  // Parse Scelta Multipla
  const multipleChoiceSection = content.match(/Scelta Multipla:([\s\S]*?)Associazione:/);
  if (multipleChoiceSection) {
    const questions = multipleChoiceSection[1].trim().split(/\n\n+/);

    questions.forEach((q) => {
      const lines = q.split('\n');
      if (lines.length >= 2) {
        const questionMatch = lines[0].match(/^\d+\)(.*)/);
        if (questionMatch) {
          const questionText = questionMatch[1].trim();
          const correctAnswer = lines[1].trim();

          // Per ora non abbiamo le opzioni, quindi le aggiungiamo come testo libero
          exam.questions.push({
            number: questionNumber++,
            text: questionText,
            answer: `Risposta corretta: ${correctAnswer}`,
            maxPoints: 2,
            negativePoints: 1,
            type: 'multianswer'
          });
        }
      }
    });
  }

  // Parse Associazione
  const matchingSection = content.match(/Associazione:([\s\S]*?)$/);
  if (matchingSection) {
    const exercises = matchingSection[1].trim().split(/\n\n(?=\d+\))/);

    exercises.forEach((ex) => {
      const lines = ex.split('\n');
      if (lines.length > 1) {
        const questionMatch = lines[0].match(/^\d+\)(.*)/);
        if (questionMatch) {
          const questionText = questionMatch[1].trim();
          const pairs = [];

          for (let i = 1; i < lines.length; i++) {
            const pairMatch = lines[i].match(/^([^:]+):\s*(.+)$/);
            if (pairMatch) {
              pairs.push({
                left: pairMatch[1].trim(),
                right: pairMatch[2].trim()
              });
            }
          }

          exam.questions.push({
            number: questionNumber++,
            text: questionText,
            answer: pairs.map(p => `${p.left}: ${p.right}`).join('\n'),
            maxPoints: 3,
            negativePoints: 1.5,
            type: 'matching',
            pairs: pairs
          });
        }
      }
    });
  }

  return exam;
}

try {
  console.log('Parsing TXT exam file...\n');

  const exam = parseTxtExam(txtFilePath);

  console.log(`✓ Parsed exam: ${exam.title}`);
  console.log(`  Questions: ${exam.questions.length}`);
  console.log(`  - True/False: ${exam.questions.filter(q => q.type === 'true-false').length}`);
  console.log(`  - Multiple Choice: ${exam.questions.filter(q => q.type === 'multiple-choice').length}`);
  console.log(`  - Short Answer: ${exam.questions.filter(q => q.type === 'multianswer').length}`);
  console.log(`  - Matching: ${exam.questions.filter(q => q.type === 'matching').length}`);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to JSON
  fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));
  console.log(`\n✓ Saved to ${outputPath}`);

  // Show sample questions
  console.log('\n--- Sample Questions ---');
  exam.questions.slice(0, 3).forEach(q => {
    console.log(`\nQ${q.number} [${q.type}]: ${q.text.substring(0, 80)}...`);
    console.log(`  Points: +${q.maxPoints} / -${q.negativePoints}`);
  });

} catch (error) {
  console.error('Error parsing TXT exam:', error);
}
