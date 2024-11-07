# Aigent OCR Service

A microservices-based OCR application using Google Cloud Vision and Tesseract.

## Architecture

- Frontend: Next.js with TypeScript
- Backend: Flask with Python
- OCR: Google Cloud Vision and Tesseract
- Containerization: Docker and Docker Compose

## OCR Features

The application supports two OCR engines:

1. Google Cloud Vision OCR
   - High accuracy for complex documents
   - Output files use _aiocr.md extension

2. Tesseract OCR
   - Open-source alternative
   - Output files use _tesocr.md extension

For detailed information about file naming conventions and supported formats, see [OCR Conventions](backend/aigent/docs/ocr_conventions.md).

## Development Setup

### Prerequisites

- Docker and Docker Compose
- Git
- GitHub account with access to the repository secrets

### Setting Up Credentials

The application uses Google Cloud Vision for OCR processing. The credentials are managed securely through GitHub Secrets.

#### For Local Development

1. Get the base64-encoded credentials from your team lead or system administrator
2. Set the environment variable:
   ```bash
   export AIGENT_430602_JSON='your-base64-encoded-credentials'
   ```
3. Run the setup script:
   ```bash
   ./scripts/setup-credentials.sh
   ```

#### For CI/CD

The credentials are automatically handled by GitHub Actions using the repository secret `AIGENT_430602_JSON`.

### Running the Application

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd aigent
   ```

2. Set up credentials as described above

3. Start the services:
   ```bash
   docker-compose up --build
   ```

The services will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Project Structure

```
.
├── aigent-frontend/       # Next.js frontend
├── backend/              # Flask backend
│   └── aigent/
│       ├── docs/         # Documentation
│       │   └── ocr_conventions.md  # OCR naming conventions
│       └── tools/        # OCR and utility tools
├── credentials/          # Mounted credentials (gitignored)
├── scripts/             # Utility scripts
├── .github/workflows/    # GitHub Actions workflows
└── docker-compose.yml    # Service orchestration
```

## Testing

The application includes:
- Frontend tests using Jest
- Backend tests using Python unittest
- Integration tests in CI/CD

## Security

- Credentials are managed securely through GitHub Secrets
- Local credentials are gitignored
- The setup script handles credential decoding and placement
- Credentials are mounted as read-only in containers

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

The CI/CD pipeline will automatically:
- Build and test the application
- Handle credentials securely
- Run integration tests

## Troubleshooting

If you encounter OCR errors, check:
1. Credentials are properly set up using the setup script
2. The credentials file exists in the credentials directory
3. The credentials file has valid Google Cloud credentials
4. The GOOGLE_CLOUD_PROCESSOR_ID environment variable is set correctly

### OCR Output Files

If OCR output files are not appearing in the expected location:
1. Check that the /app/public/ocr-results/ directory exists and has proper permissions
2. Verify the file naming follows the conventions:
   - Google Cloud Vision: filename_aiocr.md
   - Tesseract: filename_tesocr.md
3. Check the application logs for any file writing errors
