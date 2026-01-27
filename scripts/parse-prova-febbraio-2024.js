import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prova Febbraio 2024 - 15 domande estratte da 16 screenshot
const questionsData = [
  {
    number: 1,
    text: "Tutti i sistemi operativi moderni adottano una qualche forma di paginazione della memoria primaria, in quanto:\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "permette di eliminare la frammentazione esterna della RAM e di limitare moltissimo la frammentazione interna, permette di implementare una forma automatica di protezione dello spazio di indirizzamento dei processi, è la base a partire dalla quale si può implementare la memoria virtuale", isCorrect: true },
      { id: "b", text: "permette di eliminare la frammentazione interna della RAM ma non quella esterna, permette di implementare una forma automatica di protezione dello spazio di indirizzamento dei processi, è la base a partire dalla quale si può implementare la memoria virtuale", isCorrect: false },
      { id: "c", text: "permette di eliminare la frammentazione interna della RAM e di limitare moltissimo la frammentazione esterna, permette di implementare una forma automatica di protezione dello spazio di indirizzamento dei processi, è la base a partire dalla quale si può implementare la memoria virtuale", isCorrect: false },
      { id: "d", text: "permette di eliminare la frammentazione esterna e la frammentazione interna della RAM, permette di usare codice dinamicamente rilocabile per i processi, è la base a partire dalla quale si può implementare la memoria virtuale", isCorrect: false }
    ],
    correctAnswer: "a",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["memoria-primaria"]
  },
  {
    number: 2,
    text: "In hard disk grande 512 Gigabyte, per scrivere il numero di un blocco vengono usati 25 bit, arrotondati al minimo numero di byte necessario. L'hard disk adotta una allocazione indicizzata semplice, e di un file A si sa che nel suo blocco indice 12 byte vengono usati per tenere traccia dei blocchi di dati di A. Quanto può essere grande al massimo A?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "24 Kilobyte", isCorrect: false },
      { id: "b", text: "40 Kilobyte", isCorrect: false },
      { id: "c", text: "48 Kilobyte", isCorrect: true },
      { id: "d", text: "32 Kilobyte", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["memoria-massa", "file-system"]
  },
  {
    number: 3,
    text: "In un sistema operativo che adotta uno scheduling senza diritto di prelazione, quattro processi arrivano al tempo indicato e consumano la quantità di CPU indicata nella tabella sottostante:\n\nProcesso | T. di arrivo | Burst\nPa       | 0            | 5\nPb       | 2            | 3\nPc       | 4            | 2\nPd       | 6            | 1\n\nSe si usa l'algoritmo di scheduling non preemptive che fornisce le migliori prestazioni possibili:\n- il waiting time medio è: [risposta]\n- il turnaround medio è: [risposta]\n- il diagramma di GANTT è: [selezione]\n- l'algoritmo usato può soffrire di starvation? [sì/no]",
    type: "essay",
    answer: "Waiting time medio = 2 (o 8/4), Turnaround medio = 19/4 (o 18/4), Diagramma GANTT: (0) ... Pa ... (5) ... Pc ... (7) ... Pd ... (8) ... Pb ... (11), Starvation: sì",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["processi-scheduling"]
  },
  {
    number: 4,
    text: "Il concetto di 'diritto di prelazione' può essere applicato sia ad un algoritmo di scheduling che ad un kernel nel suo complesso. Qual è la differenza?\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "non c'è nessuna differenza: un algoritmo di scheduling preemptive implica che il sistema operativo su cui è implementato possieda un kernel con diritto di prelazione.", isCorrect: false },
      { id: "b", text: "In un kernel con diritto di prelazione vengono disabilitati gli interrupt quando un processo è in kernel mode, in un algoritmo di scheduling con diritto di prelazione i processi utente possono essere interrotti da altri processi utente", isCorrect: false },
      { id: "c", text: "negli algoritmi di scheduling preemptive un processo utente può essere obbligato dal SO ad abbandonare la CPU. Nei kernel preemptive un processo in kernel mode può essere obbligato ad abbandonare la CPU.", isCorrect: true },
      { id: "d", text: "In un kernel con diritto di prelazione vengono disabilitati gli interrupt quando un processo è in kernel mode, in un algoritmo di scheduling con diritto di prelazione vengono abilitati gli interrupt per permettere il funzionamento del timer hardware", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["processi-scheduling"]
  },
  {
    number: 5,
    text: "del codice statico e del codice staticamente rilocabile possiamo dire che:\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "nei sistemi operativi moderni non vengono usati perché non permetterebbero una implementazione efficiente della paginazione della memoria", isCorrect: true },
      { id: "b", text: "nei sistemi operativi moderni non vengono usati perché producono codice molto meno efficiente di quello dinamicamente rilocabile", isCorrect: false },
      { id: "c", text: "nei sistemi operativi moderni non vengono usati perché renderebbero impossibile l'implementazione della memoria virtuale", isCorrect: false },
      { id: "d", text: "nei sistemi operativi moderni non vengono usati perché per girare in modo efficiente richiederebbero dell'hardware specifico che ne limiterebbe la portabilità", isCorrect: false }
    ],
    correctAnswer: "a",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["memoria-primaria"]
  },
  {
    number: 6,
    text: "Dopo l'esecuzione dei seguenti comandi in un ambiente Unix (come visti a lezione):\n\n1: cd /tmp\n2: mkdir newfolder\n3: echo 'ciao' > pippo // crea un nuovo file di nome pippo contenente la stringa ciao\n4: cd newfolder\n5: ln ../pippo paperino\n6: ln -s /tmp/newfolder folder2\n7: cp paperino topolino\n8: echo 'salve' >> topolino // aggiunge 'salve' a fondo file\n9: rm pippo\n10: cat paperino // cat stampa il contenuto del file passato come argomento\n11: mkdir folder3\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "1. il link-counter dell'i-node di paperino è: 2, 2. il link counter di newfolder è: 2, 3. l'output del comando 10 è: 'ciao', 4. il link counter di tmp è: aumentato di 1", isCorrect: false },
      { id: "b", text: "1. il link-counter dell'i-node di paperino è: 1, 2. il link counter di newfolder è: 3, 3. l'output del comando 10 è: 'ciao', 4. il link counter di tmp è: aumentato di 2", isCorrect: false },
      { id: "c", text: "1. il link-counter dell'i-node di paperino è: 2, 2. il link counter di newfolder è: 3, 3. l'output del comando 10 è: 'ciao', 4. il link counter di tmp è: aumentato di 1", isCorrect: true },
      { id: "d", text: "1. il link-counter dell'i-node di paperino è: 2, 2. il link counter di newfolder è: 3, 3. l'output del comando 10 è: no such file or directory, 4. il link counter di tmp è: aumentato di 1", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["file-system"]
  },
  {
    number: 7,
    text: "Cosa succede quando si esegue la close su un file, in un generico sistema operativo?\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "si comunica al sistema operativo che non si vuole più usare quel file. Tutte le informazioni del file che erano state copiate in memoria primaria possono quindi venire rimosse, ma non prima di essere state salvate in memoria secondaria se è necessario", isCorrect: true },
      { id: "b", text: "si comunica al sistema operativo che non si vuole più usare quel file. Tutte le informazioni del file che erano state copiate in memoria primaria possono quindi venire rimosse, ma non prima di essere state salvate in memoria secondaria se è necessario", isCorrect: false },
      { id: "c", text: "si comunica al sistema operativo che non si vuole più usare quel file. Tutte le informazioni del file che erano state copiate in memoria primaria possono quindi venire rimosse, e analogamente i file viene rimosso dalla memoria secondaria", isCorrect: false },
      { id: "d", text: "si comunica al sistema operativo che non si vuole più usare quel file. Tutte le informazioni del file che erano state copiate in memoria primaria possono quindi venire rimosse, ma non prima di essere state spostate nell'area swap, dove sarà più facile recuperarle se il file viene riaperto a breve", isCorrect: false }
    ],
    correctAnswer: "a",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["file-system"]
  },
  {
    number: 8,
    text: "Si consideri questa variante del problema dei produttori e consumatori:\n\nSemaphore mutex = 1; full =0; empty =N;\n\ncodice consumatore:\nrepeat\n  wait(empty);\n  wait(mutex);\n  <preleva dato dal buffer>\n  signal(mutex)\n  signal(full);\n  <consuma dato>\nforever\n\ncodice produttore:\nrepeat\n  <produci dato>\n  wait(full)\n  <inserisci dato nel buffer>\n  signal(empty)\nforever\n\nQuesta soluzione funziona? Se sì, a quali condizioni? Se no, perché?\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "La soluzione proposta funziona, e corrisponde al caso in cui è presente un solo produttore, visto che l'operazione di inserimento non è protetta dal semaforo di mutua esclusione", isCorrect: false },
      { id: "b", text: "La soluzione proposta non funziona in nessun caso, perché i semafori coinvolti nelle operazioni di sincronizzazione non sono usati in modo corretto", isCorrect: true },
      { id: "c", text: "La soluzione proposta funziona a condizione che i produttori accedano al buffer condiviso i momenti diversi, visto che l'operazione di inserimento non è protetta dal semaforo di mutua esclusione", isCorrect: false },
      { id: "d", text: "La soluzione proposta non funziona, visto che l'inserimento di un dato non è protetto dal semaforo di mutua esclusione e quindi due produttori potrebbero accedere al buffer contemporaneamente", isCorrect: false }
    ],
    correctAnswer: "b",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["sincronizzazione"]
  },
  {
    number: 9,
    text: "Di un sistema è noto che la tabella delle pagine più grande del sistema occupa esattamente 2 frame, il numero di un frame è scritto su 4 byte usando però solo i primi 22 bit, e nel sistema sono presenti in media 4 processi che insieme producono una frammentazione interna complessiva media di 64 Kilobyte.\n\nQuanto sono grandi lo spazio di indirizzamento logico e fisico del sistema?",
    type: "essay",
    answer: "Lo spazio logico del sistema è grande: 512 Megabyte. Lo spazio fisico del sistema è grande: 128 Gigabyte",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["memoria-primaria"]
  },
  {
    number: 10,
    text: "In quale/i caso/i un processo in coda di ready viene fatto passare allo stato running?\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "quando il processo è entrato in RQ arrivando da una coda di waiting, perché significa che è disponibile l'informazione che il processo stava attendendo, e la sua computazione può ripartire", isCorrect: false },
      { id: "b", text: "solo quando è l'unico processo nella coda, altrimenti dovrà aspettare che siano stati mandati in esecuzione i processi che nella coda vengono prima di lui.", isCorrect: false },
      { id: "c", text: "quando il sistema operativo ha terminato le operazioni necessarie ad amministrare la vita del processo, ad esempio ha allocato il processo in RAM e inizializzato il suo PCB", isCorrect: false },
      { id: "d", text: "quando lo scheduler della CPU lo seleziona per entrare in esecuzione. Ad esempio, nel caso di FCFS, quando il processo si trova in cima alla coda di ready", isCorrect: true }
    ],
    correctAnswer: "d",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["processi-scheduling"]
  },
  {
    number: 11,
    text: "Riguardo ai link fisici nell'ambiente Unix, secondo quanto visto a lezione possiamo dire che:\n\nScegli un'alternativa:",
    type: "multiple-choice",
    options: [
      { id: "a", text: "permettono un accesso più lento ai file e occupano più spazio dei link simbolici, e sono ammessi sia tra file regolari che tra cartelle, anche se con alcune restrizioni", isCorrect: false },
      { id: "b", text: "permettono un accesso più lento ai file e occupano più spazio dei link simbolici, e sono ammessi solo tra file regolari perché tra cartelle sono ammessi solo i link simbolici", isCorrect: false },
      { id: "c", text: "permettono un accesso più veloce ai file e occupano meno spazio dei link simbolici, e sono ammessi solo tra file regolari perché tra cartelle sono ammessi solo i link simbolici", isCorrect: false },
      { id: "d", text: "permettono un accesso più veloce ai file e occupano meno spazio dei link simbolici, e sono ammessi sia tra file regolari che tra cartelle, anche se con alcune restrizioni", isCorrect: true }
    ],
    correctAnswer: "d",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["file-system"]
  },
  {
    number: 12,
    text: "Su un hard disk che adotta una allocazione concatenata (senza FAT) è memorizzato un file A della dimensione di 0x4000 byte, e si sa che nell'ultimo blocco di A sono presenti 8 byte del file. Si sa inoltre che per scrivere il numero di un blocco vengono usati 29 bit, arrotondati al minimo numero di byte necessario. Quanto è grosso l'hard disk?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "2 Terabyte", isCorrect: false },
      { id: "b", text: "4 Terabyte", isCorrect: true },
      { id: "c", text: "512 Gigabyte", isCorrect: false },
      { id: "d", text: "1 Terabyte", isCorrect: false }
    ],
    correctAnswer: "b",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["memoria-massa", "file-system"]
  },
  {
    number: 13,
    text: "si consideri l'esecuzione della seguente porzione di codice che utilizza la system call fork:\n\nint a, b, c, d, n, pid1, pid2, pid3;\na = 30, b = 40, c = 50, d = 60;\nn = fork();\nif ( n == 0)\n  {a = 35; b = 45;\n  pid1 = getpid();\n  printf('%d', pid1);\n  exit(0);}\nelse\n  {c = 55; d = 65;\n  pid2 = getpid();\n  printf('%d',pid2);\n  pid3 = wait(NULL);\n  exit(0);}\n\nDeterminare:\n- il valore della variabile a vista dal processo figlio subito prima della sua exit è: [risposta]\n- il valore della variabile c vista dal processo figlio subito prima della sua exit è: [risposta]\n- il valore della variabile b vista dal processo padre subito prima della sua exit è: [risposta]\n- il valore della variabile d vista dal processo padre subito prima della sua exit è: [risposta]\n- all'esecuzione delle due printf vale la seguente relazione: [selezione tra pid1 = pid2, pid1 < pid2, ecc.]\n- del risultato della wait possiamo dire che: [selezione tra pid1 < pid3, pid1 = pid3, ecc.]",
    type: "essay",
    answer: "a (figlio) = 35, c (figlio) = 50, b (padre) = 40, d (padre) = 65, relazione printf: pid1 = pid2 (falso, dovrebbe essere pid1 ≠ pid2), wait: pid1 < pid3 (o pid1 = pid3)",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["processi-scheduling"]
  },
  {
    number: 14,
    text: "Un sistema ha un tempo di accesso in RAM di 110 ns, adotta un TLB con un tempo di accesso di 10 ns e un hit rate del 90%, e usa un algoritmo di rimpiazzamento delle pagine. Quando si verifica un hit la pagina indirizzata è sicuramente in RAM. Quando si verifica un miss, nel 20% dei casi la pagina indirizzata non è in RAM e il page fault ha un costo totale di gestione di 1 microsecondo, indipendentemente dal valore del dirty bit. Qual è l'effective access time (eat) del sistema? (per semplicità in caso di miss si ignori il costo di interrogazione del TLB, e in caso di page fault si consideri solo il tempo di gestione del page fault)",
    type: "multiple-choice",
    options: [
      { id: "a", text: "mat = 145,6 ns", isCorrect: true },
      { id: "b", text: "mat = 156,6 ns", isCorrect: false },
      { id: "c", text: "mat = 124,6 ns", isCorrect: false },
      { id: "d", text: "mat = 134,6 ns", isCorrect: false }
    ],
    correctAnswer: "a",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["memoria-primaria"]
  },
  {
    number: 15,
    text: "In un sistema operativo un indirizzo fisico è scritto su 28 bit, l'offset più grande in una pagina è 3FFF, e lo spazio logico è il doppio di quello fisico.\n\nSe il sistema adottasse una Inverted Page Table della dimensione di 64 Kilobyte, quanti potrebbero essere al massimo i processi presenti contemporaneamente nel sistema?",
    type: "multiple-choice",
    options: [
      { id: "a", text: "2^10 processi", isCorrect: false },
      { id: "b", text: "2^17 processi", isCorrect: true },
      { id: "c", text: "2^20 processi", isCorrect: false },
      { id: "d", text: "2^14 processi", isCorrect: false }
    ],
    correctAnswer: "b",
    maxPoints: 2,
    negativePoints: 0,
    topics: ["memoria-primaria"]
  }
];

