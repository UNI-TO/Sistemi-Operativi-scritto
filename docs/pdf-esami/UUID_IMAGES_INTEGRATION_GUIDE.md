# Guida Integrazione Immagini UUID e Prova Febbraio 2024

## 📋 Overview

Questo documento fornisce una guida passo-passo per integrare:
- **55 immagini UUID sparse** → "Esame Misto - Domande Varie"
- **16 screenshot Prova_febbraio2024** → "Prova Febbraio 2024"

---

## Parte 1: Immagini UUID Sparse (55 domande)

### Pattern Identificati

**Domanda 2** (`10ef6b5b-b45f-45ef-85cf-262b6c798d46.jpg`)
- Tipo: Multiple choice (4 opzioni a-d)
- Argomento: Librerie statiche vs dinamiche
- Status: "Risposta non ancora data"
- Punteggio: max 1.0

**Domanda 8** (`01adf582-af9e-445f-a475-257aeddc19df.jpg`)
- Tipo: Multiple choice (4 opzioni a-d)
- Argomento: Comandi Unix link (ln, mkdir, ls)
- Status: "Risposta errata"
- Soluzione: "il comando 3)"
- Punteggio: 0.0/1.0

**Domanda 11** (`021d8651-e6da-42e0-8443-50af80bc1ba2.jpg`)
- Tipo: Multianswer (5 affermazioni V/F)
- Argomento: TLB (Translation Lookaside Buffer)
- Status: "Parzialmente corretta"
- Soluzione: F-V-F-F-V (con 1 errore)
- Punteggio: 1.60/2.00

**Domanda programmazione** (`corretto.jpg`)
- Tipo: Multiple choice (3 opzioni)
- Argomento: Analisi codice C (puntatori, segmentation fault)
- Tempo stimato: 2 minuti
- Soluzione: "corretto"

### Approccio di Integrazione

#### Opzione 1: Esame Unico Misto (Raccomandato)
Creare un singolo esame "Domande Varie - Mix Argomenti" con tutte le 55 domande.

**Vantaggi:**
- ✅ Più semplice da gestire
- ✅ Utile per ripassare argomenti casuali
- ✅ Simulazione stile "quiz veloce"

**Struttura JSON:**
```json
{
  "id": "esame-misto-uuid-varie",
  "date": "2024.XX.XX",
  "course": "Mixed",
  "title": "Domande Varie - Mix Argomenti (55 domande)",
  "topics": ["generalita", "processi-scheduling", "sincronizzazione", "memoria-primaria", "memoria-massa", "file-system"],
  "questions": [
    {
      "number": 1,
      "text": "Confrontando le librerie statiche e quelle dinamiche possiamo dire che...",
      "answer": "Risposta da estrarre dall'immagine",
      "maxPoints": 1,
      "negativePoints": 0,
      "type": "multiple-choice",
      "options": [
        {"id": "a", "text": "le librerie dinamiche sono...", "isCorrect": false},
        {"id": "b", "text": "le librerie dinamiche sono...", "isCorrect": true},
        {"id": "c", "text": "le librerie dinamiche sono...", "isCorrect": false},
        {"id": "d", "text": "le librerie dinamiche sono...", "isCorrect": false}
      ],
      "correctAnswer": "b",
      "imageRef": "10ef6b5b-b45f-45ef-85cf-262b6c798d46.jpg"
    }
    // ... altre 54 domande
  ]
}
```

#### Opzione 2: Esami Tematici
Dividere le 55 domande in esami per argomento (es: TLB/Memoria, File System, Scheduling, etc.)

**Vantaggi:**
- ✅ Più organizzato per studiare argomenti specifici
- ✅ Permette filtraggio per topic

**Svantaggi:**
- ⚠️ Richiede classificazione manuale di ogni immagine

### Script Template da Creare

