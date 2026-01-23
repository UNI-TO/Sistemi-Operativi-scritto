import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsPath = path.join(__dirname, '../docs/struttura-simulatore-esami');
const outputPath = path.join(__dirname, '../src/data/exams.json');

function cleanHTML(html) {
  return html
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<pre>/g, '')
    .replace(/<\/pre>/g, '')
    .replace(/<strong>/g, '**')
    .replace(/<\/strong>/g, '**')
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<ul>/g, '\n')
    .replace(/<\/ul>/g, '')
    .replace(/<li>/g, '- ')
    .replace(/<\/li>/g, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&grave;/g, '`')
    .replace(/ı̀/g, 'ì')
    .replace(/\s+\n/g, '\n')
    .replace(/\n\s+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseExamFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(content);

  // Extract title
  const fullTitle = $('title').text();
  const dateParts = fullTitle.match(/(\d{4}\.\d{2}\.\d{2})/);
  const courseParts = fullTitle.match(/corso ([AB])/);

  if (!dateParts) return null;

  const exam = {
    id: dateParts[1].replace(/\./g, '-'),
    date: dateParts[1],
    course: courseParts ? courseParts[1] : 'A',
    title: fullTitle.split(':')[0],
    questions: []
  };

  // Extract questions - both essay and multianswer types
  const allQueCount = $('div.que').length;

  $('div.que').each((index, element) => {
    const $question = $(element);

    // Skip if not essay or multianswer
    const isEssay = $question.hasClass('essay');
    const isMultianswer = $question.hasClass('multianswer');

    if (!isEssay && !isMultianswer) {
      return;
    }

    const questionNumber = $question.find('span.qno').text();

    // Try to get question text - for multianswer it might be in formulation div
    let questionText = $question.find('div.qtext').html();
    if (!questionText || questionText.trim() === '') {
      // Fallback: get all text from formulation
      questionText = $question.find('div.formulation').html() || '';
    }

    const feedbackText = $question.find('div.generalfeedback').html() || '';
    const gradeText = $question.find('div.grade').text();

    const maxPointsMatch = gradeText.match(/(\d+)/);

    if (questionNumber && questionText && questionText.trim() !== '') {
      const question = {
        number: parseInt(questionNumber),
        text: cleanHTML(questionText),
        answer: cleanHTML(feedbackText),
        maxPoints: maxPointsMatch ? parseInt(maxPointsMatch[1]) : 5,
        type: isEssay ? 'essay' : 'multianswer'
      };

      exam.questions.push(question);
    }
  });

  return exam.questions.length > 0 ? exam : null;
}

function parseAllExams() {
  const files = fs.readdirSync(docsPath)
    .filter(file => file.endsWith('.html') && file.includes('Revisione tentativo'));

  const exams = [];

  files.forEach(file => {
    console.log(`Parsing: ${file}`);
    const exam = parseExamFile(path.join(docsPath, file));
    if (exam) {
      exams.push(exam);
      const essayCount = exam.questions.filter(q => q.type === 'essay').length;
      const multiCount = exam.questions.filter(q => q.type === 'multianswer').length;
      console.log(`  ✓ Found ${exam.questions.length} questions (${essayCount} essay, ${multiCount} quiz)`);
    } else {
      console.log(`  ✗ Failed to parse`);
    }
  });

  // Sort by date
  exams.sort((a, b) => b.date.localeCompare(a.date));

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to JSON
  fs.writeFileSync(outputPath, JSON.stringify(exams, null, 2));
  console.log(`\n✓ Parsed ${exams.length} exams → ${outputPath}`);

  return exams;
}

// Run parser
parseAllExams();
