FROM node:20-alpine3.18 AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i--frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM base AS builder
RUN apk update && apk add --no-cache openssl

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.

WORKDIR /app/src
RUN npx prisma generate

WORKDIR /app
# RUN yarn build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app


RUN apk update \
    && apk add --no-cache openssl \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

# COPY --from=builder /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# # Copy the prisma folder which includes the schema and the generated client
# COPY --chown=nextjs:nodejs ./src/prisma ./src/prisma/

# USER nextjs

CMD ["node", "server.js"]