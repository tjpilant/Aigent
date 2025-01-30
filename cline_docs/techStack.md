# Technology Stack

## Development Environment
- Node.js v18
- Python 3.11
- Docker-in-Docker configuration
- VS Code DevContainer with:
  - Python/Jupyter extensions
  - Docker/Containers tooling
  - ESLint/Prettier formatting
  - Cline framework support

## Frontend
- **Framework**: Next.js 14.2.17
- **Language**: TypeScript
- **Key Libraries**:
  - Formidable for file uploads
  - JWT for secure file access (needs proper secret)
  - Tailwind CSS for styling

## Backend
- **Framework**: Flask
- **Language**: Python 3.11
- **Key Libraries**:
  - google-cloud-documentai for OCR
  - agency-swarm for AI agent management
  - pydantic for data validation

## Infrastructure
- **Containerization**: Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: 
  - Container health checks
  - Resource metrics collection
  - Log aggregation pipeline

## Security
- **Authentication**: Service Account credentials
- **Secrets Management**:
  - Mounted credentials volume
  - Environment variable injection
  - Read-only access constraints

## Development Tools
- **Version Control**: Git
- **Code Quality**:
  - TypeScript strict mode
  - Python type hints
  - Pylint/Black formatting
- **Testing**:
  - Jest frontend tests
  - Pytest backend tests
  - End-to-end API validation

## API Architecture
- REST endpoints with JWT validation
- Async document processing
- Rate limited endpoints
- Automated OpenAPI documentation

## Operational Requirements
- File processing queue system
- Auto-scaling worker pool
- Cloud credential rotation
- Security audit logging
