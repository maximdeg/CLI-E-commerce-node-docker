FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV FORCE_COLOR=1

EXPOSE 5000

# Use node directly for better stdin handling
ENTRYPOINT ["node", "src/index.js"] 