import os
from dotenv import load_dotenv

load_dotenv()

def load_config():
    """
    Load configuration from environment variables
    """
    return {
        'DEBUG': os.getenv('FLASK_DEBUG', '1') == '1',
        'CORS_ORIGINS': os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','),
        'PORT': int(os.getenv('PORT', 8000)),
        'HOST': os.getenv('HOST', '0.0.0.0'),
        'GOOGLE_CLOUD_PROCESSOR_ID': os.getenv('GOOGLE_CLOUD_PROCESSOR_ID'),
        'GOOGLE_CLOUD_CREDENTIALS_PATH': '/app/credentials/credentials.json'
    }
