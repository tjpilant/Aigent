# Aigent OCR Project

This project implements OCR (Optical Character Recognition) functionality using both Google Cloud Vision API and Tesseract OCR.

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
   - Create a `.env` file in the root directory of the project.
   - Add the following variables to the `.env` file:
     ```
     JWT_SECRET=your_strong_jwt_secret
     PROCESSOR_ID=your_google_cloud_processor_id
     ```
   - For local development, place your Google Cloud service account JSON key file in the project root as `google-cloud-key.json`.

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
2. Navigate to the web interface (typically http://localhost:3000 for local development).
3. Select one or multiple files (images or PDFs) to process.
4. Choose the OCR method (Google Cloud Vision or Tesseract).
5. Click the "Process Files" button.
6. Once processing is complete, download buttons will appear for each processed file.

Alternatively, you can use the API directly:

Send a POST request to `/api/process-ocr` with the following:
   - Form data with a 'file' field containing the image or PDF to process.
   - Form data with an 'ocrMethod' field set to either 'google' or 'tesseract'.

The API will return a JSON response with the OCR results and a file token for each processed file.

Example using curl:
```
curl -X POST -F "file=@path/to/your/image.jpg" -F "ocrMethod=google" http://localhost:3000/api/process-ocr
```

## Development

When working on the project, make sure to:
- Keep the .env file updated with your local development settings.
- Do not commit the `google-cloud-key.json` file or any sensitive information to the repository.
- Run tests before submitting pull requests (when tests are implemented).

## Deployment

When deploying to production:

1. Set up the following environment variables or secrets in your deployment platform:
   - `JWT_SECRET`: A strong secret for JWT token generation
   - `PROCESSOR_ID`: Your Google Cloud Document AI processor ID
   - `AIOCR_AIGENT_JSON`: The entire JSON content of your Google Cloud service account key

2. Ensure that your deployment platform supports environment variables with large string values, as the `AIOCR_AIGENT_JSON` will contain the entire service account key.

3. If using GitHub Actions for deployment, set up the following GitHub Secrets:
   - `AIOCR_AIGENT_JSON`: The entire JSON content of your Google Cloud service account key
   - `JWT_SECRET`: A strong secret for JWT token generation
   - `PROCESSOR_ID`: Your Google Cloud Document AI processor ID

## Recent Changes

- Added support for Tesseract OCR alongside Google Cloud Vision API.
- Implemented multi-file selection and processing.
- The application now supports reading Google Cloud credentials from either an environment variable (`AIOCR_AIGENT_JSON`) or a local file (`google-cloud-key.json`).
- Improved error handling and logging for credential loading and OCR processing.
- Updated the user interface to handle multiple file uploads and display results for each processed file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
