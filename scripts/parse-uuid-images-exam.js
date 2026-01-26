import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../src/data/exam-uuid-misto.json');

// Domande estratte dalle immagini UUID
// TODO: Completare con le rimanenti ~40 domande analizzando le altre immagini
const questionsData = [
  {
    number: 1,
    imageFile: "01adf582-af9e-445f-a475-257aeddc19df.jpg",
    text: "Nello Unix, quale/quali dei seguenti comandi modifica il valore del link counter dell'index-node associato al file cartella X? (si assuma di avere i permessi per eseguire tutti i comandi e di essere posizionati dentro a X)",
    type: "multiple-choice",
    options: [
      { id: "a", text: "il comando 1) ln X Y", isCorrect: false },
      { id: "b", text: "i comandi 2) ln -s X W e 4) ls -l . Y", isCorrect: false },
      { id: "c", text: "il comando 3) mkdir Z", isCorrect: true },
      { id: "d", text: "i comandi 1) e 3)", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 1,
    negativePoints: 0,
    explanation: "La risposta corretta è: il comando 3) mkdir Z"
  },
  {
    number: 2,
    imageFile: "021d8651-e6da-42e0-8443-50af80bc1ba2.jpg",
    text: "Si consideri un sistema con TLB, in cui ciascun accesso alla RAM richiede 200 unità di tempo, l'hit ratio è 90% e ciascun accesso al TLB richiede 10 unità di tempo. Dire se i seguenti valori sono veri o falsi",
    type: "multianswer",
    statements: [
      { text: "in caso di TLB miss l'accesso al dato richiede 210 unità di tempo", isCorrect: false },
      { text: "in caso di TLB hit l'accesso al dato richiede 210 unità di tempo", isCorrect: true },
      { text: "il TLB miss è pari al 5%", isCorrect: false },
      { text: "in caso di TLB miss l'accesso al dato richiede 410 unità di tempo", isCorrect: false },
      { text: "in caso di TLB hit l'accesso al dato richiede 420 unità di tempo", isCorrect: true }
    ],
    maxPoints: 2,
    negativePoints: 0,
    explanation: "Parzialmente corretta. Punteggio ottenuto 1.60/2.00"
  },
  {
    number: 3,
    imageFile: "10ef6b5b-b45f-45ef-85cf-262b6c798d46.jpg",
    text: "Confrontando le librerie statiche e quelle dinamiche possiamo dire che:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "le librerie dinamiche sono sicuramente preferibili a quelle statiche, ad esempio perché al contrario di quelle statiche possono essere usate con la memoria virtuale, e in caso di aggiornamento non costringono alla ricompilazione dei processi che le usano", isCorrect: false },
      { id: "b", text: "le librerie dinamiche sono sicuramente preferibili a quelle statiche, ad esempio perché vengono caricate in RAM solo se effettivamente usate dai processi, e perché quelle statiche possono essere usate solo col codice dinamicamente rilocabile", isCorrect: false },
      { id: "c", text: "le librerie dinamiche sono sicuramente preferibili a quelle statiche, ad esempio perché vengono caricate in RAM solo se effettivamente usate dai processi, e in caso di aggiornamento non costringono alla ricompilazione dei processi che le usano", isCorrect: true },
      { id: "d", text: "le librerie dinamiche sono sicuramente preferibili a quelle statiche, ad esempio perché vengono caricate in RAM solo se effettivamente usate dai processi, e al contrario di quelle statiche possono essere usate col codice dinamicamente rilocabile", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 1,
    negativePoints: 0,
    explanation: "Risposta non ancora data"
  },
  {
    number: 4,
    imageFile: "11662c51-07bd-45f3-a64c-703a89e78f14.jpg",
    text: "In un sistema operativo che adotta uno scheduling senza diritto di prelazione, quattro processi arrivano al tempo indicato e consumano la quantità di CPU indicata nella tabella sottostante. Quali sono il waiting time e il turnaround time medi ottenuti per lo scheduling dei quattro processi della tabella se si usa l'algoritmo di scheduling non preemptive che fornisce le migliori previsioni possibili? Qual è il corrispondente diagramma di GANTT?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Diagramma di GANTT: (0) ... Pa ... (4) ... Pc ... (6) ... Pd ... (7) ... Pb ... (10). Waiting time medio = 7/4. Turnaround time medio = 17/4", isCorrect: false },
      { id: "b", text: "Diagramma di GANTT: (0) ... Pa ... (4) ... Pb ... (7) ... Pc ... (9) ... Pd ... (10). Waiting time medio = 7/4. Turnaround time medio = 17/4", isCorrect: false },
      { id: "c", text: "Diagramma di GANTT: (0) ... Pa ... (4) ... Pc ... (6) ... Pd ... (7) ... Pb ... (10). Waiting time medio = 2/4. Turnaround time medio = 18/4", isCorrect: false },
      { id: "d", text: "Diagramma di GANTT: (0) ... Pa ... (4) ... Pd ... (5) ... Pc ... (7) ... Pb ... (10). Waiting time medio = 7/4. Turnaround time medio = 18/4", isCorrect: false }
    ],
    correctAnswer: "a",
    maxPoints: 2,
    negativePoints: 0,
    explanation: "Risposta non ancora data"
  },
  {
    number: 5,
    imageFile: "13732e96-d264-4a78-b451-fa3da2c0a70a.jpg",
    text: "Di un sistema paginato si sa che lo spazio di indirizzamento logico è grande 1 Gigabyte, e un frame è grande 0x800 byte. Si sa inoltre che la PT più grande del sistema occupa 1 Megabyte. Quanto può essere grande al massimo, lo spazio di indirizzamento fisico del sistema?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "La PT più grande del sistema contiene 2^19 entry, e viene usato 1 byte per scrivere il numero di un frame. Dunque lo spazio fisico può essere grande al massimo 128 Megabyte", isCorrect: false },
      { id: "b", text: "La PT più grande del sistema contiene 2^26 entry, e vengono usati 4 byte per scrivere il numero di un frame. Dunque lo spazio fisico può essere grande al massimo 256 Megabyte", isCorrect: true },
      { id: "c", text: "La PT più grande del sistema contiene 2^19 entry, e vengono usati 2 byte per scrivere il numero di un frame. Dunque lo spazio fisico può essere grande al massimo 128 Megabyte", isCorrect: false },
      { id: "d", text: "La PT più grande del sistema contiene 2^18 entry, e vengono usati 2 byte per scrivere il numero di un frame. Dunque lo spazio fisico può essere grande al massimo 256 Megabyte", isCorrect: false }
    ],
    correctAnswer: "b",
    maxPoints: 1,
    negativePoints: 0,
    explanation: "Risposta errata selezionata"
  },
  {
    number: 6,
    imageFile: "1902c104-7d38-4ed6-a2b7-ad2c556852f5.jpg",
    text: "Un sistema ha un tempo di accesso in RAM di 80 ns, adotta un TLB con un tempo di accesso di 20 ns e un hit rate del 95%, e usa un algoritmo di rimpiazzamento delle pagine. Quando si verifica un hit la pagina indirizzata è sicuramente in RAM. Quando si verifica un miss, nel 20% dei casi la pagina indirizzata non è in RAM e il page fault ha un costo totale di gestione di 1 microsecondo, indipendentemente dal valore del dirty bit. Qual è l'effective access time (eat) del sistema? (per semplicità in caso di miss si ignori il costo di interrogazione del TLB, e in caso di page fault si consideri solo il tempo di gestione del page fault)",
    type: "multiple-choice",
    options: [
      { id: "a", text: "eat = 116,4 ns", isCorrect: false },
      { id: "b", text: "eat = 111,4 ns", isCorrect: false },
      { id: "c", text: "eat = 121,4 ns", isCorrect: false },
      { id: "d", text: "eat = 126,4 ns", isCorrect: false }
    ],
    correctAnswer: "d",
    maxPoints: 1,
    negativePoints: 0,
    explanation: "Risposta non ancora data"
  },
  {
    number: 7,
    imageFile: "1cab96b6-41ae-460a-81be-fbae43957f1e.jpg",
    text: "Completare il seguente codice in cui viene cercato l'elemento minimo di un array. Completare il codice avendo l'accortezza di non inserire spazi bianchi non necessari.",
    type: "essay",
    answer: "Codice C per trovare il minimo di un array. Le risposte corrette sono: *min = v[0] per l'inizializzazione e &min per il parametro della funzione find_min.",
    maxPoints: 1,
    negativePoints: 0,
    explanation: "Tempo stimato: 4 min (esercizio corretto), 3 min (prossimi esercizi)"
  },
  {
    number: 8,
    imageFile: "26fc8f2f-59e7-4b1f-96f3-abcb63bf61d7.jpg",
    text: "Supponiamo che in un sistema in cui la pagina vittima è scelta con algoritmo di seconda chance migliorato, la lista delle pagine caricate (e relativi bit di riferimento) sia la seguente: p1 (1) → p2 (1) → p3 (0) → p4 (0) → p5 (1). Supponendo di partire da p1, quali sono la configurazione della lista e la vittima identificata, dopo la passata dell'algoritmo?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "p1 (VITTIMA) → p2 (0) → p3 (0) → p4 (0) → p5 (0)", isCorrect: false },
      { id: "b", text: "p1 (0) → p2 (0) → p3 (0) → p4 (0) → p5 (VITTIMA)", isCorrect: false },
      { id: "c", text: "p1 (0) → p2 (0) → p3 (VITTIMA) → p4 (0) → p5 (1)", isCorrect: false },
      { id: "d", text: "p1 (1) → p2 (1) → p3 (VITTIMA) → p4 (0) → p5 (1)", isCorrect: false },
      { id: "e", text: "p1 (VITTIMA) → p2 (1) → p3 (0) → p4 (0) → p5 (1)", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 1,
    negativePoints: 0,
    explanation: "Algoritmo seconda chance - pagina replacement"
  },
  {
    number: 9,
    imageFile: "3395c851-c25e-43cf-a9ea-ee6c624da2f6.jpg",
    text: "In un sistema operativo un indirizzo fisico è scritto su 28 bit, l'offset più grande in una pagina è 3FFF, lo spazio logico è il doppio di quello fisico, e nel sistema possono essere presenti al massimo 1024 processi. Se il sistema adottasse una Inverted Page Table, quanto sarebbe grande questa tabella? (selezionare l'opzione di risposta che riporta il ragionamento aritmetico e il risultato corretti)",
    type: "multiple-choice",
    options: [
      { id: "a", text: "Ogni entry della IPT è grande 25 bit, arrotondati a 4 byte, e dunque la IPT sarà grande 4 * 2^14 = 64 Kbyte (circa)", isCorrect: true },
      { id: "b", text: "Ogni entry della IPT è grande 24 bit, ossia 3 byte, e dunque la IPT sarà grande 3 * 2^15 = 96 Kbyte (circa)", isCorrect: false },
      { id: "c", text: "Ogni entry della IPT è grande 25 bit, arrotondati a 4 byte, e dunque la IPT sarà grande 4 * 2^15 = 128 Kbyte (circa)", isCorrect: false },
      { id: "d", text: "Ogni entry della IPT è grande 24 bit, ossia 3 byte, e dunque la IPT sarà grande 3 * 2^14 = 48 Kbyte (circa)", isCorrect: false }
    ],
    correctAnswer: "a",
    maxPoints: 2,
    negativePoints: 0,
    explanation: "Risposta corretta. Inverted Page Table calculation"
  },
  {
    number: 10,
    imageFile: "368d187d-dae2-4cdc-8e6b-ec037d3f4332.jpg",
    text: "In quale caso l'accesso in lettura ad un file memorizzato su un sistema RAID è più veloce che se il file fosse memorizzato su un normale hard disk?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "sempre, dato che i sistemi RAID sono stati pensati proprio per fornire maggiore velocità di accesso ai file (oltre che maggiore affidabilità)", isCorrect: false },
      { id: "b", text: "quando il file è memorizzato su due o più blocchi appartenenti a strip contenuti su dischi diversi del RAID", isCorrect: false },
      { id: "c", text: "quando il file è memorizzato su uno più blocchi appartenenti a strip contenuti sullo stesso disco del RAID", isCorrect: true },
      { id: "d", text: "quando il RAID usato è di tipo 01/10, poiché in questo caso si possono sfruttare i dischi di mirroring", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 1,
    negativePoints: 0,
    explanation: "Risposta salvata"
  }
];

// Crea struttura esame
const exam = {
  id: 'esame-uuid-misto-domande-varie',
  date: '2024.00.00',
  course: 'Mixed',
  title: 'Domande Varie - Mix Argomenti (10 domande + template per 40)',
  topics: [
    'generalita',
    'processi-scheduling',
    'sincronizzazione',
    'memoria-primaria',
    'memoria-massa',
    'file-system'
  ],
  questions: questionsData.map((q) => ({
    number: q.number,
    text: q.text,
    answer: q.explanation || q.options?.find(o => o.isCorrect)?.text || 'Vedi soluzione',
    maxPoints: q.maxPoints,
    negativePoints: q.negativePoints,
    type: q.type,
    ...(q.type === 'multiple-choice' && {
      options: q.options,
      correctAnswer: q.correctAnswer
    }),
    ...(q.type === 'multianswer' && {
      statements: q.statements
    }),
    imageRef: q.imageFile
  }))
};

// Salva file
try {
  fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));
  console.log('\n✅ SUCCESS!');
  console.log('=' .repeat(60));
  console.log(`📝 Created: ${path.basename(outputPath)}`);
  console.log(`📊 Questions: ${exam.questions.length} domande estratte`);
  console.log(`📌 Topics: ${exam.topics.join(', ')}`);
  console.log(`💯 Total points: ${exam.questions.reduce((sum, q) => sum + q.maxPoints, 0)}`);
  console.log('\n📋 Question types:');
  const types = {};
  exam.questions.forEach(q => {
    types[q.type] = (types[q.type] || 0) + 1;
  });
  Object.entries(types).forEach(([type, count]) => {
    console.log(`   - ${type}: ${count}`);
  });
  console.log('\n' + '='.repeat(60));
  console.log('⚠️  NOTE: Questo parser contiene solo 10 domande di esempio.');
  console.log('   Per completare l\'esame, analizzare le rimanenti ~40 immagini UUID');
  console.log('   e aggiungere i dati all\'array questionsData.');
  console.log('\n📁 Immagini da copiare:');
  console.log('   mkdir -p public/exams/uuid-misto');
  console.log('   cp docs/pdf-esami/foto-esami/*.jpg public/exams/uuid-misto/');
  console.log('\n🚀 Next step: node scripts/merge-exams.js');
} catch (error) {
  console.error('❌ Error writing file:', error.message);
  process.exit(1);
}
