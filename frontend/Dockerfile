FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

##

FROM node:14-alpine AS server

ENV NODE_ENV=production

RUN npm install -g serve

RUN apk add postgresql-client

WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/build ./build

ENV PORT=3001

EXPOSE 3001
USER node
CMD ["serve", "-s", "build"]



# FROM node:14 AS builder

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install --production

# COPY . .

# RUN npm run build

# FROM node:14-alpine AS server

# WORKDIR /usr/src/app

# USER node
# EXPOSE 3001

# COPY package*.json ./
# COPY --from=builder /usr/src/app/build ./build


# RUN npm install -g serve

# ENV NODE_ENV=production

# CMD ["serve", "-s", "build"]
