import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import Tesseract from 'tesseract.js';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfFolder = path.join(__dirname, '../docs/pdf-esami/foto-esami/Esami SO');
const outputDir = path.join(__dirname, '../src/data/ocr-output');

// Crea directory output se non esiste
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Estrae testo da PDF usando pdf-parse
 * Funziona bene per PDF con testo selezionabile
 */
async function extractTextFromPDF(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);

    return {
      text: data.text,
      pages: data.numpages,
      info: data.info,
      success: data.text.trim().length > 0
    };
  } catch (error) {
    console.error(`Error parsing PDF ${path.basename(pdfPath)}:`, error.message);
    return { text: '', pages: 0, success: false };
  }
}

/**
 * Esegue OCR su un'immagine usando Tesseract
 * Usare per PDF scansionati o immagini
 */
async function performOCR(imagePath, lang = 'ita') {
  try {
    console.log(`  Performing OCR on ${path.basename(imagePath)}...`);

    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      lang,
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            process.stdout.write(`\r  Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );

    console.log(''); // New line after progress
    return { text, success: true };
  } catch (error) {
    console.error(`OCR error on ${path.basename(imagePath)}:`, error.message);
    return { text: '', success: false };
  }
}

/**
 * Processa un singolo PDF
 */
async function processPDF(pdfPath) {
  const basename = path.basename(pdfPath, '.pdf');
  console.log(`\nProcessing: ${basename}`);
  console.log('='.repeat(60));

  // Step 1: Prova estrazione testo diretta
  console.log('  Step 1: Attempting direct text extraction...');
  const textExtraction = await extractTextFromPDF(pdfPath);

  if (textExtraction.success && textExtraction.text.length > 100) {
    console.log(`  ✓ Successfully extracted ${textExtraction.text.length} characters`);
    console.log(`  ✓ Pages: ${textExtraction.pages}`);

    // Salva testo estratto
    const outputPath = path.join(outputDir, `${basename}_extracted.txt`);
    fs.writeFileSync(outputPath, textExtraction.text);
    console.log(`  ✓ Saved to: ${outputPath}`);

    return {
      file: basename,
      method: 'text-extraction',
      characters: textExtraction.text.length,
      pages: textExtraction.pages,
      outputFile: outputPath
    };
  }

  // Step 2: Se estrazione fallisce, suggerisci OCR
  console.log('  ⚠ Direct extraction failed or insufficient text');
  console.log('  ℹ This PDF might be scanned. OCR required.');
  console.log('  ℹ To process with OCR, convert PDF to images first:');
  console.log('    - Use: pdftoppm -jpeg -r 300 input.pdf output');
  console.log('    - Then run OCR on images');

  return {
    file: basename,
    method: 'requires-ocr',
    characters: textExtraction.text.length,
    pages: textExtraction.pages,
    note: 'Scanned PDF - requires image conversion and OCR'
  };
}

/**
 * Processa tutti i PDF in una cartella
 */
async function processPDFBatch(folder, limit = null) {
  console.log('🔍 PDF OCR Processing Tool');
  console.log('=' .repeat(60));
  console.log(`Folder: ${folder}`);
  console.log(`Output: ${outputDir}\n`);

  // Trova tutti i PDF
  let pdfFiles = [];
  try {
    const files = fs.readdirSync(folder);
    pdfFiles = files
      .filter(f => f.endsWith('.pdf') && !f.startsWith('.'))
      .map(f => path.join(folder, f));
  } catch (error) {
    console.error(`Error reading folder: ${error.message}`);
    return;
  }

  if (pdfFiles.length === 0) {
    console.log('No PDF files found.');
    return;
  }

  console.log(`Found ${pdfFiles.length} PDF files`);
  if (limit) {
    pdfFiles = pdfFiles.slice(0, limit);
    console.log(`Processing first ${limit} files...`);
  }

  const results = [];

  for (const pdfPath of pdfFiles) {
    const result = await processPDF(pdfPath);
    results.push(result);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));

  const extracted = results.filter(r => r.method === 'text-extraction');
  const needsOCR = results.filter(r => r.method === 'requires-ocr');

  console.log(`Total processed: ${results.length}`);
  console.log(`✓ Text extracted: ${extracted.length}`);
  console.log(`⚠ Requires OCR: ${needsOCR.length}`);

  if (extracted.length > 0) {
    const totalChars = extracted.reduce((sum, r) => sum + r.characters, 0);
    console.log(`  Total characters: ${totalChars.toLocaleString()}`);
  }

  // Salva report
  const reportPath = path.join(outputDir, 'ocr-processing-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Report saved: ${reportPath}`);
}

/**
 * Esempio: Processa singola immagine con OCR
 */
async function processImageExample(imagePath) {
  console.log('📷 Image OCR Example');
  console.log('=' .repeat(60));

  const result = await performOCR(imagePath, 'ita');

  if (result.success) {
    console.log(`\n✓ Extracted ${result.text.length} characters`);
    console.log(`\nFirst 500 characters:`);
    console.log(result.text.substring(0, 500));

    const outputPath = path.join(outputDir, 'image-ocr-sample.txt');
    fs.writeFileSync(outputPath, result.text);
    console.log(`\n✓ Saved to: ${outputPath}`);
  }
}

// Main execution
const args = process.argv.slice(2);
const mode = args[0] || 'help';

switch (mode) {
  case 'pdf':
    // Processa PDF: node scripts/ocr-pdf-exams.js pdf [limit]
    const limit = args[1] ? parseInt(args[1]) : null;
    processPDFBatch(pdfFolder, limit);
    break;

  case 'image':
    // Processa immagine: node scripts/ocr-pdf-exams.js image <path>
    if (!args[1]) {
      console.error('Usage: node scripts/ocr-pdf-exams.js image <image-path>');
      process.exit(1);
    }
    processImageExample(args[1]);
    break;

  case 'help':
  default:
    console.log('📚 PDF OCR Processing Tool - Usage');
    console.log('=' .repeat(60));
    console.log('\nCommands:');
    console.log('  pdf [limit]       - Process PDF files (optional: limit number)');
    console.log('                      Example: node scripts/ocr-pdf-exams.js pdf 5');
    console.log('  image <path>      - Process single image with OCR');
    console.log('                      Example: node scripts/ocr-pdf-exams.js image test.jpg');
    console.log('  help              - Show this help');
    console.log('\nNotes:');
    console.log('  - Text extraction works for digital PDFs');
    console.log('  - Scanned PDFs require image conversion first');
    console.log('  - OCR uses Italian language by default');
    console.log('  - Output saved to: src/data/ocr-output/');
    break;
}
