# ==============================================================================
# Multi-stage Frontend Dockerfile: React + TypeScript + Vite -> Nginx Alpine
# ==============================================================================

# Stage 1: Build environment
FROM node:22-alpine AS build-stage
WORKDIR /app

# Install dependencies using authoritative lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build production bundle
COPY . .
RUN npm run build

# Stage 2: Minimal production web server (non-root unprivileged)
FROM nginx:1.27-alpine AS production-stage

# Copy compiled static assets from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration with SPA routing and API reverse-proxying
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configure directory permissions and pid file for unprivileged execution (UID 101: nginx)
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /usr/share/nginx/html /etc/nginx/conf.d

USER nginx

EXPOSE 8080

# Health check verifying HTTP availability on unprivileged port 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
