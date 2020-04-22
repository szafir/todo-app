FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN yarn install
RUN yarn build

EXPOSE 4000

CMD ["yarn", "start:prod"]