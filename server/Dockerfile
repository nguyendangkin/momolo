FROM node:22.15.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY .env.production .env

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
