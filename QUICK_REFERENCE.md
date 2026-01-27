# ⚡ Quick Reference - Simulatore Esami SO

**Last Updated:** 26 Gennaio 2026

---

## 📊 Current Status

```
Esami:    20 ✅
Domande:  108 ✅
Immagini: 84 ✅
Build:    282 kB ✅
```

---

## 🚀 Quick Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
```

### Parsing
```bash
node scripts/parse-uuid-images-exam.js          # UUID images
node scripts/parse-domande-aperte-structured.js # DOCX essay
node scripts/ocr-pdf-exams.js pdf [limit]       # OCR batch
node scripts/merge-exams.js                     # Merge all
```

### Verification
```bash
# Check exams count
node -e "console.log(require('./src/data/exams.json').length)"

# Check questions count
node -e "const e=require('./src/data/exams.json'); console.log(e.reduce((s,x)=>s+x.questions.length,0))"

# Count images
find public/exams -type f \( -name "*.png" -o -name "*.jpg" \) | wc -l
```

---

## 📁 Key Files

### Scripts
- `scripts/parse-uuid-images-exam.js` - UUID parser (10/50 done)
- `scripts/ocr-pdf-exams.js` - OCR tool (ready)
- `scripts/merge-exams.js` - Merge all exams

### Data
- `src/data/exams.json` - All exams (20)
- `src/data/exam-uuid-misto.json` - UUID exam (10 Q)
- `src/data/exam-domande-aperte-corso-b.json` - DOCX exam (13 Q)

### Docs
- `docs/UUID_COMPLETION_QUICKSTART.md` - UUID guide
- `docs/OCR_PROCESSING_GUIDE.md` - OCR guide
- `docs/NEXT_STEPS_ROADMAP.md` - Roadmap
- `docs/FINAL_SUMMARY_SESSION.md` - Full summary

---

## 🎯 Next Actions

### 1️⃣ UUID Completion (2-3h) - **RECOMMENDED**
```bash
# Open guide
open docs/UUID_COMPLETION_QUICKSTART.md

# Analyze remaining 40 images
open docs/pdf-esami/foto-esami/<UUID>.jpg

# Add to parser at line ~180
nano scripts/parse-uuid-images-exam.js

# Test and merge
node scripts/parse-uuid-images-exam.js
node scripts/merge-exams.js
npm run build
```
**Result:** 148 domande totali (+40)

### 2️⃣ Prova Febbraio (1.5-2h)
```bash
# Check screenshots
ls "docs/pdf-esami/foto-esami/Prova_febbraio2024/"

# Read template (Part 2)
open docs/pdf-esami/UUID_IMAGES_INTEGRATION_GUIDE.md
```
**Result:** 163 domande totali (+15)

### 3️⃣ OCR Batch (50-60h) - **Long Term**
```bash
# Install converter
brew install poppler

# Test on 1 PDF
pdftoppm -jpeg -r 300 "test.pdf" output

# Run OCR
node scripts/ocr-pdf-exams.js image output-1.jpg

# Read full guide
open docs/OCR_PROCESSING_GUIDE.md
```
**Result:** ~773 domande totali (+600)

---

## 📊 Question Types

| Type | Count | % |
|------|-------|---|
| Essay | 39 | 36% |
| True/False | 34 | 31% |
| Multianswer | 26 | 24% |
| Multiple Choice | 8 | 7% |
| Matching | 1 | 1% |

---

## 🛠️ Parser Template

### Multiple Choice
```javascript
{
  imageFile: "uuid.jpg",
  number: 11,
  text: "Question text...",
  type: "multiple-choice",
  options: [
    { id: "a", text: "...", isCorrect: false },
    { id: "b", text: "...", isCorrect: true },
    { id: "c", text: "...", isCorrect: false },
    { id: "d", text: "...", isCorrect: false }
  ],
  correctAnswer: "b",
  maxPoints: 1,
  negativePoints: 0
}
```

### Multianswer
```javascript
{
  imageFile: "uuid.jpg",
  number: 12,
  text: "Question with statements...",
  type: "multianswer",
  statements: [
    { text: "Statement 1", isCorrect: true },
    { text: "Statement 2", isCorrect: false },
    // ...
  ],
  maxPoints: 2,
  negativePoints: 0
}
```

### Essay
```javascript
{
  imageFile: "uuid.jpg",
  number: 13,
  text: "Open question...",
  type: "essay",
  answer: "Complete answer...",
  maxPoints: 3,
  negativePoints: 0
}
```

---

## 🔍 Troubleshooting

### Build fails
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Images not loading
```bash
# Check path (must be /exams/...)
ls public/exams/uuid-misto/

# Verify imageRef in JSON matches filename
grep imageRef src/data/exam-uuid-misto.json
```

### Parser errors
```bash
# Validate JSON syntax
node scripts/parse-uuid-images-exam.js

# Check merge
node scripts/merge-exams.js
```

---

## 📈 Progress Tracking

### After Each Milestone
```bash
# Update stats
node -e "const e=require('./src/data/exams.json'); console.log('Exams:',e.length,'Questions:',e.reduce((s,x)=>s+x.questions.length,0))"

# Build
npm run build

# Commit
git add .
git commit -m "feat: completed <milestone>"
```

### Update This File
- [ ] Current status numbers
- [ ] Completed milestones (✅)
- [ ] New stima timeline

---

## 🆘 Help & References

**All Documentation:**
```bash
ls docs/*.md
```

**Key Guides:**
- UUID: `docs/UUID_COMPLETION_QUICKSTART.md`
- OCR: `docs/OCR_PROCESSING_GUIDE.md`
- Roadmap: `docs/NEXT_STEPS_ROADMAP.md`
- Summary: `docs/FINAL_SUMMARY_SESSION.md`

**Main README:**
```bash
open README.md
```

---

## 💡 Tips

✅ **Work in batches** (10 questions at a time)
✅ **Test frequently** (after each batch)
✅ **Commit often** (after each milestone)
✅ **Backup parser** before major changes
✅ **Use templates** (copy-paste from existing)

---

## 🎯 Target Milestones

| Milestone | Domande | Timeline | Effort |
|-----------|---------|----------|--------|
| Current | 108 | Today ✅ | - |
| + UUID | 148 | This week | 2-3h |
| + Prova Feb | 163 | Next week | 1.5h |
| + OCR | ~773 | 1-2 months | 50-60h |

---

**Ready to continue! Start with UUID completion for quick +40 questions! 🚀**

---

_For detailed guides, see `docs/` folder_
_For full session summary, see `docs/FINAL_SUMMARY_SESSION.md`_
