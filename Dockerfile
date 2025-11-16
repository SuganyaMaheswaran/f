FROM node:lts

LABEL maintainer="Suganya Maheswaran <suganyamaheswaran.dev@gmail.com"
LABEL description="Fragments node.js microservice"

ENV PORT=8080

ENV NPM_CONFIG_LOGLEVEL=warm

ENV NPM_CONFIG_LOGLEVEL=false

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src  ./src

CMD npm start

EXPOSE 8080