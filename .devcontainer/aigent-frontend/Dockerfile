# Use Microsoft's official Node.js 18 TypeScript Dev Container image
FROM mcr.microsoft.com/devcontainers/typescript-node:18-bookworm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage caching)
COPY package.json package-lock.json ./

# Install dependencies without modifying package-lock.json
RUN npm ci

# Copy all remaining project files
COPY . .

# Expose the development port
EXPOSE 3000

# Default command to start the development server
CMD ["npm", "run", "dev"]
