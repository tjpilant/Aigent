# OCR File Naming Conventions

## Overview
This document outlines the standardized naming conventions for OCR output files in the Aigent system.

## File Extensions

### Google Cloud Vision OCR
Files processed using Google Cloud Vision OCR are saved with the following format:
```
{original_filename}_aiocr.md
```

Example:
- Input: document.pdf
- Output: document_aiocr.md

### Tesseract OCR
Files processed using Tesseract OCR are saved with the following format:
```
{original_filename}_tesocr.md
```

Example:
- Input: document.pdf
- Output: document_tesocr.md

## File Locations
All OCR output files are stored in the `/app/public/ocr-results/` directory.

## Supported Input Formats
Both OCR engines support the following input formats:
- PDF (.pdf)
- TIFF/TIF (.tiff, .tif)
- JPEG (.jpg, .jpeg)
- PNG (.png)

## Output Format
All OCR results are saved as Markdown (.md) files, containing:
- The extracted text from the document
- Proper formatting for readability
- UTF-8 encoding for universal compatibility

## Implementation Details
- Frontend maintains consistent naming when downloading files
- Backend applies the appropriate suffix based on the OCR method used
- File extensions are handled automatically by the system
- Original filenames are preserved (minus their extension) in the output filename
