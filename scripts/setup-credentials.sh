#!/bin/bash

# Create credentials directory if it doesn't exist
mkdir -p credentials

# Check if AIGENT_430602_JSON environment variable exists
if [ -z "$AIGENT_430602_JSON" ]; then
    echo "Error: AIGENT_430602_JSON environment variable is not set"
    exit 1
fi

# Decode and write the credentials
echo "$AIGENT_430602_JSON" | base64 -d > credentials/credentials.json

# Check if the file was created successfully
if [ ! -f credentials/credentials.json ]; then
    echo "Error: Failed to create credentials.json"
    exit 1
fi

echo "Credentials file created successfully"
