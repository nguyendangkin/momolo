FROM node:22.16.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