```javascript
// scripts/parse-uuid-images-exam.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../src/data/exam-uuid-misto.json');

// TODO: Compilare manualmente analizzando le 55 immagini
const questionsData = [
  {
    imageFile: "01adf582-af9e-445f-a475-257aeddc19df.jpg",
    number: 8,
    text: "Nello Unix, quale/quali dei seguenti comandi modifica il valore del link counter...",
    type: "multiple-choice",
    options: [
      { id: "a", text: "il comando 1) X", isCorrect: false },
      { id: "b", text: "i comandi 2) e 4)", isCorrect: false },
      { id: "c", text: "il comando 3)", isCorrect: true },
      { id: "d", text: "i comandi 1) e 3)", isCorrect: false }
    ],
    correctAnswer: "c",
    maxPoints: 1,
    negativePoints: 0
  },
  // ... aggiungere altre 54 domande qui
];

const exam = {
  id: 'esame-misto-uuid-varie',
  date: '2024.00.00',
  course: 'Mixed',
  title: 'Domande Varie - Mix Argomenti (55 Q)',
  topics: ['generalita', 'processi-scheduling', 'sincronizzazione', 'memoria-primaria', 'memoria-massa', 'file-system'],
  questions: questionsData.map((q, idx) => ({
    number: idx + 1,
    text: q.text,
    answer: q.options.find(o => o.isCorrect)?.text || 'Vedi soluzione',
    maxPoints: q.maxPoints,
    negativePoints: q.negativePoints,
    type: q.type,
    options: q.options,
    correctAnswer: q.correctAnswer,
    imageRef: q.imageFile
  }))
};

fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));
console.log(`✓ Created exam with ${exam.questions.length} questions`);
```

### Processo di Integrazione

1. **Creare cartella immagini:**
   ```bash
   mkdir -p public/exams/uuid-misto
   cp docs/pdf-esami/foto-esami/*.jpg public/exams/uuid-misto/
   ```

2. **Analizzare immagini:**
   - Aprire ogni immagine JPG
   - Estrarre: numero domanda, testo, opzioni, risposta corretta
   - Compilare array `questionsData` nel parser

3. **Eseguire parser:**
   ```bash
   node scripts/parse-uuid-images-exam.js
   ```

4. **Merge con altri esami:**
   ```bash
   node scripts/merge-exams.js
   ```

---

## Parte 2: Prova Febbraio 2024 (16 screenshot)

### Caratteristiche Esame

- **Piattaforma:** EzamEsami (esami.i-learn.unito.it)
- **Data:** 10 Febbraio 2025
- **Formato:** 16 screenshot con scroll page
- **Punteggio finale:** 6/30 (16.67%)
- **Tempo:** 59 minuti
- **Difficoltà parsing:** Alta (domande sovrapposte, scroll verticale)

### Domande Identificate

**Screenshot 1** (`21.41.17.JPG`):
- **Domanda 1**: Multiple choice (4 opzioni)
  - Argomento: Paginazione memoria
  - Risposta: opzione c) "permette di eliminare la frammentazione esterna..."

**Screenshot 2** (`21.41.21.JPG`):
- **Domanda 2**: Multiple choice (4 opzioni)
  - Argomento: Hard disk, blocchi, indirizzamento
  - Risposta errata selezionata: d) 32 Kilobyte ❌
  - Risposta corretta: c) 48 Kilobyte ✓

- **Domanda 3**: Scheduling con tabella processi
  - Risposta corretta ✓
  - Include tabella: ProcessoT, arrivo, Burst

**Screenshot 3** (`21.41.31.JPG`):
- Domande successive...

### Script Template

