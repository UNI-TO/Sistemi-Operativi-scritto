# 🗺️ Next Steps Roadmap - Simulatore Esami SO

**Ultimo aggiornamento:** 26 Gennaio 2026
**Status attuale:** 108 domande operative, 20 esami integrati
**Potenziale:** ~773 domande totali

---

## 📊 Status Corrente

### ✅ Completato
- **20 esami** operativi nel simulatore
- **108 domande** totali (39 essay, 34 V/F, 26 multianswer, 8 multiple-choice, 1 matching)
- **84 immagini** integrate
- **9 parser scripts** funzionanti
- **OCR tools** installati e testati
- **5 guide complete** per expansion

### 🎯 Obiettivo Finale
**~773 domande totali** distribuite su ~50-60 esami

---

## 🚀 Step 1: Completare UUID Remaining [PRIORITÀ ALTA]

**Obiettivo:** Portare esame UUID da 10 a 50 domande (+40 domande)

### Prerequisiti
- ✅ Template parser pronto (`scripts/parse-uuid-images-exam.js`)
- ✅ 50 immagini JPG già copiate in `public/exams/uuid-misto/`
- ✅ Guida completa disponibile (`docs/UUID_COMPLETION_QUICKSTART.md`)

### Processo
1. **Analisi immagini rimanenti** (40 immagini)
   - Aprire ogni immagine JPG
   - Identificare tipo domanda (multiple-choice, multianswer, essay)
   - Estrarre testo, opzioni, risposta corretta
   - Documentare punteggi

2. **Aggiornare parser**
   - Aggiungere dati all'array `questionsData` in `parse-uuid-images-exam.js`
   - Numerazione Q11-Q50

3. **Test e integrazione**
   ```bash
   node scripts/parse-uuid-images-exam.js
   node scripts/merge-exams.js
   npm run build
   npm run dev
   ```

### Stima
- **Tempo:** 2-3 ore (batch approach raccomandato)
- **Output:** +40 domande
- **Difficoltà:** ⭐⭐☆☆☆ (Media - lavoro manuale ma routine)

### Checklist
- [ ] Batch 1: Q11-Q20 (10 domande)
- [ ] Batch 2: Q21-Q30 (10 domande)
- [ ] Batch 3: Q31-Q40 (10 domande)
- [ ] Batch 4: Q41-Q50 (10 domande)
- [ ] Parser eseguito e testato (50 Q totali)
- [ ] Merge completato
- [ ] Build successful
- [ ] Test in simulatore OK

**Al completamento:** 148 domande totali (+37%)

---

## 📸 Step 2: Integrare Prova Febbraio 2024 [PRIORITÀ MEDIA]

**Obiettivo:** Estrarre ~15 domande da 16 screenshot

### Prerequisiti
- ✅ 16 screenshot disponibili in `docs/pdf-esami/foto-esami/Prova_febbraio2024/`
- ✅ Template parser in `docs/pdf-esami/UUID_IMAGES_INTEGRATION_GUIDE.md` (Parte 2)
- ⚠️ Screenshot con domande sovrapposte (scroll page)

### Processo
1. **Analisi screenshot**
   - Aprire 16 screenshot in ordine cronologico
   - Identificare domande uniche (alcune appaiono in multipli screenshot)
   - Estrarre testo completo ogni domanda

2. **Creare parser**
   ```bash
   # Creare nuovo file
   cp scripts/parse-uuid-images-exam.js scripts/parse-prova-febbraio-2024.js
   # Modificare con dati estratti
   ```

3. **Gestire sovrapposizioni**
   - Usare numero domanda come chiave unica
   - Scegliere versione più completa se duplicata

4. **Copiare immagini**
   ```bash
   mkdir -p public/exams/prova-febbraio-2024
   cp docs/pdf-esami/foto-esami/Prova_febbraio2024/*.JPG public/exams/prova-febbraio-2024/
   ```

5. **Test e integrazione**
   ```bash
   node scripts/parse-prova-febbraio-2024.js
   # Aggiungere path al merge-exams.js
   node scripts/merge-exams.js
   npm run build
   ```

### Stima
- **Tempo:** 1.5-2 ore
- **Output:** +15 domande circa
- **Difficoltà:** ⭐⭐⭐☆☆ (Media-Alta - gestire sovrapposizioni)

### Checklist
- [ ] Analisi 16 screenshot completata
- [ ] Identificate domande uniche (~15)
- [ ] Parser creato
- [ ] Immagini copiate
- [ ] Integrato in merge-exams.js
- [ ] Build e test OK

**Al completamento:** 163 domande totali

---

## 🔍 Step 3: OCR Batch Processing PDF [PRIORITÀ BASSA - LUNGO TERMINE]

