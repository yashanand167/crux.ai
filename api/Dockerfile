FROM oven/bun:alpine

RUN apk add --no-cache git

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

EXPOSE 8000

CMD ["bun", "run", "src/index.ts"]
