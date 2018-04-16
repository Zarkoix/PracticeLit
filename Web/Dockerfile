FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY public ./public
WORKDIR /usr/src/app/public
EXPOSE 80
CMD ["node", "index"]