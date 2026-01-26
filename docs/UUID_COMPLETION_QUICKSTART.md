# UUID Images - Guida Rapida Completamento

**Status:** 10/50 domande integrate ✅
**Rimanenti:** 40 domande
**Template:** ✅ Pronto in `scripts/parse-uuid-images-exam.js`

---

## 🎯 Obiettivo

Completare l'integrazione delle rimanenti 40 immagini UUID per portare l'esame "Domande Varie - Mix Argomenti" da 10 a 50 domande totali.

---

## 📁 File Coinvolti

**Immagini:** `docs/pdf-esami/foto-esami/*.jpg` (50 totali)
**Script parser:** `scripts/parse-uuid-images-exam.js`
**Output:** `src/data/exam-uuid-misto.json`
**Immagini pubbliche:** `public/exams/uuid-misto/` (già copiate ✅)

---

## 🚀 Processo Step-by-Step

### Step 1: Lista Immagini da Processare

**Già processate (10):**
- ✅ 01adf582-af9e-445f-a475-257aeddc19df.jpg (Q1 - Unix link counter)
- ✅ 021d8651-e6da-42e0-8443-50af80bc1ba2.jpg (Q2 - TLB multianswer)
- ✅ 10ef6b5b-b45f-45ef-85cf-262b6c798d46.jpg (Q3 - Librerie dinamiche)
- ✅ 11662c51-07bd-45f3-a64c-703a89e78f14.jpg (Q4 - Scheduling GANTT)
- ✅ 13732e96-d264-4a78-b451-fa3da2c0a70a.jpg (Q5 - Paginazione PT size)
- ✅ 1902c104-7d38-4ed6-a2b7-ad2c556852f5.jpg (Q6 - TLB eat calculation)
- ✅ 1cab96b6-41ae-460a-81be-fbae43957f1e.jpg (Q7 - Codice C array)
- ✅ 26fc8f2f-59e7-4b1f-96f3-abcb63bf61d7.jpg (Q8 - Seconda chance algorithm)
- ✅ 3395c851-c25e-43cf-a9ea-ee6c624da2f6.jpg (Q9 - Inverted Page Table)
- ✅ 368d187d-dae2-4cdc-8e6b-ec037d3f4332.jpg (Q10 - RAID accesso lettura)

**Da processare (40 rimanenti):**
```bash
cd docs/pdf-esami/foto-esami
ls *.jpg | grep -v -E "(01adf582|021d8651|10ef6b5b|11662c51|13732e96|1902c104|1cab96b6|26fc8f2f|3395c851|368d187d)"
```

---

## ✍️ Step 2: Estrarre Dati da Immagini

Per ogni immagine rimanente:

### 2.1 Aprire l'immagine
```bash
open docs/pdf-esami/foto-esami/<UUID>.jpg
```

### 2.2 Estrarre informazioni

**Dati da identificare:**
1. **Numero domanda** (es: "Domanda 8", "Domanda 11")
2. **Tipo domanda:**
   - `multiple-choice` → 4 opzioni a/b/c/d
   - `multianswer` → Multiple affermazioni V/F
   - `essay` → Risposta aperta / codice
3. **Testo domanda completo**
4. **Opzioni** (se multiple-choice):
   - id: "a", "b", "c", "d"
   - text: testo completo opzione
   - isCorrect: true/false
5. **Statements** (se multianswer):
   - text: affermazione
   - isCorrect: true/false
6. **Risposta corretta** marcata nell'immagine
7. **Punteggio** (maxPoints, negativePoints)

### 2.3 Template Dati

**Multiple Choice Example:**
```javascript
{
  imageFile: "UUID.jpg",
  number: 11, // Progressivo 11-50
  text: "Testo completo domanda qui...",
  type: "multiple-choice",
  options: [
    { id: "a", text: "Opzione A...", isCorrect: false },
    { id: "b", text: "Opzione B...", isCorrect: true },  // ✓ Marcata corretta
    { id: "c", text: "Opzione C...", isCorrect: false },
    { id: "d", text: "Opzione D...", isCorrect: false }
  ],
  correctAnswer: "b",
  maxPoints: 1,
  negativePoints: 0
}
```

**Multianswer V/F Example:**
```javascript
{
  imageFile: "UUID.jpg",
  number: 12,
  text: "Domanda con più affermazioni da valutare V/F...",
  type: "multianswer",
  statements: [
    { text: "Prima affermazione...", isCorrect: false },
    { text: "Seconda affermazione...", isCorrect: true },
    { text: "Terza affermazione...", isCorrect: false },
    { text: "Quarta affermazione...", isCorrect: true },
    { text: "Quinta affermazione...", isCorrect: true }
  ],
  maxPoints: 2,
  negativePoints: 0
}
```

**Essay Example:**
```javascript
{
  imageFile: "UUID.jpg",
  number: 13,
  text: "Domanda teorica o codice C...",
  type: "essay",
  answer: "Risposta completa o descrizione soluzione...",
  maxPoints: 3,
  negativePoints: 0,
  explanation: "Note aggiuntive se presenti"
}
```

