import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const examsPath = path.join(__dirname, '../src/data/exams.json');
const teoriaSamplePath = path.join(__dirname, '../src/data/exam-teoria-sample.json');
const pngExamPath = path.join(__dirname, '../src/data/exam-so-appello-14-01.json');
const soB1706Path = path.join(__dirname, '../src/data/exam-so-b-17-06-2025.json');
const teoriaSOB1806Path = path.join(__dirname, '../src/data/exam-teoria-so-b-18-06-2025.json');
const domandeApertePath = path.join(__dirname, '../src/data/exam-domande-aperte-corso-b.json');
const uuidMistoPath = path.join(__dirname, '../src/data/exam-uuid-misto.json');
const outputPath = path.join(__dirname, '../src/data/exams.json');

try {
  console.log('Merging exams...\n');

  // Load existing exams
  const exams = JSON.parse(fs.readFileSync(examsPath, 'utf-8'));
  console.log(`✓ Loaded ${exams.length} existing exams`);

  // Load additional exams
  const additionalExams = [];

  // Teoria sample
  if (fs.existsSync(teoriaSamplePath)) {
    const teoriaSample = JSON.parse(fs.readFileSync(teoriaSamplePath, 'utf-8'));
    additionalExams.push(teoriaSample);
    console.log(`✓ Loaded teoria sample: ${teoriaSample.title} (${teoriaSample.questions.length} Q)`);
  }

  // PNG exam
  if (fs.existsSync(pngExamPath)) {
    const pngExam = JSON.parse(fs.readFileSync(pngExamPath, 'utf-8'));
    additionalExams.push(pngExam);
    console.log(`✓ Loaded PNG exam: ${pngExam.title} (${pngExam.questions.length} Q)`);
  }

  // SO B 17-06-2025 exam
  if (fs.existsSync(soB1706Path)) {
    const soB1706 = JSON.parse(fs.readFileSync(soB1706Path, 'utf-8'));
    additionalExams.push(soB1706);
    console.log(`✓ Loaded SO B 17-06: ${soB1706.title} (${soB1706.questions.length} Q)`);
  }

  // Teoria SO B 18-06-2025 exam
  if (fs.existsSync(teoriaSOB1806Path)) {
    const teoriaSOB1806 = JSON.parse(fs.readFileSync(teoriaSOB1806Path, 'utf-8'));
    additionalExams.push(teoriaSOB1806);
    console.log(`✓ Loaded Teoria SO B 18-06: ${teoriaSOB1806.title} (${teoriaSOB1806.questions.length} Q)`);
  }

  // Domande Aperte Corso B exam
  if (fs.existsSync(domandeApertePath)) {
    const domandeAperte = JSON.parse(fs.readFileSync(domandeApertePath, 'utf-8'));
    additionalExams.push(domandeAperte);
    console.log(`✓ Loaded Domande Aperte: ${domandeAperte.title} (${domandeAperte.questions.length} Q)`);
  }

  // UUID Misto exam
  if (fs.existsSync(uuidMistoPath)) {
    const uuidMisto = JSON.parse(fs.readFileSync(uuidMistoPath, 'utf-8'));
    additionalExams.push(uuidMisto);
    console.log(`✓ Loaded UUID Misto: ${uuidMisto.title} (${uuidMisto.questions.length} Q)`);
  }

  // Merge additional exams
  additionalExams.forEach(newExam => {
    const existsIndex = exams.findIndex(e => e.id === newExam.id);
    if (existsIndex >= 0) {
      console.log(`  ⚠ Replacing existing exam: ${newExam.id}`);
      exams[existsIndex] = newExam;
    } else {
      console.log(`  ✓ Adding new exam: ${newExam.id}`);
      exams.push(newExam);
    }
  });

  // Sort by date (newest first)
  exams.sort((a, b) => b.date.localeCompare(a.date));

  // Write back
  fs.writeFileSync(outputPath, JSON.stringify(exams, null, 2));

  console.log(`\n✓ Merged exams saved to ${outputPath}`);
  console.log(`  Total exams: ${exams.length}`);

  // Show breakdown by type
  const typeBreakdown = {};
  exams.forEach(exam => {
    exam.questions.forEach(q => {
      const type = q.type || 'essay';
      typeBreakdown[type] = (typeBreakdown[type] || 0) + 1;
    });
  });

  console.log('\n📊 Question types breakdown:');
  Object.entries(typeBreakdown).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });

} catch (error) {
  console.error('Error merging exams:', error);
}
