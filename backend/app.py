from flask import Flask
from flask_cors import CORS
from aigent.api.api_manager import APIManager
from aigent.config.config import load_config

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load configuration
config = load_config()

# Initialize API manager
api_manager = APIManager()

@app.route('/api/process-ocr', methods=['POST'])
def process_ocr():
    return api_manager.process_ocr()

if __name__ == '__main__':
    app.run(debug=config.get('DEBUG', True))
