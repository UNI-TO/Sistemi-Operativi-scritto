# Simulatore Esami - Sistemi Operativi (Scritto C)

Simulatore di esami per esercitarsi con le prove scritte di programmazione in C per il corso di Sistemi Operativi. Include sia esercizi pratici che materiale teorico organizzato per argomenti.

## Caratteristiche

### Esami
- 📚 **14 esami** parsati automaticamente dagli HTML originali
- ✍️ **Editor di codice** per scrivere le soluzioni in C
- 💡 **Visualizzazione soluzioni** per ogni domanda
- 🎯 **Due tipi di domande**: Essay (codice completo) e Quiz (a risposta breve)
- 🏷️ **Tag argomenti** - ogni esame è collegato agli argomenti trattati
- 🔍 **Filtri per argomento** - trova esami su specifici topic
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
│   ├── components/              # Componenti React
│   │   ├── ExamList.tsx         # Lista esami con filtri
│   │   ├── ExamSimulator.tsx    # Simulatore esame
│   │   ├── QuestionCard.tsx     # Card domanda
│   │   └── StudyMaterials.tsx   # Materiale di studio
│   ├── types/
│   │   └── Exam.ts              # Type definitions + argomenti
│   ├── data/
│   │   ├── exams.json           # Dati esami parsati
│   │   └── study-materials.json # Materiale di studio
│   ├── App.tsx                  # Router principale
│   ├── App.css                  # Stili completi
│   └── main.tsx
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

| Data       | Corso | Domande |
|------------|-------|---------|
| 2024.09.06 | A, B  | 2       |
| 2024.01.19 | A, B  | 2       |
| 2023.06.16 | A, B  | 2       |
| 2023.01.24 | A, B  | 2       |
| 2022.02.08 | A, B  | 2       |
| 2020.07.02 | A     | 1       |

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
   - Scrivi le tue soluzioni nell'editor
   - Confronta con le soluzioni ufficiali
3. **Teoria**:
   - Consulta il materiale diviso per argomento
   - Clicca su "Vedi Esami" per praticare quell'argomento
