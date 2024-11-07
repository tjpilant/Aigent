from flask import Flask, request, jsonify
from flask_cors import CORS
from aigent.tools.google_cloud_vision_ocr_tool import GoogleCloudVisionOCRTool
import os
import base64
import tempfile
import logging
import json

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ensure required directories exist
os.makedirs('/app/public/ocr-results', exist_ok=True)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/health')
def health():
    return {'status': 'healthy'}

@app.route('/process-ocr', methods=['POST'])
def process_ocr():
    try:
        # Check if credentials file exists and is valid
        credentials_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
        if not credentials_path:
            return jsonify({
                'error': 'GOOGLE_APPLICATION_CREDENTIALS environment variable not set'
            }), 400
        
        if not os.path.exists(credentials_path):
            return jsonify({
                'error': f'Credentials file not found at {credentials_path}. Please ensure credentials are properly mounted.'
            }), 400
        
        try:
            with open(credentials_path) as f:
                json.load(f)
        except json.JSONDecodeError:
            return jsonify({
                'error': 'Invalid JSON in credentials file. Please ensure credentials are properly formatted.'
            }), 400
        except Exception as e:
            return jsonify({
                'error': f'Error reading credentials file: {str(e)}'
            }), 400

        # Get file content and OCR method from request
        file_content_b64 = request.form.get('fileContent')
        file_name = request.form.get('fileName')
        ocr_method = request.form.get('ocrMethod')

        if not all([file_content_b64, file_name, ocr_method]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Decode base64 content
        file_content = base64.b64decode(file_content_b64)

        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file_name)[1]) as temp_file:
            temp_file.write(file_content)
            input_file_path = temp_file.name

        # Create output file path
        base_name = os.path.splitext(file_name)[0]
        output_file_name = f"{base_name}_aiocr.md"
        output_file_path = os.path.join('/app/public/ocr-results', output_file_name)

        # Process with Google Cloud Vision
        ocr_tool = GoogleCloudVisionOCRTool(
            input_file_path=input_file_path,
            output_md_file_path=output_file_path,
            credentials_path=credentials_path,
            processor_id=os.environ.get('GOOGLE_CLOUD_PROCESSOR_ID')
        )

        result = ocr_tool.run()

        # Clean up temporary file
        os.unlink(input_file_path)

        return jsonify({
            'message': f'OCR processing complete for {file_name}',
            'result': result,
            'filePath': output_file_path,
            'fileName': output_file_name
        })

    except Exception as e:
        logger.exception("Error processing OCR")
        error_message = str(e)
        if "service_account" in error_message.lower():
            error_message = "Invalid Google Cloud credentials. Please check your credentials configuration."
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
