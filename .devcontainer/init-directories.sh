#!/bin/bash
mkdir -p /app/uploads
mkdir -p /app/public/ocr-results
chown -R node:node /app/uploads
chown -R node:node /app/public/ocr-results
chmod 755 /app/uploads
chmod 755 /app/public/ocr-results 