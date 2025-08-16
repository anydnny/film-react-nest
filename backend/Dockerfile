# Этап 1: Сборка приложения
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY .env.example .env
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm ci --omit=dev
CMD ["node", "dist/main"]