// Crea struttura esame
const exam = {
  id: 'prova-febbraio-2024',
  date: '2024.02.00',
  course: 'Teoria SO',
  title: 'Prova Febbraio 2024 - Sistemi Operativi',
  duration: 120,
  totalPoints: questionsData.reduce((sum, q) => sum + q.maxPoints, 0),
  questions: questionsData.map(q => ({
    id: `prova-feb-2024-q${q.number}`,
    text: q.text,
    type: q.type,
    ...(q.options && { options: q.options }),
    ...(q.statements && { statements: q.statements }),
    ...(q.correctAnswer && { correctAnswer: q.correctAnswer }),
    ...(q.answer && { answer: q.answer }),
    maxPoints: q.maxPoints,
    negativePoints: q.negativePoints,
    topics: q.topics,
    ...(q.explanation && { explanation: q.explanation })
  }))
};

// Salva il file JSON
const outputPath = path.join(__dirname, '../src/data/exam-prova-febbraio-2024.json');
fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));

console.log('✅ SUCCESS!');
console.log('============================================================');
console.log(`📝 Created: exam-prova-febbraio-2024.json`);
console.log(`📊 Questions: ${exam.questions.length} domande estratte da 16 screenshot`);
console.log(`📌 Topics: ${[...new Set(questionsData.flatMap(q => q.topics))].join(', ')}`);
console.log(`💯 Total points: ${exam.totalPoints}`);
console.log('');
console.log('📋 Question types:');
console.log(`   - multiple-choice: ${questionsData.filter(q => q.type === 'multiple-choice').length}`);
console.log(`   - essay: ${questionsData.filter(q => q.type === 'essay').length}`);
console.log('');
console.log('============================================================');
console.log('🚀 Next step: node scripts/merge-exams.js');
