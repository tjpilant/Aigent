# Build stage
FROM node:18-slim AS builder

WORKDIR /app

# Install system dependencies for Tesseract
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-slim AS runner

WORKDIR /app

# Install system dependencies for Tesseract
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create directory for credentials and set permissions
RUN mkdir -p /app/credentials && \
    chmod 755 /app/credentials

# Copy necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Create directories for uploads and OCR results
RUN mkdir -p /app/uploads /app/public/ocr-results && \
    chmod 755 /app/uploads && \
    chmod 755 /app/public/ocr-results

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
