FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install global dev tools
RUN npm install -g npm@latest

# Add directory initialization
COPY init-directories.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/init-directories.sh
CMD ["/usr/local/bin/init-directories.sh"]

WORKDIR /workspace 