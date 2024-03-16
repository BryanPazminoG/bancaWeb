FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@16.1.8

RUN npm install

RUN npm run build

CMD ["node", "index.js"]
