FROM node:18 as base

FROM base as deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD [ "node", "src/app.js" ]