```javascript
// scripts/parse-prova-febbraio-2024.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../src/data/exam-prova-febbraio-2024.json');

const exam = {
  id: 'prova-febbraio-2024',
  date: '2024.02.10',
  course: 'A',
  title: 'Prova Febbraio 2024 - EzamEsami',
  topics: ['generalita', 'processi-scheduling', 'sincronizzazione', 'memoria-primaria', 'file-system'],
  questions: [
    {
      number: 1,
      text: "Tutti i sistemi operativi moderni adottano una qualche forma di paginazione della memoria primaria, in quanto: Scegli un'alternativa...",
      answer: "La risposta corretta è: permette di eliminare la frammentazione esterna della RAM...",
      maxPoints: 2,
      negativePoints: 0,
      type: "multiple-choice",
      options: [
        { id: "a", text: "permette di eliminare la frammentazione esterna...", isCorrect: false },
        { id: "b", text: "permette di eliminare la frammentazione interna...", isCorrect: false },
        { id: "c", text: "permette di eliminare la frammentazione esterna della RAM e di limitare...", isCorrect: true },
        { id: "d", text: "permette di eliminare la frammentazione esterna e la frammentazione interna...", isCorrect: false }
      ],
      correctAnswer: "c",
      imageRef: "Screenshot 2025-02-10 alle 21.41.17.JPG"
    },
    {
      number: 2,
      text: "In hard disk grande 512 Gigabyte, per scrivere il numero di un blocco vengono usati 25 bit...",
      answer: "La risposta corretta è: 48 Kilobyte",
      maxPoints: 2,
      negativePoints: 0,
      type: "multiple-choice",
      options: [
        { id: "a", text: "24 Kilobyte", isCorrect: false },
        { id: "b", text: "40 Kilobyte", isCorrect: false },
        { id: "c", text: "48 Kilobyte", isCorrect: true },
        { id: "d", text: "32 Kilobyte", isCorrect: false }
      ],
      correctAnswer: "c",
      imageRef: "Screenshot 2025-02-10 alle 21.41.21.JPG"
    }
    // TODO: Aggiungere domande 3-15 analizzando i rimanenti 14 screenshot
  ]
};

fs.writeFileSync(outputPath, JSON.stringify(exam, null, 2));
console.log(`✓ Created Prova Febbraio 2024 with ${exam.questions.length} questions`);
```

### Processo di Integrazione

1. **Creare cartella immagini:**
   ```bash
   mkdir -p public/exams/prova-febbraio-2024
   cp "docs/pdf-esami/foto-esami/Prova_febbraio2024"/*.JPG public/exams/prova-febbraio-2024/
   ```

2. **Analizzare screenshots:**
   - Aprire ogni screenshot in ordine cronologico
   - Identificare tutte le domande visibili
   - Estrarre testo, opzioni, risposta corretta/errata
   - Compilare array questions nel parser

3. **Gestire sovrapposizioni:**
   - Alcuni screenshot mostrano le stesse domande
   - Usare il numero domanda come chiave unica
   - Prendere la versione più completa se duplicata

4. **Eseguire parser:**
   ```bash
   node scripts/parse-prova-febbraio-2024.js
   ```

---

## Stima Tempo Richiesto

### Immagini UUID (55 domande)
- Analisi per immagine: ~2-3 minuti
- Totale: **~2-3 ore**

### Prova Febbraio (16 screenshot, ~15 domande)
- Analisi per screenshot: ~5-6 minuti
- Totale: **~1.5-2 ore**

**Totale Opzione A + B: 3.5-5 ore lavoro manuale**

---

## Alternative per Accelerare

### 1. AI-Assisted Parsing
Usare un servizio di OCR + LLM per estrarre automaticamente:
- Google Cloud Vision API
- Azure Computer Vision + GPT-4
- Claude con Read tool (già disponibile!)

### 2. Parsing Collaborativo
Dividere le 55 immagini in batch e processare in parallelo

### 3. Parser Incrementale
Integrare prima un subset (es: 20 domande più chiare) e completare successivamente

---

## Status

- [x] Analisi pattern completata
- [x] Template parser creati
- [ ] **TODO: Analisi manuale immagini (55 UUID + 16 screenshot)**
- [ ] TODO: Compilare array questionsData
- [ ] TODO: Eseguire parser e merge
- [ ] TODO: Test build finale

---

**Creato:** 26 Gennaio 2026
**Note:** Questo documento serve da guida per completare l'integrazione delle immagini UUID e Prova Febbraio quando si ha tempo per il lavoro manuale di analisi.
