FROM node:24-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build

ARG SITE_URL

ENV SITE_URL=$SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json .

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]