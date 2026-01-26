# Simulatore Esami - Sistemi Operativi (Scritto C)

Simulatore di esami per esercitarsi con le prove scritte di programmazione in C per il corso di Sistemi Operativi. Include sia esercizi pratici che materiale teorico organizzato per argomenti.

## Caratteristiche

### Esami
- 📚 **16 esami** parsati automaticamente (14 HTML + 1 TXT + 1 PNG con immagini)
- ✍️ **Editor di codice** per scrivere le soluzioni in C
- 🖼️ **Supporto immagini** - visualizza domande con screenshot ed esercizi grafici
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
│       └── so-appello-14-01/         # Immagini esame PNG
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
│   ├── parse-exams.js           # Parser HTML → JSON esami
│   ├── add-exam-topics.js       # Aggiunge tag argomenti agli esami
│   └── parse-study-materials.js # Parser materiale di studio
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

**Totale**: 16 esami, **61 domande** (21 essay C, 20 vero/falso, 19 quiz, 1 matching)

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

### Esami Già Integrati (16 totali, 61 domande)
- **14 esami HTML** parsati (2020-2024) - programmazione C (21 domande essay)
- **1 esame teoria TXT** con domande multiple (11 domande):
  - 9 domande Vero/Falso
  - 1 domanda a risposta breve
  - 1 domanda di Associazione
- **1 esame teoria PNG** - SO Appello 14/01/2025 (17 domande):
  - 11 domande Vero/Falso (2 punti, -1 se sbagliato)
  - 6 domande multiple (3 punti, -1.5 se sbagliato)
  - Punteggio massimo: 33 punti

### Materiale da Processare (~250+ file)
Vedi `docs/pdf-esami/EXAM_TRACKING_TODO.md` per la lista completa di:
- 66 PDF teoria anni precedenti (2007-2020)
- Esami con immagini PNG/JPG organizzate
- PDF teoria recenti (2024-2025)
- File TXT con soluzioni

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
1. **Essay** (💻 Codice C completo) - 21 domande
2. **Multianswer** (📝 Risposta breve) - 19 domande
3. **True/False** (✓/✗ Vero o Falso) - 20 domande
4. **Multiple Choice** (🔘 Scelta multipla) - Pronto per l'uso
5. **Matching** (🔗 Associazione) - 1 domanda

**Totale: 61 domande** su 16 esami

### Parser Implementati
- ✅ **HTML → JSON** (14 esami programmazione C) - `parse-exams.js`
- ✅ **TXT → JSON** (esami teoria con V/F, scelta multipla, associazione) - `parse-txt-exam.js`
- ✅ **PNG + Soluzioni.txt → JSON** (esami teoria con immagini) - `parse-png-exam.js`
- ✅ **Merge esami** - Unisce tutti gli esami da diverse fonti - `merge-exams.js`
- 📋 TODO: PDF → JSON (66 esami teoria 2007-2020) con OCR

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
node scripts/parse-exams.js           # Esami HTML
node scripts/parse-txt-exam.js        # Esami TXT
node scripts/parse-study-materials.js # PDF lezioni
node scripts/merge-exams.js           # Unisci tutti gli esami
```

## 📊 Statistiche Progetto

- **Righe di codice**: ~4000+
- **Componenti React**: 8 (QuestionCard, MultipleChoiceQuestion, ImageQuestion, ExamSimulator, ExamList, StudyMaterials, Home, App)
- **Custom Hooks**: 1 (useLocalStorage)
- **Script parser**: 5 (parse-exams, parse-txt-exam, parse-png-exam, add-exam-topics, merge-exams)
- **File CSS**: 1200+ righe
- **Tipi TypeScript**: 12+ interfacce
- **Esami integrati**: 16
- **Domande totali**: 61
- **Immagini esame**: 18 PNG (SO Appello 14/01)
- **PDF teoria**: 11
- **File tracciati da processare**: ~250+

## 🎯 Roadmap Future

### Alta Priorità
- [x] ~~Parser per esami con immagini PNG (SO Appello 14_01)~~ ✅ Completato
- [x] ~~Implementare localStorage per salvare progressi~~ ✅ Completato
- [x] ~~Componente ImageQuestion per visualizzare immagini~~ ✅ Completato
- [ ] Aggiungere timer per esami a tempo
- [ ] Export risultati in PDF
- [ ] Parsare altri esami PNG (esame SO B 17-06-2025, Teoria SO corso B 18.06.2025)

### Media Priorità
- [ ] Parser PDF con OCR per esami scansionati
- [ ] Sistema di flashcard per memorizzazione
- [ ] Modalità "Esame Completo" con timer e punteggio finale
- [ ] Grafici andamento nel tempo

### Bassa Priorità
- [ ] Modalità dark mode
- [ ] Supporto multilingua (IT/EN)
- [ ] Condivisione risultati
- [ ] Statistiche avanzate per argomento
