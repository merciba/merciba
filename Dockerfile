FROM node:7.3-onbuild

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000

RUN mkdir -p /app/logs

WORKDIR /app
