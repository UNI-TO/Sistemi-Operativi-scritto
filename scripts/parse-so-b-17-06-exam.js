import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../src/data/exam-so-b-17-06-2025.json');

// Manually extracted solutions from the PNG images
const exam = {
  id: 'so-b-17-06-2025',
  date: '2025.06.17',
  course: 'B',
  title: 'SO Corso B Appello 17/06/2025 - Teoria',
  topics: ['generalita', 'processi-scheduling', 'sincronizzazione', 'memoria-primaria', 'file-system'],
  questions: [
    {
      number: 1,
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
      imageRef: 'domanda 1-2.png'
    },
    {
      number: 2,
      text: 'Il round robin è particolarmente adatto ai sistemi che attribuiscono priorità diverse ai processi',
      answer: 'La risposta corretta è: Falso',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: false },
        { id: 'falso', text: 'Falso', isCorrect: true }
      ],
      correctAnswer: 'falso',
      imageRef: 'domanda 1-2.png'
    },
    {
      number: 3,
      text: 'La separazione dello spazio degli indirizzi logico dallo spazio degli indirizzi fisico permette di implementare la rilocabilità del codice',
      answer: 'La risposta corretta è: Vero',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: true },
        { id: 'falso', text: 'Falso', isCorrect: false }
      ],
      correctAnswer: 'vero',
      imageRef: 'domanda 3-4.png'
    },
    {
      number: 4,
      text: 'La copiatura su scrittura è una strategia finalizzata a ridurre la quantità di frame di RAM allocata ai processi figli',
      answer: 'La risposta corretta è: Vero',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: true },
        { id: 'falso', text: 'Falso', isCorrect: false }
      ],
      correctAnswer: 'vero',
      imageRef: 'domanda 3-4.png'
    },
    {
      number: 5,
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
      imageRef: 'domanda 5-6.png'
    },
    {
      number: 6,
      text: 'Una delle strategie di Havender consiste nell\'inibire la mutua esclusione nell\'accesso alle risorse',
      answer: 'La risposta corretta è: Falso',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: false },
        { id: 'falso', text: 'Falso', isCorrect: true }
      ],
      correctAnswer: 'falso',
      imageRef: 'domanda 5-6.png'
    },
    {
      number: 7,
      text: 'I meccanismi adottati dai sistemi operativi per allocare memoria ai processi kernel è identico a quello adottato per i processi utente',
      answer: 'La risposta corretta è: Falso',
      maxPoints: 1,
      negativePoints: 0,
      type: 'true-false',
      options: [
        { id: 'vero', text: 'Vero', isCorrect: false },
        { id: 'falso', text: 'Falso', isCorrect: true }
      ],
      correctAnswer: 'falso',
      imageRef: 'domanda 7-8.png'
    },
    {
      number: 8,
      text: 'Indica se le seguenti affermazioni inerenti la memoria virtuale sono vere o false (vedi immagine)',
      answer: 'Risposte corrette: V-F-V-F-V (1. La paginazione è alla base della memoria virtuale, 2. La memoria virtuale è impedita dalla rilocabilità, 3. La memoria virtuale richiede la presenza di un algoritmo di sostituzione delle pagine, 4. la memoria virtuale richiede una gestione esplicita da parte dei programmatori dei sistemi che ne faranno uso, 5. il numero di frame assegnati a ciascun processo dipende anche dall\'architettura)',
      maxPoints: 2,
      negativePoints: 0,
      type: 'multianswer',
      imageRef: 'domanda 7-8.png',
      correctAnswers: ['V', 'F', 'V', 'F', 'V']
    },
    {
      number: 9,
      text: 'Si associ a ciascuna affermazione (vedi immagine)',
      answer: 'Risposte corrette: V-F-V-V-V (1. i file system strutturati ad albero non fanno uso di link, 2. in un file system gerarchico ogni nodo ha un solo PATH relativo, 3. la cancellazione di un link simbolico ha un effetto diverso dalla cancellazione di un link fisico, 4. in un file system gerarchico ogni nodo ha un solo PATH assoluto, 5. i file system a grafo aciclico fanno uso di link)',
      maxPoints: 2,
      negativePoints: 0,
      type: 'multianswer',
      imageRef: 'domanda 9.png',
      correctAnswers: ['V', 'F', 'V', 'V', 'V']
    },
    {
      number: 10,
      text: 'Supponiamo che in un sistema in cui la pagina vittima è scelta con algoritmo di seconda chance, la lista delle pagine caricate (e relativi bit di riferimento) sia la seguente: p1 (1) → p2 (1) → p3 (0) → p4 (0) → p5 (1). Supponendo di partire da p1, quali sono la configurazione della lista e la vittima identificata, dopo la passata dell\'algoritmo?',
      answer: 'Risposta corretta: p1 (0) → p2 (0) → p3 (VITTIMA) → p4 (0) → p5 (1)',
      maxPoints: 2,
      negativePoints: 0,
      type: 'multianswer',
      imageRef: 'domanda 10.png'
    },
    {
      number: 11,
      text: '(1) riportare la definizione di deadlock, includendo l\'elenco e le definizioni delle condizioni necessarie al suo verificarsi, (2) descrivere e spiegare l\'uso dei grafi di assegnazione delle risorse',
      answer: 'Risposta completa richiesta (max 5.00 punti)',
      maxPoints: 5,
      negativePoints: 0,
      type: 'essay',
      imageRef: 'domanda 11.png'
    },
    {
      number: 12,
      text: '(1) spiegare il dual mode e cosa si intende per system call, (2) dire cos\'è e come viene usato il vettore delle interruzioni',
      answer: 'Risposta completa richiesta (max 5.00 punti)',
      maxPoints: 5,
      negativePoints: 0,
      type: 'essay',
      imageRef: 'domanda 12.png'
    }
  ]
};

try {
  console.log('Creating SO B 17/06/2025 exam...\\n');

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
  console.log('  - Le immagini delle domande sono in: docs/pdf-esami/foto-esami/esame SO B 17-06-2025/');
  console.log('  - Copiare le immagini in public/exams/so-b-17-06-2025/ per l\'app');

  console.log('\\n✨ Next steps:');
  console.log('  1. cp docs/pdf-esami/foto-esami/esame\\ SO\\ B\\ 17-06-2025/*.png public/exams/so-b-17-06-2025/');
  console.log('  2. node scripts/merge-exams.js');
  console.log('  3. npm run build');

} catch (error) {
  console.error('Error creating SO B exam:', error);
}
