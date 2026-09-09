# ==============================================================================
# Multi-stage Backend Dockerfile: Node.js + Express TypeScript Service
# ==============================================================================

# Stage 1: TypeScript compilation
FROM node:22-alpine AS build-stage
WORKDIR /app

# Install all dependencies including build tooling
COPY package.json package-lock.json ./
RUN npm ci

# Copy TypeScript configuration and source
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript into JavaScript (/app/dist)
RUN npm run build

# Stage 2: Minimal unprivileged production runtime
FROM node:22-alpine AS production-stage
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

# Install production-only dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled artifacts from build stage
COPY --from=build-stage /app/dist ./dist

# Enforce non-root execution using built-in node user
RUN chown -R node:node /app
USER node

EXPOSE 3000

# Native Node.js healthcheck against /health probe
HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.js"]
