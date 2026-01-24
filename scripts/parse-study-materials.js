import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studyMaterialsPath = path.join(__dirname, '../docs/pdf-lezioni');
const outputPath = path.join(__dirname, '../src/data/study-materials.json');

const TOPICS_MAP = {
  'parteUno-Generalità': {
    id: 'generalita',
    topic: 'generalita',
    title: 'I - Generalità',
    description: 'Introduzione e strutture dei sistemi operativi',
    chapters: ['Cap. 1 - Introduzione', 'Cap. 2 - Strutture dei sistemi operativi']
  },
  'parteDue-Tre-Gestione dei processi Sincronizzazione dei processi': {
    id: 'processi-sincronizzazione',
    topic: 'processi-scheduling',
    title: 'II-III - Processi e Sincronizzazione',
    description: 'Gestione dei processi, thread, scheduling e sincronizzazione',
    chapters: [
      'Cap. 3 - Processi',
      'Cap. 4 - Thread',
      'Cap. 5 - Scheduling della CPU',
      'Cap. 6 - Strumenti di sincronizzazione',
      'Cap. 7 - Esempi di sincronizzazione'
    ]
  },
  'parteQuattro-Gestione della memoria (primaria)': {
    id: 'memoria-primaria',
    topic: 'memoria-primaria',
    title: 'IV - Gestione della Memoria',
    description: 'Memoria centrale e memoria virtuale',
    chapters: [
      'Cap. 9 - Memoria centrale',
      'Cap. 10 - Memoria virtuale'
    ]
  },
  'parteCinque-Gestione della memoria di massa': {
    id: 'memoria-massa',
    topic: 'memoria-massa',
    title: 'V - Memoria di Massa',
    description: 'Dischi rigidi, RAID e memorie a stato solido',
    chapters: ['Cap. 11 - Memoria di massa']
  },
  'parteSei-File System': {
    id: 'file-system',
    topic: 'file-system',
    title: 'VI - File System',
    description: 'Interfaccia e realizzazione del file system',
    chapters: [
      'Cap. 13 - Interfaccia del file system',
      'Cap. 14 - Realizzazione del file system'
    ]
  }
};

function scanStudyMaterials() {
  const materials = [];

  try {
    const folders = fs.readdirSync(studyMaterialsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log(`Found ${folders.length} study material folders\n`);

    for (const folder of folders) {
      const folderPath = path.join(studyMaterialsPath, folder);
      const topicInfo = TOPICS_MAP[folder];

      if (!topicInfo) {
        console.log(`⚠ Skipping unknown folder: ${folder}`);
        continue;
      }

      // Scan for PDF files
      const files = fs.readdirSync(folderPath);
      const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

      const material = {
        ...topicInfo,
        pdfFiles: pdfFiles,
        pdfCount: pdfFiles.length
      };

      materials.push(material);
      console.log(`✓ ${topicInfo.title}`);
      console.log(`  Folder: ${folder}`);
      console.log(`  PDFs: ${pdfFiles.length} file(s)`);
      if (pdfFiles.length > 0) {
        pdfFiles.forEach(pdf => console.log(`    - ${pdf}`));
      }
      console.log();
    }

    // Sort by topic order
    const topicOrder = ['generalita', 'processi-scheduling', 'sincronizzazione', 'memoria-primaria', 'memoria-massa', 'file-system'];
    materials.sort((a, b) => {
      return topicOrder.indexOf(a.topic) - topicOrder.indexOf(b.topic);
    });

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to JSON
    fs.writeFileSync(outputPath, JSON.stringify(materials, null, 2));
    console.log(`✓ Generated study materials → ${outputPath}`);
    console.log(`  Total topics: ${materials.length}`);
    console.log(`  Total PDFs: ${materials.reduce((sum, m) => sum + m.pdfCount, 0)}`);

    return materials;
  } catch (error) {
    console.error('Error scanning study materials:', error);
    return [];
  }
}

// Run scanner
scanStudyMaterials();
