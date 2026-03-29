# =============================================
# Portfolio Jiale Cheng — Dockerfile (SSR)
# =============================================

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Runtime — only the built output
FROM node:20-alpine AS runtime
WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Copy only the built dist folder
COPY --from=builder /app/dist ./dist
# The standalone node adapter bundles dependencies, but we need package.json for module resolution
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
