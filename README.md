# Aigent OCR Project

This project implements OCR (Optical Character Recognition) functionality using Google Cloud Vision API.

## Setup

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- A Google Cloud account with Vision API enabled
- A Google Cloud service account key with appropriate permissions

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/aigent-ocr.git
   cd aigent-ocr
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - The `.env` file has already been created with placeholders.
   - Edit the `.env` file and fill in the required values:
     - Generate a strong JWT_SECRET
     - Set the GOOGLE_CLOUD_PROCESSOR_ID to your Google Cloud Document AI processor ID
     - Base64 encode your Google Cloud service account JSON key and set it as AIGENT_430602_JSON

### Running the Project

For development:
```
npm run dev
```

For production:
```
npm run build
npm start
```

## Usage

To use the OCR functionality:

1. Ensure the server is running (development or production).
2. Send a POST request to `/api/process-ocr` with the following:
   - Form data with a 'file' field containing the image or PDF to process.
   - Form data with an 'ocrMethod' field set to 'google'.
3. The API will return a JSON response with the OCR results and a file token.

Example using curl:
```
curl -X POST -F "file=@path/to/your/image.jpg" -F "ocrMethod=google" http://localhost:3000/api/process-ocr
```

## Development

When working on the project, make sure to:
- Keep the .env file updated with your local development settings.
- Do not commit any sensitive information or credentials to the repository.
- Run tests before submitting pull requests (when tests are implemented).

## Deployment

When deploying to production, ensure that you set up the following GitHub Secrets:
- AIGENT_430602_JSON: Base64 encoded Google Cloud service account key
- JWT_SECRET: A strong secret for JWT token generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
