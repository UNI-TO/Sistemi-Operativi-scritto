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
const provaFebbraioPath = path.join(__dirname, '../src/data/exam-prova-febbraio-2024.json');
const esame27TeoriaPath = path.join(__dirname, '../src/data/exam-esame27-teoria.json');
const esame03Path = path.join(__dirname, '../src/data/exam-esame03.json');
const esame04Path = path.join(__dirname, '../src/data/exam-esame04.json');
const esame00Path = path.join(__dirname, '../src/data/exam-esame00.json');
const esame01Path = path.join(__dirname, '../src/data/exam-esame01.json');
const esame02Path = path.join(__dirname, '../src/data/exam-esame02.json');
const esame1007Path = path.join(__dirname, '../src/data/exam-10-07-corso-a.json');
const esame1007BisPath = path.join(__dirname, '../src/data/exam-10-07-bis.json');
const scritto8Feb2022Path = path.join(__dirname, '../src/data/exam-scritto-8-febbraio-2022.json');
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

  // Prova Febbraio 2024 exam
  if (fs.existsSync(provaFebbraioPath)) {
    const provaFebbraio = JSON.parse(fs.readFileSync(provaFebbraioPath, 'utf-8'));
    additionalExams.push(provaFebbraio);
    console.log(`✓ Loaded Prova Febbraio: ${provaFebbraio.title} (${provaFebbraio.questions.length} Q)`);
  }

  // Esame 27 Gennaio 2026 Teoria exam
  if (fs.existsSync(esame27TeoriaPath)) {
    const esame27Teoria = JSON.parse(fs.readFileSync(esame27TeoriaPath, 'utf-8'));
    additionalExams.push(esame27Teoria);
    console.log(`✓ Loaded Esame 27 Gen 2026: ${esame27Teoria.title} (${esame27Teoria.questions.length} Q)`);
  }

  // Esame03 Teoria exam
  if (fs.existsSync(esame03Path)) {
    const esame03 = JSON.parse(fs.readFileSync(esame03Path, 'utf-8'));
    additionalExams.push(esame03);
    console.log(`✓ Loaded Esame03: ${esame03.title} (${esame03.questions.length} Q)`);
  }

  // Esame04 Teoria exam
  if (fs.existsSync(esame04Path)) {
    const esame04 = JSON.parse(fs.readFileSync(esame04Path, 'utf-8'));
    additionalExams.push(esame04);
    console.log(`✓ Loaded Esame04: ${esame04.title} (${esame04.questions.length} Q)`);
  }

  // Esame00 Teoria exam
  if (fs.existsSync(esame00Path)) {
    const esame00 = JSON.parse(fs.readFileSync(esame00Path, 'utf-8'));
    additionalExams.push(esame00);
    console.log(`✓ Loaded Esame00: ${esame00.title} (${esame00.questions.length} Q)`);
  }

  // Esame01 Teoria exam
  if (fs.existsSync(esame01Path)) {
    const esame01 = JSON.parse(fs.readFileSync(esame01Path, 'utf-8'));
    additionalExams.push(esame01);
    console.log(`✓ Loaded Esame01: ${esame01.title} (${esame01.questions.length} Q)`);
  }

  // Esame02 Teoria exam
  if (fs.existsSync(esame02Path)) {
    const esame02 = JSON.parse(fs.readFileSync(esame02Path, 'utf-8'));
    additionalExams.push(esame02);
    console.log(`✓ Loaded Esame02: ${esame02.title} (${esame02.questions.length} Q)`);
  }

  // Esame 10/07 Corso A
  if (fs.existsSync(esame1007Path)) {
    const esame1007 = JSON.parse(fs.readFileSync(esame1007Path, 'utf-8'));
    additionalExams.push(esame1007);
    console.log(`✓ Loaded Esame 10/07: ${esame1007.title} (${esame1007.questions.length} Q)`);
  }

  // Esame 10/07 Bis
  if (fs.existsSync(esame1007BisPath)) {
    const esame1007Bis = JSON.parse(fs.readFileSync(esame1007BisPath, 'utf-8'));
    additionalExams.push(esame1007Bis);
    console.log(`✓ Loaded Esame 10/07 Bis: ${esame1007Bis.title} (${esame1007Bis.questions.length} Q)`);
  }

  // Scritto 8 Febbraio 2022
  if (fs.existsSync(scritto8Feb2022Path)) {
    const scritto8Feb = JSON.parse(fs.readFileSync(scritto8Feb2022Path, 'utf-8'));
    additionalExams.push(scritto8Feb);
    console.log(`✓ Loaded Scritto 8 Feb 2022: ${scritto8Feb.title} (${scritto8Feb.questions.length} Q)`);
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
