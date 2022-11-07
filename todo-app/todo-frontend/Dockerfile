FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL="http://localhost:4000/"
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

CMD npm start