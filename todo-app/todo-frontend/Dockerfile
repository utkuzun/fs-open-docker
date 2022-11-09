FROM node:18-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]
