FROM docker.io/node:18-alpine AS base

FROM base AS development

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

FROM base AS install-production-dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

FROM base AS build-production-files

WORKDIR /usr/src/app

COPY --from=install-production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=install-production-dependencies /usr/src/app/package*.json ./

COPY src ./src
COPY public ./public
COPY .env next.config.js postcss.config.js tailwind.config.ts tsconfig.json ./

RUN npx next build

FROM base AS production

RUN apk add --no-cache dumb-init

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --from=install-production-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=install-production-dependencies /usr/src/app/package*.json ./
COPY --from=build-production-files /usr/src/app/public ./public
COPY --from=build-production-files /usr/src/app/.env ./.env
COPY --from=build-production-files /usr/src/app/.next/standalone ./
COPY --from=build-production-files /usr/src/app/.next/static ./.next/static

RUN chown -R node:node .

USER node

CMD ["dumb-init", "node", "server.js"]
