import json
import os

# Path to the Google Cloud credentials file
cred_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'google-cloud-key.json')

if os.path.exists(cred_file_path):
    try:
        with open(cred_file_path, 'r') as file:
            credentials = json.load(file)
        
        # Print all top-level keys in the credentials
        print("Keys in the Google Cloud credentials:")
        for key in credentials.keys():
            print(f"- {key}")
        
        # Check for any key that might represent a processor ID
        processor_keys = [k for k in credentials.keys() if 'processor' in k.lower()]
        if processor_keys:
            print("\nPossible processor ID keys found:")
            for key in processor_keys:
                print(f"- {key}")
        else:
            print("\nNo key specifically mentioning 'processor' found in credentials.")
        
        # Check if there's a project_id and print it
        if 'project_id' in credentials:
            print(f"\nProject ID: {credentials['project_id']}")
        
        # Check for PROCESSOR_ID environment variable
        processor_id = os.environ.get('PROCESSOR_ID')
        if processor_id:
            print(f"\nProcessor ID found in environment variable: {processor_id}")
        else:
            print("\nNo PROCESSOR_ID environment variable found.")
        
    except json.JSONDecodeError:
        print("Error: Invalid JSON in google-cloud-key.json file")
else:
    print("Error: google-cloud-key.json file not found")

print("\nScript execution completed.")
