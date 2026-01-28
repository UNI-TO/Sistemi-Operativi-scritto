# Analisi Esami Aggiuntivi - Materiale Disponibile

## 📊 Stato Attuale

**Esami Integrati:** 18 esami, 85 domande totali
- 14 esami HTML (programmazione C)
- 1 esame TXT (teoria)
- 3 esami PNG organizzati (SO Appello 14/01, SO B 17/06, Teoria SO B 18/06)

---

## 🎯 Materiale PNG/JPG Pronto per l'Integrazione

### 1. Prova_febbraio2024 (16 screenshot JPG)

**Percorso:** `docs/pdf-esami/foto-esami/Prova_febbraio2024/`

**Caratteristiche:**
- Piattaforma: EzamEsami (esami.i-learn.unito.it)
- Data esame: 10 Febbraio 2025 (Prova)
- Formato: Screenshot browser con multipli domande per immagine
- Punteggio visibile: 6/30 (16.67%)
- Tempo: 59 minuti

**Tipi di domande identificati:**
1. **Domanda 1**: Multiple choice su paginazione memoria (4 opzioni a-d)
2. **Domanda 2**: Multiple choice su hard disk e blocchi (risposta corretta: 48 Kilobyte)
3. **Domanda 3**: Scheduling con tabella processi (risposta corretta)
4. Altre domande da analizzare nei rimanenti 13 screenshot

**Complessità di parsing:**
- ⚠️ **Alta**: Multipli domande per screenshot
- ⚠️ Necessita lettura manuale o OCR per estrarre tutte le domande
- ⚠️ Alcune domande sono parzialmente visibili

**Stima domande totali:** 10-15 domande

---

### 2. Immagini UUID Sparse (55 file JPG)

**Percorso:** `docs/pdf-esami/foto-esami/*.jpg` (root folder)

**Formato nomi:** UUID casuale (es: `01adf582-af9e-445f-a475-257aeddc19df.jpg`)

**Caratteristiche:**
- Piattaforma: EzamEsami
- Formato: Domanda singola per immagine
- Stato: Già completate con risposta corretta/errata visibile
- Organizzazione: ❌ Nessuna (impossibile determinare a quale esame appartengono)

**Tipi di domande identificati:**

1. **Domanda 8** (`01adf582-af9e-445f-a475-257aeddc19df.jpg`)
   - Tipo: Multiple choice (4 opzioni)
   - Argomento: Unix link commands
   - Risposta: comando 3) `mkdir Z`
   - Punteggio: 0.0/1.0 (risposta errata)

2. **Domanda 11** (`021d8651-e6da-42e0-8443-50af80bc1ba2.jpg`)
   - Tipo: Multianswer (5 affermazioni V/F)
   - Argomento: TLB (Translation Lookaside Buffer)
   - Parametri: accesso RAM 200 unità, hit ratio 90%, accesso TLB 10 unità
   - Punteggio: 1.60/2.00 (parzialmente corretta)
   - Risposte: F-V-F-F-V (con 1 errore sulla 4a affermazione)

3. **Domanda programmazione** (`corretto.jpg`)
   - Tipo: Multiple choice (3 opzioni)
   - Argomento: Analisi codice C (puntatori)
   - Tempo: 2 minuti stimati
   - Opzioni: corretto / errore compilazione / segmentation fault

**Complessità di parsing:**
- ✅ **Media**: Una domanda per immagine (chiaro)
- ⚠️ Nomi UUID rendono impossibile raggruppare per esame
- ✅ Soluzioni già visibili nelle immagini

**Possibile approccio:**
- Creare "Esame Misto - Domande Varie" con tutte le 55 domande
- Organizzare per argomento invece che per data esame
- Ogni immagine diventa una domanda indipendente

**Stima:** 55 domande totali

---

## 📋 Altri Materiali Disponibili

### 3. SCRITTI SO TEORIA-A ANNI PRECEDENTI (126+ PDF)

**Percorso:** `docs/pdf-esami/foto-esami/SCRITTI SO TEORIA-A ANNI PRECEDENTI/`

**Caratteristiche:**
- Formato: PDF con soluzioni complete
- Anni: 2007-2020
- Nomenclatura: `YYYYMMDDsol-teo.pdf` o `sol-completo.pdf`
- Esempio: `20070713sol-teo.pdf`, `20130131sol-completo.pdf`

**Richiede:**
- ❌ OCR (Optical Character Recognition)
- Tool suggerito: Tesseract, Adobe PDF Extract, o pdf2image + Tesseract

