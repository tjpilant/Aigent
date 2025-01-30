# Codebase Summary

## Project Structure

```
.
├── aigent-frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── pages/            # Next.js pages
│   │   │   ├── api/          # API routes
│   │   │   │   ├── process-ocr.ts        # OCR processing endpoint
│   │   │   │   └── serve-ocr-result.ts   # Result serving endpoint
│   │   │   └── index.tsx     # Main application page
│   │   └── components/       # React components
│   └── public/               # Static files
├── backend/                  # Flask backend application
│   ├── aigent/
│   │   ├── tools/           # OCR tools
│   │   │   ├── google_cloud_vision_ocr_tool.py  # Google Cloud Vision integration
│   │   │   └── base_tool.py                     # Base tool class
│   │   └── utils/           # Utility functions
│   ├── app.py               # Main Flask application (needs security hardening)
│   └── requirements.txt     # Python dependencies
├── credentials/             # Mounted credentials (gitignored)
├── scripts/                # Utility scripts
│   └── setup-credentials.sh # Credentials setup script
└── docker-compose.yml      # Container orchestration
```

## Known Issues

### Frontend Issues
1. **Tesseract Integration**
   - Missing WASM file
   - Improper error status code
   - Needs proper implementation

2. **Security**
   - Default JWT secret
   - Missing file validation
   - Insecure file handling

### Backend Issues
1. **Security**
   - No validation for GOOGLE_CLOUD_PROCESSOR_ID
   - Temporary file cleanup not in try-finally
   - No file size limits
   - No file type validation
   - No rate limiting
   - Missing request validation

## Key Components

### Frontend Components
- **File Upload**: Handles file selection and upload
- **Progress Indicator**: Shows processing status
- **Result Display**: Shows OCR results and download button
- **Error Handling**: User-friendly error messages (needs improvement)

### Backend Components
- **OCR Processing**: Google Cloud Vision integration
- **File Management**: Handles file uploads and results with _aiocr.md naming convention
- **Error Handling**: Comprehensive error catching (needs improvement)
- **Health Checks**: System status monitoring

### Infrastructure
- **Docker Containers**: Isolated environments
- **Volume Mounts**: Persistent storage for OCR results
- **Network**: Internal container communication
- **Credentials**: Secure credential management

## Data Flow

1. **File Upload**
   - Frontend accepts file
   - Validates file type and size (needs implementation)
   - Sends to backend

2. **OCR Processing**
   - Backend receives file
   - Validates credentials
   - Processes with Google Cloud Vision
   - Generates markdown output with _aiocr.md extension

3. **Result Handling**
   - Creates result file with _aiocr.md extension
   - Generates access token
   - Returns result to frontend
   - Frontend provides download link

## Security Concerns

1. **Frontend**
   - Default JWT secret
   - Missing file validation
   - Insecure file handling

2. **Backend**
   - Missing environment validation
   - Insecure file operations
   - No rate limiting
   - Missing request validation

3. **Infrastructure**
   - Need to add security headers
   - Need to implement monitoring

## Maintenance Notes

1. **Credentials**
   - Located in /credentials
   - Mounted as read-only
   - Managed through GitHub secrets

2. **Volumes**
   - uploads/: Temporary file storage
   - public/ocr-results/: OCR output with _aiocr.md files
   - credentials/: Service account keys

3. **Monitoring**
   - Health check endpoint
   - Container logs
   - Error tracking (needs implementation)

## File Naming Convention
- OCR result files use _aiocr.md extension
- Example: filename_aiocr.md
- Location: /app/public/ocr-results/
- Consistent across backend and frontend

## Priority Areas
1. Security hardening
2. Error handling improvement
3. File validation implementation
4. Monitoring setup
5. Documentation updates
6. Tesseract integration

## Recent Significant Changes
- Consolidated technical documentation framework
- Added agency-swarm integration details
- Formalized Docker-in-Docker security practices
- Updated credential management documentation
