# 🗺️ Next Steps Roadmap - Simulatore Esami SO

**Ultimo aggiornamento:** 27 Gennaio 2026
**Status attuale:** 163 domande operative, 21 esami integrati ✅
**Potenziale:** ~763 domande totali

---

## 📊 Status Corrente

### ✅ Completato
- **21 esami** operativi nel simulatore ✅
- **163 domande** totali (67 essay, 41 V/F, 35 multianswer, 19 multiple-choice, 1 matching) ✅
- **83 immagini** integrate (18 SO Appello + 8 SO B + 8 Teoria SO B + 50 UUID) ✅
- **10 parser scripts** funzionanti (+ parse-prova-febbraio-2024) ✅
- **OCR tools** installati e testati
- **5 guide complete** per expansion

### 🎯 Obiettivo Finale
**~763 domande totali** distribuite su ~45-50 esami (163 già integrate, ~600 da OCR batch)

---

## ~~🚀 Step 1: Completare UUID Remaining~~ ✅ COMPLETATO

**Obiettivo:** ~~Portare esame UUID da 10 a 50 domande (+40 domande)~~ ✅

### Status
- ✅ **50 domande complete** integrate (Q1-Q50)
- ✅ Parser eseguito con successo
- ✅ Merge completato
- ✅ Build e test OK
- ✅ **Esame UUID Misto operativo** nel simulatore

### Breakdown domande UUID
- 28 multiple-choice
- 3 multianswer
- 19 essay

**Completato:** 163 domande totali (+51% rispetto a 108)

---

## ~~📸 Step 2: Integrare Prova Febbraio 2024~~ ✅ COMPLETATO

**Obiettivo:** ~~Estrarre ~15 domande da 16 screenshot~~ ✅

### Status
- ✅ **15 domande complete** integrate
- ✅ Parser `parse-prova-febbraio-2024.js` creato
- ✅ Integrato in merge-exams.js
- ✅ Build e test OK
- ✅ **Prova Febbraio 2024 operativa** nel simulatore

### Breakdown domande Prova Febbraio
- 11 multiple-choice
- 2 essay
- 2 multianswer

**Completato:** 163 domande totali

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
