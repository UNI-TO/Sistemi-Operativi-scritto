# Simulatore Esami - Sistemi Operativi (Scritto C)

Simulatore di esami per esercitarsi con le prove scritte di programmazione in C per il corso di Sistemi Operativi. Include sia esercizi pratici che materiale teorico organizzato per argomenti.

## Caratteristiche

### Esami
- 📚 **22 esami** parsati automaticamente (14 HTML + 1 TXT + 3 PNG + 1 DOCX + 1 UUID Mix + 1 Prova Feb + 1 OCR PDF)
- ✍️ **Editor di codice** per scrivere le soluzioni in C
- 🖼️ **Supporto immagini** - visualizza domande con screenshot ed esercizi grafici (83 immagini totali)
- 💡 **Visualizzazione soluzioni** per ogni domanda
- 🎯 **Tipi di domande multipli**:
  - Essay (codice completo C)
  - Quiz (risposta breve)
  - Vero/Falso
  - Scelta Multipla
  - Associazione (matching)
- ⚖️ **Punteggio con negativi** - le risposte sbagliate sottraggono punti
- ✓ **Validazione automatica** per domande a scelta multipla
- 🏷️ **Tag argomenti** - ogni esame è collegato agli argomenti trattati
- 🔍 **Filtri per argomento** - trova esami su specifici topic
- 💾 **Auto-save** - salva automaticamente i progressi in localStorage
- 🔄 **Reset** per ricominciare l'esame

### Materiale di Studio
- 📖 **6 parti del corso** organizzate per argomento
- 📄 **Supporto PDF** - carica e consulta le tue dispense
- 🔗 **Integrazione esami-teoria** - naviga tra teoria ed esercizi
- 📋 **Capitoli di riferimento** per ogni argomento

### Generale
- 🏠 **Home page** con panoramica e statistiche
- 📱 **Responsive** - funziona su desktop e mobile
- 🎨 **UI moderna** con design pulito e intuitivo

## Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build
```

## Struttura del Progetto

```
Sistemi-Operativi-scritto/
├── src/
│   ├── components/                   # Componenti React
│   │   ├── ExamList.tsx              # Lista esami con filtri
│   │   ├── ExamSimulator.tsx         # Simulatore esame
│   │   ├── QuestionCard.tsx          # Card domanda essay
│   │   ├── MultipleChoiceQuestion.tsx # Card domanda V/F e scelta multipla
│   │   ├── ImageQuestion.tsx         # Card domanda con immagine
│   │   └── StudyMaterials.tsx        # Materiale di studio
│   ├── hooks/
│   │   └── useLocalStorage.ts        # Hook localStorage
│   ├── types/
│   │   └── Exam.ts                   # Type definitions + argomenti
│   ├── data/
│   │   ├── exams.json                # Dati esami parsati
│   │   └── study-materials.json      # Materiale di studio
│   ├── App.tsx                       # Router principale
│   ├── App.css                       # Stili completi
│   └── main.tsx
├── public/
│   └── exams/
│       ├── so-appello-14-01/         # Immagini esame PNG (17 domande, 18 PNG)
│       ├── so-b-17-06-2025/          # Immagini esame SO B 17/06 (8 PNG)
│       ├── teoria-so-b-18-06-2025/   # Immagini Teoria SO B 18/06 (8 PNG)
│       └── uuid-misto/               # Immagini UUID misto (50 JPG) ⭐ NUOVO
├── docs/
│   ├── struttura-simulatore-esami/  # HTML originali esami
│   ├── pdf-lezioni/                 # Materiale di studio per argomento
│   │   ├── parteUno-Generalità/
│   │   ├── parteDue-Tre-Gestione dei processi Sincronizzazione dei processi/
│   │   ├── parteQuattro-Gestione della memoria (primaria)/
│   │   ├── parteCinque-Gestione della memoria di massa/
│   │   └── parteSei-File System/
│   ├── pdf-esami/                   # PDF esami (opzionale)
│   └── pdf-analizzati-corretti/     # Analisi esami (opzionale)
├── scripts/
│   ├── parse-exams.js                      # Parser HTML → JSON esami
│   ├── parse-txt-exam.js                   # Parser TXT → JSON teoria
│   ├── parse-png-exam.js                   # Parser PNG + Soluzioni → JSON
│   ├── parse-docx-exams.js                 # Parser DOCX → raw text ⭐ NUOVO
│   ├── parse-domande-aperte-structured.js  # Parser DOCX domande aperte ⭐ NUOVO
│   ├── parse-uuid-images-exam.js           # Parser UUID images ⭐ NUOVO
│   ├── ocr-pdf-exams.js                    # OCR tool per PDF ⭐ NUOVO
│   ├── merge-exams.js                      # Merge tutti gli esami
│   ├── add-exam-topics.js                  # Aggiunge tag argomenti
│   └── parse-study-materials.js            # Parser materiale studio
└── package.json
```

## Aggiungere Nuovi Esami

1. Aggiungi i file HTML in `docs/struttura-simulatore-esami/`
2. Esegui i parser:
   ```bash
   # Parsing esami
   node scripts/parse-exams.js

   # Aggiungi tag argomenti
   node scripts/add-exam-topics.js
   ```
3. I nuovi esami appariranno automaticamente nell'app

## Aggiungere Materiale di Studio

1. Aggiungi i file PDF nelle cartelle appropriate in `docs/pdf-lezioni/`
   - Esempio: `docs/pdf-lezioni/parteUno-Generalità/lezione1.pdf`
2. Esegui il parser:
   ```bash
   node scripts/parse-study-materials.js
   ```
3. Il materiale apparirà nella sezione "Teoria"

## Esami Disponibili

| Data       | Corso | Domande | Tipo |
|------------|-------|---------|------|
| 2025.01.XX | A     | 11      | 🎯 Teoria (Vero/Falso, Associazione) |
| 2024.09.06 | A, B  | 2       | 💻 Programmazione C |
| 2024.01.19 | A, B  | 2       | 💻 Programmazione C |
| 2023.06.16 | A, B  | 2       | 💻 Programmazione C |
| 2023.01.24 | A, B  | 2       | 💻 Programmazione C |
| 2022.02.08 | A, B  | 2       | 💻 Programmazione C |
| 2020.07.02 | A     | 1       | 💻 Programmazione C |

**Totale**: 22 esami, **178 domande** (57 essay, 34 vero/falso, 31 multianswer, 55 multiple-choice, 1 matching)

## Argomenti del Corso

Il simulatore copre tutte le 6 parti del corso di Sistemi Operativi:

1. **I - Generalità** (Cap. 1-2)
   - Introduzione ai sistemi operativi
   - Strutture dei sistemi operativi

2. **II - Gestione dei Processi** (Cap. 3-5)
   - Processi e Thread
   - Scheduling della CPU

3. **III - Sincronizzazione** (Cap. 6-7)
   - Strumenti di sincronizzazione
   - Semafori e mutex

4. **IV - Gestione della Memoria** (Cap. 9-10)
   - Memoria centrale
   - Memoria virtuale e paginazione

5. **V - Memoria di Massa** (Cap. 11)
   - Dischi rigidi, RAID, SSD

6. **VI - File System** (Cap. 13-14)
   - Interfaccia e realizzazione del file system

## Tecnologie

- **React 18** con TypeScript
- **Vite** come build tool
- **Cheerio** per parsing HTML
- **mammoth** per parsing DOCX ⭐ NUOVO
- **pdf-parse** per estrazione testo PDF ⭐ NUOVO
- **tesseract.js** per OCR PDF scansionati ⭐ NUOVO
- CSS custom per lo styling

## Come Usare

1. **Home**: Scegli tra "Esami" o "Teoria"
2. **Esami**:
   - Filtra per argomento usando i pulsanti in alto
   - Seleziona un esame per iniziare
   - Scrivi le tue soluzioni nell'editor (per domande di codice)
   - Seleziona le risposte (per domande a scelta multipla/vero-falso)
   - Clicca "Verifica Risposta" per vedere se è corretta (con punteggio!)
   - Confronta con le soluzioni ufficiali
3. **Teoria**:
   - Consulta il materiale diviso per argomento
   - Consulta i PDF delle lezioni
   - Clicca su "Vedi Esami" per praticare quell'argomento

## 📂 Materiale Disponibile

### Esami Già Integrati (22 totali, 178 domande) 🚀
- **14 esami HTML** parsati (2020-2024) - programmazione C (21 domande essay)
- **1 esame teoria TXT** con domande multiple (11 domande):
  - 9 domande Vero/Falso
  - 1 domanda a risposta breve
  - 1 domanda di Associazione
- **3 esami teoria PNG** con immagini (41 domande totali):
  - **SO Appello 14/01/2025** (17 domande): 11 V/F + 6 multianswer
  - **SO Corso B 17/06/2025** (12 domande): 7 V/F + 3 multianswer + 2 essay
  - **Teoria SO Corso B 18/06/2025** (12 domande): 7 V/F + 3 multianswer + 2 essay
- **1 esame DOCX estratto** (13 domande essay):
  - **Domande Aperte Corso B** - teoria SO approfondita (39 punti)
- **1 esame UUID Misto** ✅ COMPLETATO (50 domande):
  - **Domande Varie Mix Argomenti**: 28 multiple-choice + 3 multianswer + 19 essay
- **1 esame Prova Febbraio 2024** ✅ COMPLETATO (15 domande):
  - **Prova Febbraio 2024**: 11 multiple-choice + 2 essay
- **1 esame OCR PDF** ✅ COMPLETATO (15 domande):
  - **Teoria 27 Gennaio 2026**: 10 multiple-choice + 3 multianswer + 2 essay

### Materiale da Processare (~800+ file)
Vedi `docs/pdf-esami/ADDITIONAL_EXAMS_ANALYSIS.md` e `docs/OCR_PROCESSING_GUIDE.md` per dettagli completi:

**Pronto per integrazione (template disponibili):**
- ~~55 immagini JPG sparse UUID~~ ✅ 10 integrate, 40 rimanenti (template pronto)
- 16 screenshot Prova febbraio 2024 (guida disponibile)
- Stima: +55 domande

**Tool OCR pronti per batch processing:** ⭐ NUOVO
- 126+ PDF teoria SCRITTI SO (2007-2020) - ✅ OCR tool installato
- 28 PDF Esami SO vari - ✅ OCR tool installato
- ~~2 DOCX Corso B~~ ✅ 1 DOCX integrato (domande_aperte), 1 non estraibile (solo appunti)
- Stima: +600 domande potenziali
- **Script:** `node scripts/ocr-pdf-exams.js pdf`

### PDF Lezioni (11 file caricati)
- Capitolo 1-2: Generalità
- Capitolo 3-7: Processi e Sincronizzazione
- Capitolo 9-10: Gestione Memoria
- Capitolo 11: Memoria di Massa
- Capitolo 13-14: File System

## 🎮 Funzionalità Principali Implementate

### Sistema di Valutazione Avanzato
- ✅ **Punteggi positivi e negativi**: Le risposte sbagliate sottraggono punti
- ✅ **Validazione automatica**: Per domande a scelta multipla/vero-falso
- ✅ **Feedback immediato**: Visualizzazione istantanea se la risposta è corretta
- ✅ **Statistiche complete**: Punteggio totale, percentuale, risposte corrette/sbagliate
- ✅ **Persistenza dati**: Auto-save con localStorage per non perdere progressi
- ✅ **Indicatori progresso**: Badge "📝" per esami con risposte salvate

### Tipi di Domande Supportati
1. **Essay** (💻 Codice C completo / Teoria approfondita) - 57 domande ⭐
2. **Multianswer** (📝 Risposta breve) - 31 domande ⭐
3. **True/False** (✓/✗ Vero o Falso) - 34 domande
4. **Multiple Choice** (🔘 Scelta multipla) - 55 domande ⭐
5. **Matching** (🔗 Associazione) - 1 domanda

**Totale: 178 domande** su 22 esami 🚀

### Parser Implementati
- ✅ **HTML → JSON** (14 esami programmazione C) - `parse-exams.js`
- ✅ **TXT → JSON** (esami teoria con V/F, scelta multipla, associazione) - `parse-txt-exam.js`
- ✅ **PNG + Soluzioni.txt → JSON** (esami teoria con immagini) - `parse-png-exam.js`
- ✅ **DOCX → JSON** (domande aperte teoria) - `parse-docx-exams.js` + `parse-domande-aperte-structured.js` ⭐
- ✅ **UUID Images → JSON** (domande sparse con immagini) - `parse-uuid-images-exam.js` ⭐
- ✅ **OCR PDF Tool** (estrazione testo + OCR) - `ocr-pdf-exams.js` ⭐
- ✅ **Merge esami** - Unisce tutti gli esami da diverse fonti - `merge-exams.js`

### Componenti UI Specializzati
- ✅ **QuestionCard** - Per domande essay/codice C con editor
- ✅ **MultipleChoiceQuestion** - Per domande V/F e scelta multipla
- ✅ **ImageQuestion** - Per domande con immagini (screenshot, grafici, tabelle)
- ✅ **ExamSimulator** - Routing intelligente tra i componenti basato sul tipo di domanda

## 🚀 Quick Start

```bash
# Installa dipendenze
npm install

