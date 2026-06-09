FROM oven/bun:alpine as builder

RUN apk add --no-cache git

WORKDIR /app

COPY bun.lock package.json ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

#Production
FROM oven/bun:alpine 

RUN apk add --no-cache git

WORKDIR /app

COPY bun.lock package.json ./

RUN bun install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 8000

CMD ["bun", "dist/index.js"]
