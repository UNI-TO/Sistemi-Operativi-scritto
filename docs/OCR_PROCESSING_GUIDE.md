# Guida Processing OCR per PDF Esami

**Data:** 26 Gennaio 2026
**Tools installati:** pdf-parse, tesseract.js

---

## ✅ Setup Completato

### Tool Installati

```bash
npm install --save-dev pdf-parse tesseract.js
```

**Packages:**
- `pdf-parse` - Estrazione testo da PDF digitali
- `tesseract.js` - OCR per PDF scansionati e immagini

---

## 📁 Script Creato

**File:** `scripts/ocr-pdf-exams.js`

### Funzionalità

1. **Estrazione testo PDF digitali** - Metodo veloce per PDF con testo selezionabile
2. **OCR per PDF scansionati** - Usa Tesseract per riconoscimento testo da immagini
3. **Batch processing** - Processa multiple PDF in serie
4. **Report generazione** - Salva report JSON con risultati

---

## 🚀 Utilizzo

### 1. Processare PDF (batch)

```bash
# Processa tutti i PDF
node scripts/ocr-pdf-exams.js pdf

# Processa primi 5 PDF
node scripts/ocr-pdf-exams.js pdf 5
```

### 2. Processare singola immagine

```bash
node scripts/ocr-pdf-exams.js image path/to/image.jpg
```

### 3. Help

```bash
node scripts/ocr-pdf-exams.js help
```

---

## 📊 Risultati Test

**PDF testati:** 2 file dal folder `docs/pdf-esami/foto-esami/Esami SO/`

**Risultato:**
- ✓ Text extracted: 0
- ⚠ Requires OCR: 2

**Conclusione:** I PDF disponibili sono **scansionati** e richiedono conversione in immagini per OCR.

---

## 🔄 Workflow per PDF Scansionati

### Step 1: Convertire PDF in immagini

I PDF scansionati devono essere convertiti in immagini prima dell'OCR.

**Opzione A: Usando pdftoppm (Linux/Mac)**
```bash
# Installa poppler-utils (se non presente)
brew install poppler  # Mac
# sudo apt-get install poppler-utils  # Linux

# Converti PDF in immagini JPEG ad alta risoluzione
pdftoppm -jpeg -r 300 input.pdf output_prefix

# Esempio:
pdftoppm -jpeg -r 300 "SO CORSO A 17 lug 2024.pdf" so_corso_a
# Output: so_corso_a-1.jpg, so_corso_a-2.jpg, ...
```

**Opzione B: Usando ImageMagick**
```bash
# Installa ImageMagick
brew install imagemagick  # Mac

# Converti PDF
convert -density 300 input.pdf -quality 100 output_%03d.jpg
```

**Opzione C: Manuale (Preview/Adobe)**
- Apri PDF con Preview (Mac) o Adobe Reader
- Esporta ogni pagina come immagine JPG
- Risoluzione: 300 DPI minimo

### Step 2: Eseguire OCR sulle immagini

```bash
# Processa singola immagine
node scripts/ocr-pdf-exams.js image docs/pdf-esami/images/page-01.jpg

# Per batch di immagini, modificare script per loop sulle immagini
```

### Step 3: Post-processing

Dopo l'OCR:
1. Revisione manuale del testo estratto
2. Correzione errori OCR comuni (caratteri speciali, formule)
3. Identificazione struttura domande
4. Creazione parser specifico per quel formato esame

---

## 📝 Formato Output

### Directory Output
```
src/data/ocr-output/
├── ocr-processing-report.json      # Report con risultati
├── <filename>_extracted.txt        # Testo estratto (PDF digitali)
└── image-ocr-sample.txt            # Sample OCR da immagine
```

### Report JSON Schema
```json
[
  {
    "file": "nome-file",
    "method": "text-extraction" | "requires-ocr",
    "characters": 12345,
    "pages": 5,
    "outputFile": "path/to/output.txt",
    "note": "Optional note"
  }
]
```