**Contenuto stimato:** 500+ domande teoria

---

### 4. Esami SO (28 PDF vari)

**Percorso:** `docs/pdf-esami/foto-esami/Esami SO/`

**Files principali:**
- `SISTEMI OPERATIVI.pdf` (259 KB)
- `SO CORSO A 17 lug 2024.pdf` (510 KB)
- `esame00.pdf` - `esame04.pdf` (serie numerata)
- `esame10_07.pdf`

**Richiede:**
- ❌ OCR per estrarre testo e domande

---

### 5. esami_vecchi_corsoB (2 DOCX)

**Percorso:** `docs/pdf-esami/foto-esami/esami_vecchi_corsoB/`

**Files:**
1. `domande_aperte.docx` (203 KB)
2. `domande_chiuse.docx` (13.2 MB) ⚠️ **Molto grande!**

**Richiede:**
- Parser DOCX (mammoth.js o docx4js)
- Probabile contenuto: Centinaia di domande

**Stima:** 200-500+ domande

---

## 🚀 Roadmap Integrazione

### Fase 1: Quick Wins (Già Completato ✅)
- [x] SO Appello 14/01/2025 (17 domande)
- [x] SO B 17/06/2025 (12 domande)
- [x] Teoria SO B 18/06/2025 (12 domande)

### Fase 2: Immagini Pronte (Priorità Alta)
- [ ] **55 immagini UUID** - Creare "Esame Misto Domande Varie"
  - Parser manuale: leggere ogni immagine, estrarre domanda e soluzione
  - Stimato: 2-3 ore lavoro manuale
  - Output: +55 domande

- [ ] **Prova_febbraio2024** - 16 screenshot
  - Parser manuale: analizzare screenshots sovrapposti
  - Stimato: 1-2 ore lavoro manuale
  - Output: +10-15 domande

### Fase 3: DOCX Files (Priorità Media)
- [ ] Parser DOCX per esami_vecchi_corsoB
  - Tool: mammoth.js
  - Stimato: +200-500 domande

### Fase 4: OCR PDF (Priorità Bassa)
- [ ] OCR per SCRITTI SO TEORIA-A (126 PDF)
  - Tool: Tesseract OCR
  - Stimato: +500+ domande

- [ ] OCR per Esami SO (28 PDF)
  - Stimato: +100-200 domande

---

## 📈 Potenziale Totale

**Attuale:** 85 domande (18 esami)

**Con Fase 2 (immagini pronte):** 85 + 55 + 15 = **~155 domande** (20 esami)

**Con Fase 3 (DOCX):** ~155 + 300 = **~455 domande** (22 esami)

**Con Fase 4 (OCR PDF):** ~455 + 600 = **~1055 domande totali!** (150+ esami)

---

## 🛠️ Tool Necessari per Espansione Completa

### Per Immagini (Fase 2)
- ✅ Già disponibile: Read tool per analisi manuale
- ✅ ImageQuestion.tsx component già implementato
- Manual labor: Lettura e trascrizione

### Per DOCX (Fase 3)
```bash
npm install mammoth
# oppure
npm install docx4js
```

### Per OCR PDF (Fase 4)
```bash
npm install pdf-parse tesseract.js
# oppure
npm install @google-cloud/vision  # Cloud Vision API
```

---

## 💡 Raccomandazioni

1. **Priorità immediata:** Completare Fase 2 (immagini)
   - ROI alto: 70 nuove domande con 3-5 ore lavoro
   - Nessun tool aggiuntivo necessario

2. **Medio termine:** DOCX parsing (Fase 3)
   - Aggiunge 300+ domande
   - Richiede libreria ma processo automatizzato

3. **Lungo termine:** OCR PDF (Fase 4)
   - Massimo valore: 600+ domande
   - Più complesso ma massima copertura storica (2007-2020)

---

## 📝 Note Tecniche

### Sfide Identificate

**Prova_febbraio2024:**
- Screenshot sovrapposti con scroll page
- Alcune domande parzialmente visibili
- Necessita ricostruzione ordine corretto

**Immagini UUID:**
- Nomi file non informativi
- Impossibile determinare esame originale
- Soluzione: aggregare in "esame misto" tematico

**PDFs:**
- Qualità scansione variabile (2007-2020)
- Layout non uniforme
- OCR richiede post-processing e validazione manuale

---

**Data analisi:** 26 Gennaio 2026
**Analizzato da:** Claude Code
**Stato:** In attesa di decisione su prossimi step
