FROM node:lts-alpine 

WORKDIR /analysis-service

COPY . .
COPY .package*.json ./
COPY .env ./

RUN yarn install

EXPOSE 5001

CMD ["yarn", "start"]