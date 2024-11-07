# Technology Stack

## Frontend
- **Framework**: Next.js 14.2.17
- **Language**: TypeScript
- **Key Libraries**:
  - Formidable for file uploads
  - JWT for secure file access (needs proper secret)
  - Tailwind CSS for styling
- **Type Safety Issues**:
  - Form field type validation
  - File object type checking
  - Undefined access prevention
  - Array type handling
- **Security Needs**:
  - Environment variable validation
  - File type validation
  - Size limit validation
  - Proper error handling

## Backend
- **Framework**: Flask
- **Language**: Python 3.11
- **Key Libraries**:
  - google-cloud-documentai for OCR
  - gunicorn for WSGI server
  - flask-cors for CORS handling
  - pydantic for data validation
- **Security Needs**:
  - Rate limiting middleware
  - Request validation
  - File handling security
  - Environment validation

## OCR Services
- **Primary**: Google Cloud Vision AI
  - Document AI API
  - Processor ID: cdbb7ba4f9c316d0
  - Project ID: aigent-430602
- **Secondary**: Tesseract (needs fixing)
  - Missing WASM file
  - Needs proper integration
  - Requires error handling

## Infrastructure
- **Containerization**: Docker
- **Container Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Secret Management**: GitHub Secrets
- **Needed Additions**:
  - Monitoring system
  - Load balancing
  - Caching layer
  - Rate limiting

## File Storage
- **Uploads**: Local volume mount
  - Working correctly
  - Temporary file storage
  - Proper cleanup
  - Path validation
- **Results**: Markdown files
  - Working correctly
  - _aiocr.md naming convention
  - Proper file saving
  - Downloadable results
- **Credentials**: Secure volume mount
  - Working correctly
  - Read-only access
  - Proper permissions
  - Secure handling

## Security
- **Authentication**: Service Account based
- **File Access**: JWT tokens (needs proper secret)
- **CORS**: Configured for local development
- **Credentials**: Mounted as read-only
- **Required Additions**:
  - Rate limiting
  - Request validation
  - Security headers
  - Input sanitization
- **Type Safety**:
  - TypeScript strict mode
  - Form data validation
  - File type checking
  - Error type handling

## Development Tools
- **Version Control**: Git
- **Code Quality**: 
  - TypeScript for type safety (needs fixes)
  - Pydantic for data validation
  - Flask for API structure
- **Testing**:
  - Jest for frontend
  - Pytest for backend
- **Needed Tools**:
  - Security scanning
  - Performance monitoring
  - Error tracking
  - Log aggregation

## Environment Configuration
- **Development**: Local Docker setup
- **Production**: Containerized deployment
- **Credentials**: Managed through environment variables and mounted files
- **Required Changes**:
  - Proper validation
  - Default handling
  - Error messaging
  - Security checks

## API Structure
- **Frontend Routes**:
  - `/`: Main application
  - `/api/process-ocr`: OCR processing endpoint
  - `/api/serve-ocr-result`: Result serving endpoint

- **Backend Routes**:
  - `/process-ocr`: Main OCR processing (needs hardening)
  - `/health`: Health check endpoint

## Data Flow
1. File Upload → Frontend
   - Needs type validation
   - Needs size validation
2. Base64 Encoding → Backend
   - Needs input validation
3. Google Cloud Vision Processing
   - Working correctly
4. Markdown Generation
   - Working correctly
   - Uses _aiocr.md naming
5. Result Storage
   - Working correctly
   - Proper file saving
6. Token Generation
   - Needs proper secret
7. Result Serving
   - Working correctly
   - Needs rate limiting

## File Naming Convention
- **Format**: filename_aiocr.md
- **Implementation**:
  - Backend generates consistent names
  - Frontend maintains naming in downloads
  - Proper file extension handling
  - Clear naming pattern

## Monitoring Requirements
1. **System Health**:
   - Container status
   - Resource usage
   - Error rates
   - Response times

2. **Security**:
   - Failed attempts
   - Rate limit hits
   - File access logs
   - Authentication failures

3. **Performance**:
   - Processing times
   - Queue lengths
   - Memory usage
   - Network traffic

4. **Business Metrics**:
   - Successful OCRs
   - Error rates
   - User activity
   - File statistics

## Type Safety Requirements
1. **Frontend**:
   - Strict TypeScript checks
   - Form data validation
   - File object typing
   - Error handling types

2. **API**:
   - Request/Response types
   - Error types
   - File types
   - Token types

3. **File System**:
   - Path validation
   - Permission checks
   - Error handling
   - Status verification
