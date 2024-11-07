import os
import json
from google.cloud import documentai_v1 as documentai
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# Hardcoded values
PROJECT_ID = "aigent-430602"
LOCATION = "us"
SERVICE_ACCOUNT_EMAIL = "aiocer-aigent@aigent-430602.iam.gserviceaccount.com"

print(f"Using Project ID: {PROJECT_ID}")
print(f"Using Service Account: {SERVICE_ACCOUNT_EMAIL}")

# Get credentials from environment variable
credentials_json = os.environ.get('AIOCR_AIGENT_JSON')

if credentials_json:
    try:
        # Parse the JSON string
        credentials_info = json.loads(credentials_json)
        
        # Create credentials object
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=['https://www.googleapis.com/auth/cloud-platform']
        )
        
        # Refresh the credentials
        request = Request()
        credentials.refresh(request)
        
        print(f"Credentials refreshed. Valid: {credentials.valid}, Expiry: {credentials.expiry}")
        print(f"Service Account Email from credentials: {credentials.service_account_email}")
        
        # Initialize Document AI client
        client = documentai.DocumentProcessorServiceClient(credentials=credentials)
        
        # List available processors
        parent = f"projects/{PROJECT_ID}/locations/{LOCATION}"
        request = documentai.ListProcessorsRequest(parent=parent)
        
        print("Attempting to list Document AI processors...")
        processors = client.list_processors(request=request)
        
        for processor in processors:
            print(f"Processor Name: {processor.name}")
            print(f"Processor Type: {processor.type_}")
            print("---")
        
    except Exception as e:
        print(f"Error: {str(e)}")
else:
    print("Error: AIOCR_AIGENT_JSON environment variable not found")

print("Script execution completed.")
