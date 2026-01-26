import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../src/data/domande_aperte_raw.txt');
const outputPath = path.join(__dirname, '../src/data/exam-domande-aperte-corso-b.json');

// Manually extracted questions with structure
const questions = [
  {
    number: 1,
    text: 'I "grafi di allocazione delle risorse" sono strumenti di rilevazione o di prevenzione del deadlock? In quale modo possono essere usati a questo scopo? Vi sono eventuali vincoli?',
    answer: `I grafi di allocazione delle risorse sono strumenti di rilevazione del deadlock.

I grafi permettono di rappresentare graficamente le assegnazioni delle risorse ai processi. Se il grafo non contiene cicli, non c'è deadlock. Se il grafo contiene un ciclo con risorse aventi tutte una sola istanza, c'è deadlock. Se il ciclo comprende risorse con più istanze, il ciclo è condizione necessaria ma non sufficiente.

L'uso dei grafi come strumento di rilevazione non prevede vincoli particolari.`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['sincronizzazione', 'deadlock']
  },
  {
    number: 2,
    text: '(1) Si spieghi per quale motivo i metodi di allocazione della RAM per i processi kernel devono essere diversi da quelli per i processi utente e (2) si illustri il metodo di allocazione noto come sistema buddy.',
    answer: `(1) I metodi di allocazione RAM per i processi kernel devono essere diversi per due motivi principali:
- Strutture dati variabili: I processi kernel gestiscono strutture dati che cambiano dimensione (liste, code)
- Memoria contigua: Alcuni processi kernel, specialmente quelli che lavorano con l'hardware, necessitano di memoria contigua per operazioni I/O

(2) Il sistema buddy:
- Suddivide la memoria in blocchi di dimensione pari a potenze di 2
- Cerca il blocco più piccolo sufficiente per la richiesta
- Se il blocco è troppo grande, lo divide in due blocchi "buddy" di dimensione pari alla metà
- Quando un blocco viene liberato, verifica se il suo "buddy" è libero e li fonde insieme
- Vantaggi: semplice da implementare, riduce frammentazione esterna
- Svantaggi: può causare frammentazione interna significativa`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['memoria-primaria', 'kernel']
  },
  {
    number: 3,
    text: '(1) Spiegare il dual mode e cosa si intende per system call, (2) dire cos\'è e come viene usato il vettore delle interruzioni.',
    answer: `(1) Dual mode e system call:
Il dual mode prevede la divisione dell'instruction set in:
- Istruzioni privilegiate (eseguibili solo dal SO in modalità kernel)
- Istruzioni non privilegiate (eseguibili in modalità utente)
Si basa su un bit di modalità (0=kernel, 1=utente).

Le system call sono meccanismi che permettono ai processi utente di richiedere al SO di eseguire operazioni privilegiate. Durante una system call: il processo invia una trap, il SO passa in modalità kernel, esegue l'operazione, ritorna in modalità utente.

(2) Vettore delle interruzioni:
È una tabella contenente gli indirizzi degli handler degli interrupt. Quando si verifica un'interruzione:
- L'hardware genera un segnale con l'ID dell'interruzione
- La CPU usa l'ID come indice nel vettore per ottenere l'indirizzo dell'handler
- Salva lo stato corrente ed esegue l'handler`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['generalita', 'system-call', 'interruzioni']
  },
  {
    number: 4,
    text: '(1) Spiegare cosa si intende per parallelismo virtuale, compresi quali fondamenti rendano possibile tale meccanismo. (2) Cos\'è e come viene gestito dal SO un context switch.',
    answer: `(1) Parallelismo virtuale:
È un meccanismo che consente di eseguire più processi "contemporaneamente" su un singolo processore, dando l'illusione di esecuzione parallela. Il processore esegue solo un processo alla volta, ma la commutazione è così rapida da creare l'impressione di simultaneità.

Fondamenti che lo rendono possibile:
- Multiprogrammazione: gestione di più processi contemporaneamente
- Scheduling della CPU: algoritmo per decidere quale processo eseguire
- Interruzioni: segnali per interrompere l'esecuzione e passare ad altro processo
- Context Switch: meccanismo per salvare/caricare stato processi

(2) Context switch:
È il processo di salvataggio dello stato di un processo in esecuzione e caricamento dello stato di un altro processo. È gestito dal SO ed è un'operazione costosa. Si verifica durante interruzioni hardware o system call.`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['processi-scheduling', 'context-switch']
  },
  {
    number: 5,
    text: '(1) Si spieghi che cos\'è e a che cosa serve una tabella delle pagine. (2) Si spieghi perché il suo mantenimento in RAM rallenta l\'esecuzione.',
    answer: `(1) Tabella delle pagine:
È una struttura dati per gestire la memoria virtuale, che funge da mappa per tradurre indirizzi logici in indirizzi fisici. Ogni processo ha la propria tabella memorizzata in RAM, contenente una entry per ogni pagina. Ogni entry contiene:
- Numero di frame corrispondente
- Bit di validità
- Dirty bit
- Bit di protezione

Consente di: mappare indirizzi logici su fisici, implementare demand paging, proteggere la memoria, condividere pagine tra processi.

(2) Rallentamento esecuzione:
Mantenere la tabella in RAM rallenta perché per ogni accesso alla memoria servono DUE accessi alla RAM:
1. Accesso alla tabella delle pagine per trovare l'entry
2. Accesso all'indirizzo fisico ottenuto

Per mitigare il problema si usa il TLB (Translation Look-aside Buffer), una cache che memorizza le traduzioni più recenti.`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['memoria-primaria', 'paginazione', 'TLB']
  },
  {
    number: 6,
    text: '(1) Si spieghi cos\'è test-and-set e (2) si spieghi come controllare una sezione critica tramite test-and-set.',
    answer: `(1) Test-and-set:
È un'istruzione atomica fornita dall'hardware per la sincronizzazione dei processi. Prende come parametro un puntatore ad una variabile booleana e svolge atomicamente:
1. Salva il valore originale della variabile
2. Imposta la variabile a true
3. Restituisce il valore originale

(2) Controllo sezione critica:
Si usa una variabile booleana globale "lock" inizializzata a false.

Codice:
while (TestAndSet(&lock)); // Sezione di ingresso
<sezione critica>
lock = false;             // Sezione di uscita

Se lock è true, un altro processo è nella sezione critica, quindi si aspetta nel while. Quando lock diventa false, il processo entra e imposta lock a true. L'atomicità garantisce che solo un processo alla volta ottenga il lock.`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['sincronizzazione', 'sezione-critica', 'test-and-set']
  },
  {
    number: 7,
    text: '(1) Si spieghi che cos\'è una system call (2) si spieghi cosa permettono di fare e si faccia un esempio di system call',
    answer: `(1) System call:
È un meccanismo che consente ai processi in modalità utente di richiedere servizi al sistema operativo che opera in modalità kernel. È un'interfaccia tra programmi utente e SO per eseguire operazioni che richiedono privilegi speciali.

(2) Cosa permettono di fare:
- Controllo dei Processi: creare, terminare, sospendere processi
- Gestione dei File: creare, aprire, leggere, scrivere, cancellare file
- Gestione dei Dispositivi: richiedere/rilasciare dispositivi, leggere/scrivere
- Gestione delle Informazioni: ottenere info sul sistema
- Comunicazione: inviare/ricevere messaggi tra processi

Esempio: open() in Unix apre un file e restituisce un file descriptor che può essere usato da altre system call come read() e write().`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['generalita', 'system-call']
  },
  {
    number: 8,
    text: '1) Spiegare in cosa consiste il problema della sezione critica. 2) Elencare e definire le tre proprietà di una buona soluzione al problema della sezione critica',
    answer: `1) Problema della sezione critica:
Riguarda la gestione di dati condivisi in un sistema concorrente. Una sezione critica è una porzione di codice in cui un processo modifica variabili condivise. Solo un processo alla volta può essere nella sua sezione critica (mutua esclusione), altrimenti si verificano inconsistenze.

2) Tre proprietà di una buona soluzione:
- Mutua esclusione: Solo un processo alla volta può eseguire la propria sezione critica
- Progresso: Nessun processo che non sia interessato alla sezione critica può bloccare altri processi dall'accedervi. Solo i processi interessati concorrono a determinare chi entrerà
- Attesa limitata: Esiste un limite superiore al tempo di attesa per un processo che desidera entrare in sezione critica`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['sincronizzazione', 'sezione-critica']
  },
  {
    number: 9,
    text: '(1) Spiegare cos\'è il vettore delle interruzione e come viene usato per gestire gli eventi. (2) Spiegare in quali circostanze occorre un page fault',
    answer: `(1) Vettore delle interruzioni:
È un array di puntatori a funzioni di gestione eventi. Ogni evento ha un ID univoco corrispondente all'indice del vettore. Funzionamento:
- Dispositivo/programma genera interruzione
- CPU salva stato e identifica ID interruzione
- ID usato come indice nel vettore per trovare routine di gestione
- CPU esegue routine di gestione
- Ripristina stato e riprende esecuzione

(2) Page fault:
Si verifica quando un processo cerca di accedere ad una pagina di memoria virtuale non presente in RAM. Circostanze:
- Pagina non caricata: mai stata caricata in RAM
- Pagina in memoria secondaria: caricata in precedenza ma sostituita
- Accesso non valido: accesso a pagina non assegnata o senza permessi

Il SO interrompe il processo e gestisce il page fault caricando la pagina richiesta. Se non c'è spazio, trova una pagina vittima da spostare in memoria secondaria (algoritmi: Second Chance, LRU).`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['generalita', 'interruzioni', 'memoria-primaria', 'page-fault']
  },
  {
    number: 10,
    text: '(1) Spiegare cosa sono e dove sono memorizzati gli INODE e (2) spiegare l\'allocazione concatenata dei blocchi ai file.',
    answer: `(1) INODE (Index Node o FCB):
Sono strutture dati fondamentali nei file system che memorizzano i metadati di un file (eccetto nome e dati). Contenuto tipico:
- User ID proprietario
- Tipo file (regolare, directory, link, device)
- Diritti di accesso
- Tempi di accesso/modifica
- Numero di link
- Dimensione file
- Puntatori ai blocchi dati

Quando un file è aperto, il suo FCB viene aggiunto alla lista dei file aperti. Se in uso da un processo, l'INODE viene caricato in RAM come "in-core inode". Si usa l'algoritmo namei per risalire all'INODE tramite path.

(2) Allocazione concatenata:
I file sono allocati in blocchi collegati come catena. Ogni blocco contiene dati e puntatore al blocco successivo. L'INODE contiene puntatore al primo blocco.

Vantaggi: blocchi non contigui, aggiunta blocchi rapida, niente frammentazione esterna
Svantaggi: lettura lenta (scorrere tutta catena), puntatore danneggiato rende file illeggibile`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['file-system', 'INODE', 'allocazione-file']
  },
  {
    number: 11,
    text: '(1) Elencare e definire le tre proprietà di una buona soluzione al problema della sezione critica; (2) Con riferimento al seguente codice (dove S è un semaforo inizializzato a 2) dire e spiegare se soddisfa tali proprietà: P(S) ... Sezione Critica ... V(S)',
    answer: `(1) Tre proprietà:
- Mutua Esclusione: Solo un processo alla volta può accedere alla sezione critica
- Progresso: Se nessun processo è nella sezione critica, un processo che desidera entrarvi deve poterlo fare senza blocco indefinito
- Attesa Limitata: Esiste un limite massimo al tempo di attesa prima di accedere alla sezione critica

(2) Analisi codice con S=2:
Assunzioni: P(S) e V(S) sono atomiche e implementate correttamente.

Soddisfazione proprietà:
- Mutua Esclusione: NON soddisfatta. S=2 significa che DUE processi possono entrare contemporaneamente nella sezione critica. Per mutua esclusione serve S=1.
- Progresso: Soddisfatta. Se nessun processo è nella sezione critica (S=2), un processo che esegue P(S) può accedere.
- Attesa Limitata: Soddisfatta. L'attesa è limitata dal numero di processi che possono accedere (2 in questo caso).`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['sincronizzazione', 'sezione-critica', 'semafori']
  },
  {
    number: 12,
    text: '(1) Spiegare cosa si intende per "interleaving delle istruzioni". (2) Spiegare come tale meccanismo supporta la realizzazione del multi-tasking',
    answer: `(1) Interleaving delle istruzioni:
È l'interfogliamento delle istruzioni, ovvero la capacità del SO di eseguire in modo interleaved le istruzioni di diversi processi, creando l'illusione di esecuzione contemporanea. Su un singolo processore solo un'istruzione alla volta può essere eseguita, ma il SO sospende/riprende processi molto rapidamente.

(2) Supporto al multi-tasking:
L'interleaving è un meccanismo chiave per il multi-tasking:
- Il SO può sospendere un processo e passare a un altro molto rapidamente
- Usa il context switch per salvare lo stato del processo corrente e caricare quello di un altro
- Crea l'impressione di esecuzione parallela dei processi
- Migliora l'efficienza complessiva del sistema
- Consente gestione concorrente di più processi`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['processi-scheduling', 'multi-tasking', 'interleaving']
  },
  {
    number: 13,
    text: '(1) Si spieghi l\'allocazione della RAM a partizioni contigue e (2) se ne spieghino vantaggi e svantaggi',
    answer: `(1) Allocazione contigua RAM:
Metodo dove ogni processo viene caricato in un'unica sezione di memoria contigua. La RAM è divisa in due parti: SO e processi utente. Il meccanismo è "a partizioni multiple". Quando un processo deve essere caricato, il SO cerca una porzione libera sufficientemente grande.

Criteri di scelta:
- Best-fit: la porzione più piccola tra quelle sufficienti
- First-fit: la prima porzione sufficiente trovata
- Worst-fit: la porzione più grande tra quelle libere

(2) Vantaggi e svantaggi:
Vantaggi:
- Semplicità di implementazione e gestione
- Efficienza: accesso veloce alla memoria (dati contigui)

Svantaggi:
- Frammentazione esterna: memoria frammentata in piccoli buchi inutilizzabili
- Limitata flessibilità: dimensione processo limitata dal buco più grande disponibile
- Compattazione: necessaria per ridurre frammentazione, operazione costosa

Distinzione frammentazione:
- Esterna: parti libere non contigue, inutilizzabili per processi che richiedono spazio contiguo
- Interna: parti molto piccole praticamente inutilizzabili`,
    maxPoints: 3,
    negativePoints: 0,
    type: 'essay',
    topics: ['memoria-primaria', 'allocazione-memoria', 'frammentazione']
  }
];

// Create exam structure
const exam = {
  id: 'domande-aperte-corso-b',
  date: '2024.00.00',
  course: 'B',
  title: 'Domande Aperte Corso B - Teoria SO (13 Domande Essay)',
  topics: [
    'generalita',
    'processi-scheduling',
    'sincronizzazione',
    'memoria-primaria',
    'file-system'
  ],
  questions: questions
};

// Write to file
try {
  fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));
  console.log('\n✅ SUCCESS!');
  console.log('=' .repeat(60));
  console.log(`📝 Created: ${path.basename(outputPath)}`);
  console.log(`📊 Questions: ${exam.questions.length} essay questions`);
  console.log(`📌 Topics: ${exam.topics.join(', ')}`);
  console.log(`💯 Total points: ${exam.questions.reduce((sum, q) => sum + q.maxPoints, 0)}`);
  console.log('\n📋 Question breakdown:');
  questions.forEach(q => {
    console.log(`   Q${q.number}: ${q.text.substring(0, 70)}...`);
  });
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Next step: Run merge-exams.js to integrate with main exam list');
  console.log('   Command: node scripts/merge-exams.js');
} catch (error) {
  console.error('❌ Error writing file:', error.message);
  process.exit(1);
}
