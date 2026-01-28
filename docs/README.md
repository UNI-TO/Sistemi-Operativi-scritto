# Documentazione Progetto - Struttura Organizzata

Questa cartella contiene tutta la documentazione del progetto, organizzata per tipo.

## 📁 Struttura delle Cartelle

### 📚 `guide/`
Guide e documentazione tecnica per l'utilizzo e lo sviluppo del progetto:
- **OCR_PROCESSING_GUIDE.md** - Guida per l'elaborazione OCR delle immagini degli esami
- **UUID_COMPLETION_QUICKSTART.md** - Guida rapida per completare gli UUID delle immagini
- **UUID_IMAGES_INTEGRATION_GUIDE.md** - Guida per l'integrazione delle immagini con UUID
- **EXAM_TRACKING_TODO.md** - Lista di tracciamento degli esami da processare
- **ADDITIONAL_EXAMS_ANALYSIS.md** - Analisi degli esami aggiuntivi

### 📊 `project-summaries/`
Riassunti delle sessioni di sviluppo e roadmap del progetto:
- **FINAL_SUMMARY_SESSION.md** - Riassunto finale della sessione di sviluppo
- **SESSION_COMPLETION_SUMMARY.md** - Riassunto di completamento della sessione
- **NEXT_STEPS_ROADMAP.md** - Roadmap e prossimi passi del progetto

### 📄 `pdf-esami/`
PDF degli esami e foto relative:
- File PDF degli esami scritti
- `foto-esami/` - Sottocartella con le foto degli esami (123 file)

### 📖 `pdf-lezioni/`
PDF delle lezioni organizzati per argomento:
- `parteUno-Generalità/` - Introduzione e strutture dei SO
- `parteDue-Tre-Gestione dei processi Sincronizzazione dei processi/` - Processi, Thread, Scheduling e Sincronizzazione
- `parteQuattro-Gestione della memoria (primaria)/` - Memoria centrale e virtuale
- `parteCinque-Gestione della memoria di massa/` - Dischi rigidi, RAID, SSD
- `parteSei-File System/` - Interfaccia e realizzazione del file system

### 🗄️ `archive/`
File archiviati e non più utilizzati attivamente:
- `struttura-simulatore-esami/` - File HTML legacy della struttura del simulatore (16 file HTML del periodo 2020-2024)

## 🔄 Aggiornamenti

**Ultima riorganizzazione:** 28 Gennaio 2026
- Creata struttura organizzata per tipo
- Guide separate dai riassunti di progetto
- PDF mantenuti nelle cartelle originali per compatibilità con il codice
- File HTML legacy archiviati

## 📝 Note

- I PDF nelle cartelle `pdf-esami/` e `pdf-lezioni/` sono referenziati direttamente dal codice dell'applicazione
- Non spostare o rinominare le cartelle PDF senza aggiornare i riferimenti nel codice
- I file in `archive/` sono mantenuti per riferimento storico ma non sono più utilizzati