---

## ⚠️ Limitazioni e Note

### PDF Esami Disponibili

**Folder:** `docs/pdf-esami/foto-esami/Esami SO/`
**Totale:** 13 PDF files
**Tipo:** Scansionati (non digitali)

**Implicazioni:**
- ❌ Estrazione diretta testo non funziona
- ✅ OCR richiesto dopo conversione immagini
- ⏱️ Processo più lento (1-2 min per pagina con OCR)
- 🔍 Revisione manuale necessaria

### OCR Accuracy

**Fattori che influenzano qualità:**
- Risoluzione immagine (300 DPI raccomandato)
- Qualità scan originale
- Font e dimensione testo
- Presenza formule matematiche/simboli
- Lingua (configurato per italiano)

**Errori comuni OCR:**
- `l` confuso con `1` o `I`
- `O` confuso con `0`
- Caratteri speciali (→, ≥, ≤, etc.)
- Formule matematiche complesse

---

## 🎯 Roadmap OCR Processing

### Priorità 1: Test OCR su Campione
- [ ] Convertire 1 PDF test in immagini
- [ ] Eseguire OCR e valutare qualità
- [ ] Documentare tempo richiesto per pagina
- [ ] Decidere se procedere con batch completo

### Priorità 2: Batch Processing (se qualità OK)
- [ ] Convertire tutti i PDF in immagini (126 PDF teoria)
- [ ] Eseguire OCR batch (può richiedere ore)
- [ ] Post-processing e correzione errori
- [ ] Identificare pattern domande

### Priorità 3: Parser Automatico
- [ ] Analizzare output OCR per identificare strutture
- [ ] Creare parser per diversi formati esame
- [ ] Validazione manuale subset domande
- [ ] Integrazione nel simulatore

---

## 🔧 Troubleshooting

### Error: "pdfParse is not a function"
- **Causa:** pdf-parse è modulo CommonJS, richiede require()
- **Fix:** Usato createRequire() per compatibilità ESM

### OCR molto lento
- **Causa:** Tesseract.js processa in locale
- **Soluzione:** Processare in batch durante la notte
- **Alternative:** Usare Google Cloud Vision API (più veloce, a pagamento)

### Qualità OCR bassa
- **Causa:** Risoluzione immagine bassa
- **Fix:** Aumentare DPI conversione (300+ raccomandato)
- **Alternative:** Pre-processing immagini (contrasto, nitidezza)

---

## 📈 Stima Tempo per Processing Completo

**Scenario:** 126 PDF teoria + 28 PDF esami = **154 PDF totali**

### Step 1: Conversione PDF → Immagini
- Tempo per PDF: ~30 secondi
- Totale: **154 × 30s = 77 minuti** (~1.3 ore)

### Step 2: OCR su Immagini
- Pagine medie per PDF: ~5 pagine
- Tempo OCR per pagina: ~2 minuti
- Totale: **154 × 5 × 2min = 1540 minuti** (~25.7 ore)

### Step 3: Post-Processing
- Revisione e correzione errori OCR
- Identificazione struttura domande
- Stima: **20-30 ore lavoro manuale**

**TOTALE STIMATO: 50-60 ore di processing + validazione**

### Raccomandazione
- Iniziare con **subset di 10 PDF** per validare workflow
- Valutare qualità OCR prima del batch completo
- Considerare alternative (Google Cloud Vision) per scale

---

## ✅ Status Attuale

- [x] Tool OCR installati
- [x] Script base creato
- [x] Test su 2 PDF (identificati come scansionati)
- [x] Documentazione workflow
- [ ] **TODO: Conversione PDF sample in immagini**
- [ ] **TODO: Test OCR su 1-2 pagine campione**
- [ ] **TODO: Valutazione qualità e decisione batch**

---

**Creato:** 26 Gennaio 2026
**Ultima modifica:** 26 Gennaio 2026
**Autore:** Claude Code + Utente
