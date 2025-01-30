# Base image with Node.js 22 on Debian Bookworm
FROM node:22-bookworm

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    python3-venv \
    python3-dev \
    zlib1g-dev \
    libssl-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    libtesseract-dev \
    tesseract-ocr \
    tesseract-ocr-eng

# Configure Python 3.11 as default
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1

# Setup workspace directory
RUN mkdir -p /workspaces && \
    chown node:node /workspaces

USER node
WORKDIR /workspaces

# Expose application ports
EXPOSE 3000 8000

# Default command when container starts
CMD ["sleep", "infinity"]