**Obiettivo:** Estrarre ~600 domande da 154 PDF

### Prerequisiti
- ✅ OCR tools installati (`pdf-parse` + `tesseract.js`)
- ✅ Script `ocr-pdf-exams.js` pronto
- ✅ Guida completa `docs/OCR_PROCESSING_GUIDE.md`
- ⚠️ PDF identificati come scansionati (richiedono conversione immagini)

### Processo

#### Fase 1: Test Pilota (1-2 PDF)
1. **Selezione campione**
   - Scegliere 1-2 PDF rappresentativi
   - Preferibilmente con formati diversi

2. **Conversione PDF → Immagini**
   ```bash
   # Mac/Linux con poppler
   brew install poppler
   pdftoppm -jpeg -r 300 "input.pdf" output_prefix

   # Alternativa con ImageMagick
   brew install imagemagick
   convert -density 300 input.pdf -quality 100 output_%03d.jpg
   ```

3. **Esecuzione OCR**
   ```bash
   node scripts/ocr-pdf-exams.js image output_prefix-1.jpg
   ```

4. **Valutazione qualità**
   - Controllare accuratezza testo estratto
   - Identificare errori comuni (l vs 1, O vs 0)
   - Verificare formule matematiche/simboli
   - Decidere se procedere con batch

#### Fase 2: Batch Processing (se qualità OK)
1. **Conversione massiva**
   ```bash
   # Script bash per convertire tutti i PDF
   for pdf in docs/pdf-esami/foto-esami/Esami\ SO/*.pdf; do
       basename="${pdf%.pdf}"
       pdftoppm -jpeg -r 300 "$pdf" "temp/$(basename "$basename")"
   done
   ```

2. **OCR batch**
   ```bash
   # Processare tutte le immagini generate
   node scripts/ocr-pdf-exams.js pdf
   ```

3. **Post-processing**
   - Revisione output OCR
   - Correzione errori comuni
   - Identificazione pattern domande
   - Creazione parser specifici per formato

4. **Integrazione**
   - Creare JSON exam per ogni PDF processato
   - Aggiungere al merge
   - Test progressivi

### Stima
- **Tempo:** 50-60 ore totali
  - Conversione PDF: ~2 ore
  - OCR processing: ~25 ore
  - Post-processing: ~20 ore
  - Validazione: ~10 ore
- **Output:** +500-600 domande (stima)
- **Difficoltà:** ⭐⭐⭐⭐⭐ (Molto Alta - lungo e richiede validazione)

### Alternative
**Se qualità OCR insufficiente:**
- Google Cloud Vision API (più accurato, a pagamento)
- AWS Textract (simile)
- Digitazione manuale (solo per PDF chiave)

### Checklist Fase 1 (Pilota)
- [ ] Tool conversione PDF installato (poppler/ImageMagick)
- [ ] Convertito 1-2 PDF test
- [ ] Eseguito OCR su campione
- [ ] Valutata qualità output
- [ ] Decisione: procedere o alternative?

### Checklist Fase 2 (Batch) - Solo se Fase 1 OK
- [ ] Script batch conversione creato
- [ ] Tutti PDF convertiti in immagini
- [ ] OCR eseguito su tutte immagini
- [ ] Report OCR generato
- [ ] Post-processing avviato
- [ ] Pattern domande identificati
- [ ] Parser specifici creati
- [ ] Subset integrato e testato
- [ ] Validazione qualità OK

**Al completamento:** ~763 domande totali

---

## 📋 Step 4: Esami Appello 17/07/2024 [OPZIONALE]

**Nota dell'utente:** "ho cercato la domanda multipla del Appello 17_07_2024 ma non ho trovato nulla"

### File Identificati
- `docs/pdf-esami/foto-esami/SO CORSO A 17 lug 2024.pdf` (Corso A)
- `docs/pdf-esami/foto-esami/prova/Appello 17_07_2024 Scritto Teoria Corso B.pdf` (Corso B, 5 pagine)

### Status
- ⚠️ Non ancora processati
- 📄 PDF formato (potrebbero essere scansionati)
- 🔍 Richiede verifica contenuto

### Processo
1. **Verifica formato**
   - Tentare estrazione testo diretta
   - Se fallisce, richiede OCR (vedi Step 3)

2. **Se testo estraibile**
   - Creare parser dedicato
   - Estrarre domande
   - Integrare

3. **Se richiede OCR**
   - Aggiungere alla pipeline Step 3
   - Processare con batch PDF

### Stima
- **Tempo:** 1-2 ore (se testo estraibile), incluso in Step 3 (se OCR)
- **Output:** ~10-20 domande stimate
- **Difficoltà:** ⭐⭐⭐☆☆ (Dipende da formato)

---

## 🎯 Raccomandazione Percorso Ottimale

