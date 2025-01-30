FROM python:3.9-slim
WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libtiff5-dev \
    libjpeg62-turbo-dev \
    libopenjp2-7-dev \
    zlib1g-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python setup
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# File system setup
RUN mkdir -p /app/uploads && \
    chmod -R 777 /app/uploads && \
    useradd -m appuser && \
    chown -R appuser:appuser /app
USER appuser
EXPOSE 5000
CMD ["python", "main.py"]
