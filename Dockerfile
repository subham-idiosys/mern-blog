### Stage 1: Install server dependencies
FROM node:20-alpine AS server_deps

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

### Stage 2: Build client
FROM node:20-alpine AS client_build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client ./
RUN npm run build

### Stage 3: Runtime image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy server node_modules
COPY --from=server_deps /app/node_modules ./node_modules

# Copy server source code
COPY package*.json ./
COPY index.js ./
COPY config ./config
COPY controllers ./controllers
COPY model ./model
COPY routes ./routes

# Copy built client into location expected by Express (`./client/dist`)
COPY --from=client_build /app/client/dist ./client/dist

# Environment and port
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Start the backend server (which also serves the built client)
CMD ["node", "index.js"]


