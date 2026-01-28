import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Tesseract from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function performOCR(imagePath) {
  try {
    console.log(`  Processing ${path.basename(imagePath)}...`);

    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'ita',
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
    console.error(`OCR error: ${error.message}`);
    return { text: '', success: false };
  }
}

async function batchOCR(imageDir) {
  console.log(`\n📷 Batch OCR Processing`);
  console.log('='.repeat(60));
  console.log(`Directory: ${imageDir}\n`);

  // Find all images
  const files = fs.readdirSync(imageDir)
    .filter(f => f.match(/\.(jpg|jpeg|png)$/i))
    .sort()
    .map(f => path.join(imageDir, f));

  if (files.length === 0) {
    console.log('No image files found.');
    return;
  }

  console.log(`Found ${files.length} images\n`);

  let combinedText = '';

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(`\n[${i + 1}/${files.length}] ${path.basename(file)}`);

    const result = await performOCR(file);

    if (result.success) {
      combinedText += `\n=== ${path.basename(file)} ===\n`;
      combinedText += result.text;
      combinedText += '\n';
      console.log(`  ✓ Extracted ${result.text.length} characters`);
    } else {
      console.log(`  ✗ Failed`);
    }
  }

  // Save combined output
  const outputPath = path.join(imageDir, 'combined-output.txt');
  fs.writeFileSync(outputPath, combinedText);

  console.log('\n' + '='.repeat(60));
  console.log(`✓ Combined output saved to: ${outputPath}`);
  console.log(`  Total characters: ${combinedText.length.toLocaleString()}`);
}

// Main
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node batch-ocr-images.js <image-directory>');
  process.exit(1);
}

const imageDir = path.resolve(args[0]);
if (!fs.existsSync(imageDir)) {
  console.error(`Directory not found: ${imageDir}`);
  process.exit(1);
}

batchOCR(imageDir).catch(console.error);