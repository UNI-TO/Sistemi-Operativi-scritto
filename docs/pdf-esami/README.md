# Esami e Materiali - Struttura Organizzata

Questa cartella contiene tutti i PDF degli esami e i materiali di studio organizzati per categoria.

## 📁 Struttura delle Cartelle

### 📝 `esami-recenti/`
Esami degli ultimi anni (2020-2026), suddivisi per corso:

#### `corso-A/` (23 PDF)
- Scritti di teoria del Corso A
- Esami del 27 gennaio 2026
- Esami del 17 luglio 2024
- Esami del 10 luglio 2024
- Esami del 17 giugno 2025
- Scritti vecchio ordinamento Corso A

#### `corso-B/` (3 PDF)
- Appello 17 luglio 2024 Scritto Teoria Corso B
- Esami Corso B del 17 giugno 2025
- Teoria Corso B del 18 giugno 2025

### 📚 `esami-anni-precedenti/` (63 PDF)
Archivio storico degli esami di Sistemi Operativi - Teoria A:
- Periodo: 2007-2020
- Formato: `YYYYMMDD-sol-teo.pdf`
- Contiene le soluzioni degli scritti di teoria

### 💪 `esercizi/`
Esercizi svolti e materiale di esercitazione (cartella vuota - da popolare)

### 📖 `ripassi-teoria/` (3 PDF)
Materiale per il ripasso della teoria:
- Riassunti completi
- Guide teoriche
- Materiali di studio condensati

### 🖼️ `foto-esami/` (115 immagini)
Immagini originali degli esami:
- Foto scannerizzate degli esami cartacei
- Immagini con nomi UUID (referenziate dal codice dell'applicazione)
- File PNG e JPG
- **IMPORTANTE**: Non modificare o spostare queste immagini - sono referenziate dal codice!

## 🧹 Pulizia Effettuata

La seguente pulizia è stata effettuata il 28 Gennaio 2026:

1. ✅ **Rimossi file duplicati**:
   - File con suffisso "- Copia"
   - File con suffisso "(1)", "(2)"
   - File duplicati con estensioni diverse

2. ✅ **Rimossi file metadata macOS**:
   - File nascosti `._*`
   - File di sistema non necessari

3. ✅ **Rimossi file ZIP** (12 file):
   - I contenuti erano già estratti
   - Eliminati per ridurre spazio e confusione

4. ✅ **Organizzati PDF per categoria**:
   - Da 181 PDF sparsi a struttura organizzata
   - Separazione per corso (A/B)
   - Separazione per periodo (recenti/anni precedenti)

5. ✅ **Rimosse cartelle vuote**:
   - Pulite tutte le directory vuote dopo la riorganizzazione

## 📊 Statistiche

- **Totale PDF organizzati**: 92 PDF
- **Immagini mantenute**: 115 immagini
- **File duplicati rimossi**: ~90 file
- **File ZIP rimossi**: 12 file
- **Spazio risparmiato**: ~25 MB

## 🔗 Collegamenti

Le immagini in `foto-esami/` con nomi UUID sono referenziate nel codice:
- File: `src/data/exams.json`
- Componente: `src/components/QuestionDisplay.tsx`

**Non spostare o rinominare le immagini UUID senza aggiornare i riferimenti nel codice!**

## 📝 Note

- I PDF in questa cartella sono accessibili dall'applicazione web
- Le immagini UUID sono caricate dinamicamente durante la simulazione degli esami
- Gli esami degli anni precedenti (2007-2020) sono mantenuti come archivio storico