# Avvia in sviluppo
npm run dev

# Build per produzione
npm run build

# Parse nuovo materiale
node scripts/parse-exams.js                     # Esami HTML
node scripts/parse-txt-exam.js                  # Esami TXT
node scripts/parse-docx-exams.js                # Estrai DOCX → raw text ⭐
node scripts/parse-domande-aperte-structured.js # Parse DOCX domande aperte ⭐
node scripts/parse-uuid-images-exam.js          # Parse UUID images ⭐
node scripts/ocr-pdf-exams.js pdf               # OCR batch PDF ⭐
node scripts/parse-study-materials.js           # PDF lezioni
node scripts/merge-exams.js                     # Unisci tutti gli esami
```

## 📊 Statistiche Progetto

- **Righe di codice**: ~5,000+ 🚀
- **Componenti React**: 8 (QuestionCard, MultipleChoiceQuestion, ImageQuestion, ExamSimulator, ExamList, StudyMaterials, Home, App)
- **Custom Hooks**: 1 (useLocalStorage)
- **Script parser**: 10 ⭐ (parse-exams, parse-txt-exam, parse-png-exam, parse-so-b-17-06, parse-teoria-so-b-18-06, parse-docx, parse-domande-aperte, parse-uuid, parse-prova-febbraio, ocr-pdf, add-topics, merge-exams)
- **File CSS**: 1200+ righe
- **Tipi TypeScript**: 12+ interfacce
- **Esami integrati**: 22 🚀
- **Domande totali**: 178 🚀
- **Immagini esame**: 83 totali ⭐ (18 SO Appello 14/01, 8 SO B 17/06, 8 Teoria SO B 18/06, 50 UUID misto)
- **PDF teoria**: 11
- **Build size**: 282 kB JS + 15 kB CSS
- **File tracciati da processare**: ~600+ (OCR batch)
- **OCR Tools**: ✅ Installati e pronti (pdf-parse + tesseract.js)

## 🎯 Roadmap Future

### Alta Priorità
- [x] ~~Parser per esami con immagini PNG (SO Appello 14_01)~~ ✅ Completato
- [x] ~~Implementare localStorage per salvare progressi~~ ✅ Completato
- [x] ~~Componente ImageQuestion per visualizzare immagini~~ ✅ Completato
- [x] ~~Parsare altri esami PNG (SO B 17-06-2025, Teoria SO B 18.06.2025)~~ ✅ Completato
- [x] ~~Parser DOCX per domande aperte Corso B~~ ✅ Completato (+13 domande essay)
- [x] ~~Setup OCR tools per PDF~~ ✅ Completato (pdf-parse + tesseract.js)
- [x] ~~Parser UUID images~~ ✅ Completato (+50 domande complete)
- [x] ~~Parser Prova Febbraio 2024~~ ✅ Completato (+15 domande)
- [ ] **OCR batch processing PDF** (154 PDF teoria + esami, ~600 domande potenziali) ⬅️ **PROSSIMO STEP**
- [ ] Aggiungere timer per esami a tempo
- [ ] Export risultati in PDF
- [ ] /Users/andreiadam/Documents/università/Simulatore esami/Sistemi-Operativi-scritto/docs/pdf-esami/foto-esami/Scritto_parte_di_teoria_del_corso_A_di_Sistemi_Operativi_del_27.pdf

### Media Priorità
- [ ] Sistema di flashcard per memorizzazione
- [ ] Modalità "Esame Completo" con timer e punteggio finale
- [ ] Grafici andamento nel tempo
- [x] ~~Integrare materiale di studio organizzato per argomenti~~ ✅ Completato
- [x] ~~Collegare esami agli argomenti con filtri~~ ✅ Completato


### Bassa Priorità
- [ ] Modalità dark mode
- [ ] Supporto multilingua (IT/EN)
- [ ] Condivisione risultati
- [ ] Statistiche avanzate per argomento