### Sequenza Consigliata

```
1. [IMMEDIATO] UUID Remaining (2-3h)
   ↓ +40 domande → 148 totali

2. [SHORT-TERM] Prova Febbraio (1.5-2h)
   ↓ +15 domande → 163 totali

3. [OPTIONAL] Appello 17/07 (1-2h)
   ↓ +10-20 domande → 173-183 totali

4. [LONG-TERM] OCR Batch (50-60h)
   ↓ +600 domande → 773-783 totali
```

### Milestone Intermedi

| Milestone | Domande | Esami | Effort | Timeline |
|-----------|---------|-------|--------|----------|
| **Attuale** | 108 | 20 | - | Oggi |
| UUID Complete | 148 | 21 | 2-3h | Questa settimana |
| + Prova Feb | 163 | 22 | 1.5h | Questa settimana |
| + Appello 17/07 | ~178 | 23 | 1-2h | Prossima settimana |
| **Target Short** | **~178** | **23** | **~5h** | **1-2 settimane** |
| + OCR Batch | ~773 | ~50 | 50-60h | Lungo termine |
| **Target Final** | **~773** | **~50** | **~60h** | **1-2 mesi** |

---

## 🛠️ Preparazione Consigliata

### Per UUID (Step 1)
```bash
# Già tutto pronto! Puoi iniziare subito:
open docs/UUID_COMPLETION_QUICKSTART.md
# Segui la guida step-by-step
```

### Per Prova Febbraio (Step 2)
```bash
# Verificare screenshot disponibili
ls -la "docs/pdf-esami/foto-esami/Prova_febbraio2024/"

# Leggere template
open docs/pdf-esami/UUID_IMAGES_INTEGRATION_GUIDE.md
# Vai a "Parte 2: Prova Febbraio 2024"
```

### Per OCR (Step 3)
```bash
# Installare tool conversione PDF (se non presente)
brew install poppler  # Mac
# sudo apt-get install poppler-utils  # Linux

# Leggere guida completa
open docs/OCR_PROCESSING_GUIDE.md

# Test su 1 PDF
pdftoppm -jpeg -r 300 "test.pdf" test_output
node scripts/ocr-pdf-exams.js image test_output-1.jpg
```

---

## 📈 Tracking Progress

### Quick Stats Command
```bash
# Verifica status corrente
node -e "const exams = require('./src/data/exams.json'); console.log('Esami:', exams.length); console.log('Domande:', exams.reduce((s,e) => s + e.questions.length, 0));"

# Build e dimensioni
npm run build
ls -lh dist/assets/

# Immagini totali
find public/exams -type f \( -name "*.png" -o -name "*.jpg" \) | wc -l
```

### Update This Document
Dopo ogni milestone completato, aggiornare:
- [ ] Status corrente (esami, domande)
- [ ] Checklist completate
- [ ] Nuova stima timeline
- [ ] Lessons learned

---

## 🎓 Lessons Learned & Tips

### Da Sessione Precedente
1. **Batch approach** efficace per lavori manuali ripetitivi
2. **Template robusti** risparmiano tempo nelle iterazioni
3. **Test frequenti** prevengono errori cumulativi
4. **Documentazione parallela** essenziale per continuità

### Best Practices
- ✅ Commit dopo ogni milestone
- ✅ Test build prima di integrare
- ✅ Backup parser prima di modifiche massive
- ✅ Validare subset prima batch completo (OCR)

---

## 🆘 Supporto e Reference

### Documentazione Disponibile
- `README.md` - Overview progetto
- `FINAL_SUMMARY_SESSION.md` - Recap sessione completa
- `UUID_COMPLETION_QUICKSTART.md` - Guida UUID rapida
- `OCR_PROCESSING_GUIDE.md` - Guida OCR dettagliata
- `UUID_IMAGES_INTEGRATION_GUIDE.md` - Guida estesa UUID + Prova Feb

### Scripts Key
- `parse-uuid-images-exam.js` - Template UUID
- `ocr-pdf-exams.js` - OCR tool
- `merge-exams.js` - Integrazione finale

### Commands Quick Reference
```bash
# Parsing
node scripts/parse-uuid-images-exam.js
node scripts/parse-prova-febbraio-2024.js  # Da creare
node scripts/ocr-pdf-exams.js pdf

# Integration
node scripts/merge-exams.js

# Build & Test
npm run build
npm run dev
```

---

**Pronto per iniziare! 🚀**

Raccomandazione: **Inizia da Step 1 (UUID Remaining)** per quick win immediato di +40 domande in 2-3 ore!

---

**Creato:** 26 Gennaio 2026
**Ultima modifica:** 26 Gennaio 2026
**Prossimo update:** Dopo completamento UUID
