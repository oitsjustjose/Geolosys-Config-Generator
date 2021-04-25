FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

FROM node:14-alpine AS server

ENV NODE_ENV=production

RUN npm install -g serve

WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/build ./build

ENV PORT=3005

EXPOSE 3005
USER node
CMD ["serve", "-s", "build"]
