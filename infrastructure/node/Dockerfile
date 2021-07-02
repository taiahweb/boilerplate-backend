FROM node:lts-alpine 

WORKDIR /usr/app

COPY /application/package*.json ./

RUN npm install

COPY /application ./

EXPOSE 80

CMD ["npm", "start"]
