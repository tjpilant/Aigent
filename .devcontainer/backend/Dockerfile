# Use Microsoft's official Python 3.11 Dev Container image
FROM mcr.microsoft.com/devcontainers/python:3.11

# Set the working directory
WORKDIR /app

# Install Poetry globally
RUN pip install poetry

# Copy Poetry dependency files first for caching
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry install --no-root

# Copy all project files
COPY . .

# Expose the backend API port
EXPOSE 8000

# Default command to run Flask
CMD ["python", "flask_app.py"]
