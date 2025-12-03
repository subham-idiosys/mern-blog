### Stage 1: Dependencies (build stage)
FROM node:20-alpine AS deps

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

### Stage 2: Runtime image (smaller final image)
FROM node:20-alpine AS runner

WORKDIR /app

# Copy production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Environment and port
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start the backend server
CMD ["node", "index.js"]


