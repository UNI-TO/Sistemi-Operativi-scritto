import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const examsPath = path.join(__dirname, '../src/data/exams.json');

// Mappa di keywords per identificare gli argomenti dalle domande
const TOPIC_KEYWORDS = {
  'processi-scheduling': [
    'processo', 'processi', 'process', 'thread', 'scheduling',
    'cpu', 'context switch', 'fork', 'exec', 'wait', 'pid'
  ],
  'sincronizzazione': [
    'semaforo', 'semaphore', 'mutex', 'lock', 'critical section',
    'sezione critica', 'sincronizzazione', 'synchronization',
    'deadlock', 'race condition', 'monitor', 'condition variable'
  ],
  'memoria-primaria': [
    'memoria', 'memory', 'paginazione', 'paging', 'segmentazione',
    'segmentation', 'page table', 'tlb', 'virtual memory',
    'memoria virtuale', 'address space', 'spazio di indirizzamento'
  ],
  'memoria-massa': [
    'disco', 'disk', 'raid', 'ssd', 'track', 'sector', 'cylinder',
    'scheduling del disco', 'disk scheduling', 'fcfs', 'sstf', 'scan'
  ],
  'file-system': [
    'file', 'directory', 'inode', 'fat', 'ntfs', 'ext',
    'allocazione', 'allocation', 'block', 'blocco', 'path',
    'pathname', 'link', 'symbolic link'
  ]
};

function detectTopics(exam) {
  const topics = new Set();

  // Analizza tutte le domande
  for (const question of exam.questions) {
    const text = (question.text + ' ' + question.answer).toLowerCase();

    // Controlla ogni argomento
    for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          topics.add(topic);
          break; // Found keyword for this topic, move to next topic
        }
      }
    }
  }

  // Se non sono stati trovati argomenti specifici, è un esame generico di C
  // (manipolazione stringhe, liste, puntatori)
  if (topics.size === 0) {
    // Non aggiungiamo alcun topic - indica un esame di programmazione C generale
    return [];
  }

  return Array.from(topics);
}

function addTopicsToExams() {
  console.log('Reading exams from:', examsPath);
  const exams = JSON.parse(fs.readFileSync(examsPath, 'utf-8'));

  console.log(`\nAnalyzing ${exams.length} exams for topics...\n`);

  let totalWithTopics = 0;
  let totalGeneric = 0;

  for (const exam of exams) {
    const topics = detectTopics(exam);
    exam.topics = topics;

    console.log(`${exam.date} (Corso ${exam.course}):`);
    if (topics.length > 0) {
      console.log(`  Topics: ${topics.join(', ')}`);
      totalWithTopics++;
    } else {
      console.log(`  Topics: [Programmazione C generale - stringhe, liste, puntatori]`);
      totalGeneric++;
    }
  }

  // Write back to file
  fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2));

  console.log(`\n✓ Updated ${exams.length} exams`);
  console.log(`  - ${totalWithTopics} with specific OS topics`);
  console.log(`  - ${totalGeneric} generic C programming exams`);
  console.log(`✓ Saved to ${examsPath}`);
}

addTopicsToExams();
