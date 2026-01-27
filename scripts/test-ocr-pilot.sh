#!/bin/bash

# Test OCR Pilot Script
# Converte 1-2 PDF campione in immagini e testa l'OCR

echo "🚀 Starting OCR Pilot Test"
echo "=========================="
echo ""

# PDF campione selezionati
PDF1="docs/pdf-esami/foto-esami/Esami SO/esame02.pdf"
PDF2="docs/pdf-esami/foto-esami/Esami SO/Scritto_parte_di_teoria_del_corso_A_di_Sistemi_Operativi_del_8_febbraio.pdf"

# Directory temporanea per test
TEMP_DIR="temp/ocr-test"
mkdir -p "$TEMP_DIR"

echo "📂 Selected PDF samples:"
echo "  1. esame02.pdf (186 KB)"
echo "  2. Scritto_parte_di_teoria... (81 KB)"
echo ""

# Test 1: Converti primo PDF
echo "🔄 Converting PDF 1 to images..."
pdftoppm -jpeg -r 300 "$PDF1" "$TEMP_DIR/esame02"

if [ $? -eq 0 ]; then
    echo "✅ PDF 1 converted successfully"
    ls -lh "$TEMP_DIR"/esame02-*.jpg | wc -l | xargs echo "   Generated" "images"
else
    echo "❌ Error converting PDF 1"
    exit 1
fi

echo ""

# Test 2: OCR su prima immagine
echo "🔍 Running OCR on first image..."
FIRST_IMAGE=$(ls "$TEMP_DIR"/esame02-*.jpg | head -1)
echo "   Image: $(basename $FIRST_IMAGE)"

node scripts/ocr-pdf-exams.js image "$FIRST_IMAGE" > "$TEMP_DIR/ocr-output.txt"

if [ $? -eq 0 ]; then
    echo "✅ OCR completed successfully"
    echo ""
    echo "📄 OCR Output Preview (first 20 lines):"
    head -20 "$TEMP_DIR/ocr-output.txt"
    echo ""
    echo "   Full output saved to: $TEMP_DIR/ocr-output.txt"
else
    echo "❌ Error running OCR"
    exit 1
fi

echo ""
echo "✅ OCR Pilot Test Complete!"
echo "=========================="
echo ""
echo "Next steps:"
echo "  1. Review OCR quality in: $TEMP_DIR/ocr-output.txt"
echo "  2. If quality is good, run batch processing"
echo "  3. If quality is poor, consider alternatives (Google Cloud Vision, manual)"
