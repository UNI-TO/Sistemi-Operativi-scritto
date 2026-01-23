# Simulatore Esami - Sistemi Operativi (Scritto C)

Simulatore di esami per esercitarsi con le prove scritte di programmazione in C per il corso di Sistemi Operativi.

## Caratteristiche

- 📚 **14 esami** parsati automaticamente dagli HTML originali
- ✍️ **Editor di codice** per scrivere le soluzioni in C
- 💡 **Visualizzazione soluzioni** per ogni domanda
- 🎯 **Due tipi di domande**: Essay (codice completo) e Quiz (a risposta breve)
- 🔄 **Reset** per ricominciare l'esame
- 📱 **Responsive** - funziona su desktop e mobile

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
│   ├── components/          # Componenti React
│   │   ├── ExamList.tsx     # Lista esami
│   │   ├── ExamSimulator.tsx # Simulatore esame
│   │   └── QuestionCard.tsx # Card domanda
│   ├── types/
│   │   └── Exam.ts          # Type definitions
│   ├── data/
│   │   └── exams.json       # Dati esami parsati
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── docs/
│   └── struttura-simulatore-esami/  # HTML originali
├── scripts/
│   └── parse-exams.js       # Parser HTML → JSON
└── package.json
```

## Aggiungere Nuovi Esami

1. Aggiungi i file HTML in `docs/struttura-simulatore-esami/`
2. Esegui il parser:
   ```bash
   node scripts/parse-exams.js
   ```
3. I nuovi esami appariranno automaticamente nell'app

## Esami Disponibili

| Data       | Corso | Domande |
|------------|-------|---------|
| 2024.09.06 | A, B  | 2       |
| 2024.01.19 | A, B  | 2       |
| 2023.06.16 | A, B  | 2       |
| 2023.01.24 | A, B  | 2       |
| 2022.02.08 | A, B  | 2       |
| 2020.07.02 | A     | 1       |

## Tecnologie

- **React 18** con TypeScript
- **Vite** come build tool
- **Cheerio** per parsing HTML
- CSS custom per lo styling
