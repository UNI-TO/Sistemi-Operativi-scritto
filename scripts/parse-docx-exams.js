import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docxFolder = path.join(__dirname, '../docs/pdf-esami/foto-esami/esami_vecchi_corsoB');
const outputDir = path.join(__dirname, '../src/data');

async function parseDocx(filePath) {
  console.log(`\nParsing: ${path.basename(filePath)}...`);

  try {
    const result = await mammoth.extractRawText({ path: filePath });
    const text = result.value;

    console.log(`✓ Extracted ${text.length} characters`);
    console.log(`  First 500 chars preview:`);
    console.log(`  ${text.substring(0, 500)}...\n`);

    return text;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

async function analyzeDomandeChiuse() {
  const filePath = path.join(docxFolder, 'domande_chiuse.docx');
  const text = await parseDocx(filePath);

  if (!text) return;

  // Analyze structure
  const lines = text.split('\n').filter(l => l.trim());
  console.log(`📊 Statistics for domande_chiuse.docx:`);
  console.log(`  Total lines: ${lines.length}`);
  console.log(`  Total characters: ${text.length}`);

  // Try to identify questions pattern
  const questionPatterns = [
    /^Domanda\s+\d+/i,
    /^\d+\./,
    /^Q\d+/i,
    /^Question\s+\d+/i
  ];

  let questionsFound = 0;
  lines.forEach(line => {
    if (questionPatterns.some(pattern => pattern.test(line))) {
      questionsFound++;
      if (questionsFound <= 5) {
        console.log(`  Sample Q${questionsFound}: ${line.substring(0, 80)}...`);
      }
    }
  });

  console.log(`  \n✓ Identified ~${questionsFound} potential questions`);

  // Save raw text for manual analysis
  const outputPath = path.join(outputDir, 'domande_chiuse_raw.txt');
  fs.writeFileSync(outputPath, text);
  console.log(`  Saved raw text to: ${outputPath}`);
}

async function analyzeDomandeAperte() {
  const filePath = path.join(docxFolder, 'domande_aperte.docx');
  const text = await parseDocx(filePath);

  if (!text) return;

  const lines = text.split('\n').filter(l => l.trim());
  console.log(`📊 Statistics for domande_aperte.docx:`);
  console.log(`  Total lines: ${lines.length}`);
  console.log(`  Total characters: ${text.length}`);

  // Try to identify essay questions
  const essayPatterns = [
    /^Domanda\s+\d+/i,
    /^\d+\./,
    /Spiegare/i,
    /Descrivere/i,
    /Illustrare/i
  ];

  let questionsFound = 0;
  lines.forEach(line => {
    if (essayPatterns.some(pattern => pattern.test(line))) {
      questionsFound++;
      if (questionsFound <= 5) {
        console.log(`  Sample Q${questionsFound}: ${line.substring(0, 80)}...`);
      }
    }
  });

  console.log(`  \n✓ Identified ~${questionsFound} potential essay questions`);

  // Save raw text
  const outputPath = path.join(outputDir, 'domande_aperte_raw.txt');
  fs.writeFileSync(outputPath, text);
  console.log(`  Saved raw text to: ${outputPath}`);
}

async function main() {
  console.log('🔍 Parsing DOCX files from Corso B...\n');
  console.log('=' .repeat(60));

  // Check if files exist
  const chiuseExists = fs.existsSync(path.join(docxFolder, 'domande_chiuse.docx'));
  const aperteExists = fs.existsSync(path.join(docxFolder, 'domande_aperte.docx'));

  if (!chiuseExists) {
    console.log('⚠️  domande_chiuse.docx not found');
  }

  if (!aperteExists) {
    console.log('⚠️  domande_aperte.docx not found');
  }

  if (!chiuseExists && !aperteExists) {
    console.log('\n❌ No DOCX files found in:', docxFolder);
    return;
  }

  // Parse both files
  if (chiuseExists) {
    await analyzeDomandeChiuse();
  }

  if (aperteExists) {
    await analyzeDomandeAperte();
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ DOCX parsing complete!');
  console.log('\n📝 Next steps:');
  console.log('  1. Review the raw text files in src/data/');
  console.log('  2. Identify the question format and structure');
  console.log('  3. Create a structured parser based on the pattern');
  console.log('  4. Generate JSON exam files');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