---

## 📝 Step 3: Aggiungere al Parser

Aprire `scripts/parse-uuid-images-exam.js` e aggiungere le nuove domande all'array `questionsData`:

```javascript
const questionsData = [
  // ... 10 domande esistenti (non modificare)

  // NUOVE DOMANDE DA AGGIUNGERE QUI:
  {
    imageFile: "3da2b583-773f-461f-afdb-023bddacd2d2.jpg",
    number: 11,
    text: "...",
    type: "multiple-choice",
    // ... resto dei dati
  },
  {
    imageFile: "472f4c7c-360e-47e3-9ecd-e610e2c83afb.jpg",
    number: 12,
    text: "...",
    type: "multianswer",
    // ... resto dei dati
  },
  // ... continua fino a number: 50
];
```

---

## 🔄 Step 4: Rigenerare e Testare

### 4.1 Eseguire Parser
```bash
node scripts/parse-uuid-images-exam.js
```

**Output atteso:**
```
✅ SUCCESS!
📝 Created: exam-uuid-misto.json
📊 Questions: 50 domande estratte
💯 Total points: ~65
```

### 4.2 Merge con Altri Esami
```bash
node scripts/merge-exams.js
```

### 4.3 Build e Test
```bash
npm run build
npm run dev
```

Verificare nel simulatore:
- Naviga a "Esami"
- Cerca "Domande Varie - Mix Argomenti"
- Verifica che ci siano 50 domande
- Testa alcune domande per confermare funzionamento

---

## 💡 Tips per Velocizzare

### Batch Processing
Processa immagini in lotti di 10:
1. **Lotto 1:** Domande 11-20 (immagini 11-20)
2. **Lotto 2:** Domande 21-30 (immagini 21-30)
3. **Lotto 3:** Domande 31-40 (immagini 31-40)
4. **Lotto 4:** Domande 41-50 (immagini 41-50)

Dopo ogni lotto:
- Aggiungi al parser
- Testa con `node scripts/parse-uuid-images-exam.js`
- Commit se tutto OK

### Pattern Comuni Identificati

**Tipo domanda da indicatori:**
- "Scegli un'alternativa" / "a. b. c. d." → `multiple-choice`
- "Vero o Falso" / "Dire se veri o falsi" → `multianswer`
- "Completare il codice" / "Spiegare" → `essay`

**Punteggi tipici:**
- Multiple choice semplice: 1 punto
- Multiple choice complessa: 2 punti
- Multianswer (5 affermazioni): 2 punti
- Essay: 1-3 punti

**Indicatori risposta corretta:**
- ✓ segno di spunta verde
- Opzione evidenziata in verde
- "Risposta corretta è..."
- "Parzialmente corretta" (multianswer con errori)

---

## ⏱️ Stima Tempo

**Per immagine:** ~3-4 minuti
- Apertura e lettura: 1 min
- Estrazione dati: 1-2 min
- Formattazione JSON: 1 min

**Totale 40 immagini:** ~2.5-3 ore

**Con batch approach:**
- 4 sessioni × 45 min = 3 ore distribuite

---

## ✅ Checklist Completamento

### Prima di iniziare
- [ ] Verificare che tutte le 50 immagini siano in `public/exams/uuid-misto/`
- [ ] Backup del file `scripts/parse-uuid-images-exam.js`
- [ ] Lista delle 40 immagini da processare generata

### Durante processing
- [ ] Lotto 1 completato (Q11-20)
- [ ] Lotto 2 completato (Q21-30)
- [ ] Lotto 3 completato (Q31-40)
- [ ] Lotto 4 completato (Q41-50)

### Dopo completamento
- [ ] Parser eseguito con successo (50 domande)
- [ ] Merge completato
- [ ] Build successful
- [ ] Test in simulatore OK
- [ ] Commit e push

---

## 🆘 Troubleshooting

**Errore: "imageFile not found"**
- Verifica nome file UUID esatto (case-sensitive)
- Controlla che immagine sia in `public/exams/uuid-misto/`

**Parser fallisce**
- Syntax error JSON: verifica virgole, parentesi, quotes
- Usa JSON validator online se necessario

**Domanda non appare**
- Verifica che `number` sia univoco (1-50)
- Controlla che tipo sia valido (`multiple-choice`, `multianswer`, `essay`)

**Immagine non carica**
- Path corretto: `/exams/uuid-misto/<UUID>.jpg`
- File presente in `public/exams/uuid-misto/`

---

## 📚 Riferimenti

- **Template completo:** `scripts/parse-uuid-images-exam.js` (lines 21-182)
- **Guida dettagliata:** `docs/pdf-esami/UUID_IMAGES_INTEGRATION_GUIDE.md`
- **Esempi domande:** Prime 10 domande nel parser (già complete)

---

**Creato:** 26 Gennaio 2026
**Ultimo aggiornamento:** 26 Gennaio 2026
**Status:** 10/50 completate, template pronto
