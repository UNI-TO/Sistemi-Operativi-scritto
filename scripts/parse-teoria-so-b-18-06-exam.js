import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../src/data/exam-teoria-so-b-18-06-2025.json');

// Manually extracted solutions from the PNG images
const exam = {
  id: 'teoria-so-b-18-06-2025',
  date: '2025.06.18',
  course: 'B',
  title: 'Teoria SO Corso B 18/06/2025',
  topics: ['generalita', 'processi-scheduling', 'sincronizzazione', 'memoria-primaria', 'file-system'],
  questions: [
    {
      number: 1,
      text: 'Quando si usa lo scheduling della CPU "shortest remaining time first", è possibile che un processo passato dallo stato WAITING allo stato READY ottenga subito la CPU tramite prelazione',
      answer: 'La risposta corretta è: Vero',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: true },
        { id: 'falso', text: 'Falso', isCorrect: false }
      ],
      correctAnswer: 'vero',
      imageRef: 'Immagine 2025-06-18 113947.png'
    },
    {
      number: 2,
      text: 'in generale i semafori non soffrono di starvation',
      answer: 'La risposta corretta è: Falso',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: false },
        { id: 'falso', text: 'Falso', isCorrect: true }
      ],
      correctAnswer: 'falso',
      imageRef: 'Immagine 2025-06-18 113947.png'
    },
    {
      number: 3,
      text: 'L\'allocazione contigua della RAM ai processi è soggetta a frammentazione esterna',
      answer: 'La risposta corretta è: Vero',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: true },
        { id: 'falso', text: 'Falso', isCorrect: false }
      ],
      correctAnswer: 'vero',
      imageRef: 'Immagine 2025-06-18 114035.png'
    },
    {
      number: 4,
      text: 'Attesa circolare è una condizione sufficiente al deadlock',
      answer: 'La risposta corretta è: Falso',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: false },
        { id: 'falso', text: 'Falso', isCorrect: true }
      ],
      correctAnswer: 'falso',
      imageRef: 'Immagine 2025-06-18 114035.png'
    },
    {
      number: 5,
      text: 'Possesso e attesa è una condizione necessaria al deadlock',
      answer: 'La risposta corretta è: Vero',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: true },
        { id: 'falso', text: 'Falso', isCorrect: false }
      ],
      correctAnswer: 'vero',
      imageRef: 'Immagine 2025-06-18 114052.png'
    },
    {
      number: 6,
      text: 'I sistemi RAID rendono l\'elaboratore più robusto rispetto a guasti inerenti la memoria',
      answer: 'La risposta corretta è: Vero',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: true },
        { id: 'falso', text: 'Falso', isCorrect: false }
      ],
      correctAnswer: 'vero',
      imageRef: 'Immagine 2025-06-18 114052.png'
    },
    {
      number: 7,
      text: 'Per CPU burst si intende un periodo di utilizzo ininterrotto della CPU da parte di un processo',
      answer: 'La risposta corretta è: Vero',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: true },
        { id: 'falso', text: 'Falso', isCorrect: false }
      ],
      correctAnswer: 'vero',
      imageRef: 'Immagine 2025-06-18 114108.png'
    },
    {
      number: 8,
      text: 'Indica se le seguenti affermazioni inerenti la memoria virtuale sono vere o false (vedi immagine)',
      answer: 'Risposte corrette: V-V-V-F-F (1. La memoria virtuale richiede la presenza di un algoritmo di sostituzione delle pagine, 2. La paginazione è alla base della memoria virtuale, 3. il numero di frame assegnati a ciascun processo dipende anche dall\'architettura, 4. la memoria virtuale è impedita dalla rilocabilità, 5. la memoria virtuale richiede una gestione esplicita da parte dei programmatori dei sistemi che ne faranno uso)',
      maxPoints: 2,
      negativePoints: 0,
      type: 'multianswer',
      imageRef: 'Immagine 2025-06-18 114108.png',
      correctAnswers: ['V', 'V', 'V', 'F', 'F']
    },
    {
      number: 9,
      text: 'Si associ a ciascuna affermazione (vedi immagine)',
      answer: 'Risposte corrette: F-V-F-V-V (1. i file system strutturati ad albero non fanno uso di link, 2. la cancellazione di un link simbolico ha un effetto diverso dalla cancellazione di un link fisico, 3. in un file system gerarchico ogni nodo ha un solo PATH relativo, 4. in un file system gerarchico ogni nodo ha un solo PATH assoluto, 5. i file system a grafo aciclico fanno uso di link)',
      maxPoints: 2,
      negativePoints: 0,
      type: 'multianswer',
      imageRef: 'Immagine 2025-06-18 114123.png',
      correctAnswers: ['F', 'V', 'F', 'V', 'V']
    },
    {
      number: 10,
      text: 'Supponiamo che in un sistema in cui la pagina vittima è scelta con algoritmo di seconda chance, la lista delle pagine caricate (e relativi bit di riferimento) sia la seguente: p1 (1) → p2 (1) → p3 (0) → p4 (0) → p5 (1). Supponendo di partire da p1, quali sono la configurazione della lista e la vittima identificata, dopo la passata dell\'algoritmo?',
      answer: 'Risposta corretta: p1 (0) → p2 (0) → p3 (VITTIMA) → p4 (0) → p5 (1)',
      maxPoints: 2,
      negativePoints: 0,
      type: 'multianswer',
      imageRef: 'Immagine 2025-06-18 114136.png'
    },
    {
      number: 11,
      text: '(1) riportare la definizione di deadlock, includendo l\'elenco e le definizioni delle condizioni necessarie al suo verificarsi, (2) descrivere e spiegare l\'uso dei grafi di assegnazione delle risorse',
      answer: 'Risposta completa richiesta (max 5.00 punti)',
      maxPoints: 5,
      negativePoints: 0,
      type: 'essay',
      imageRef: 'Immagine 2025-06-18 114157.png'
    },
    {
      number: 12,
      text: '(1) spiegare il dual mode e cosa si intende per system call, (2) dire cos\'è e come viene usato il vettore delle interruzioni',
      answer: 'Risposta completa richiesta (max 5.00 punti)',
      maxPoints: 5,
      negativePoints: 0,
      type: 'essay',
      imageRef: 'Immagine 2025-06-18 114213.png'
    }
  ]
};

