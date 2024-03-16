FROM node:18-alpine

WORKDIR /src/app

#COPY . /usr/src/app

RUN npm install -g @angular/cli@16.1.8

RUN npm install

RUN npm run build

CMD ["ng", "serve", "--host", "0.0.0.0","--port", "8080"]
