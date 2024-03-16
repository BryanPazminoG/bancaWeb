FROM node:18-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install -g @angular/cli@16.1.8

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx: 1.17.1-alpine
COPY --from=build-step /app/dist/back-office /usr/share/nginx/html
# CMD ["ng", "serve", "--host", "0.0.0.0"]