try {
  console.log('Creating Teoria SO B 18/06/2025 exam...\\n');

  console.log(`✓ Created exam: ${exam.title}`);
  console.log(`  Questions: ${exam.questions.length}`);
  console.log(`  - True/False: ${exam.questions.filter(q => q.type === 'true-false').length}`);
  console.log(`  - Multianswer: ${exam.questions.filter(q => q.type === 'multianswer').length}`);
  console.log(`  - Essay: ${exam.questions.filter(q => q.type === 'essay').length}`);

  // Calculate total points
  const totalPoints = exam.questions.reduce((sum, q) => sum + q.maxPoints, 0);
  console.log(`  Total points: ${totalPoints}`);

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to JSON
  fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));
  console.log(`\\n✓ Saved to ${outputPath}`);

  console.log('\\n📋 Note:');
  console.log('  - Le immagini delle domande sono in: docs/pdf-esami/foto-esami/Teoria SO corso B 18.06.2025/');
  console.log('  - Copiare le immagini in public/exams/teoria-so-b-18-06-2025/ per l\'app');

  console.log('\\n✨ Next steps:');
  console.log('  1. cp "docs/pdf-esami/foto-esami/Teoria SO corso B 18.06.2025"/*.png public/exams/teoria-so-b-18-06-2025/');
  console.log('  2. node scripts/merge-exams.js');
  console.log('  3. npm run build');

} catch (error) {
  console.error('Error creating Teoria SO B exam:', error);
}
