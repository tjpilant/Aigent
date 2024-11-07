#!/bin/bash

# Create necessary directories
mkdir -p /workspace/uploads
mkdir -p /workspace/public/ocr-results
mkdir -p /workspace/credentials

# Set up Python virtual environment
python3 -m venv /workspace/.venv
source /workspace/.venv/bin/activate

# Install Python requirements if they exist
if [ -f "/workspace/requirements.txt" ]; then
    pip install -r /workspace/requirements.txt
fi

# Keep container running
exec "$@"
